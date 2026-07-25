import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@6.9.16";

type EmailRequest = {
  type?: "test" | "custom";
  to?: string;
  subject?: string;
  body?: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  fromEmail: string;
  fromName: string;
  adminEmail: string;
  secure: boolean;
  starttls: boolean;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function env(name: string) {
  return Deno.env.get(name)?.trim() || "";
}

function boolEnv(name: string, fallback = false) {
  const value = env(name).toLowerCase();
  if (!value) return fallback;
  return ["1", "true", "yes", "si", "on"].includes(value);
}

function readSmtpConfig(): SmtpConfig {
  const port = Number(env("SMTP_PORT"));
  const config = {
    host: env("SMTP_HOST"),
    port,
    user: env("SMTP_USER"),
    password: env("SMTP_PASSWORD"),
    fromEmail: env("SMTP_FROM_EMAIL"),
    fromName: env("SMTP_FROM_NAME") || "Paradiso Nails",
    adminEmail: env("SMTP_ADMIN_EMAIL"),
    secure: boolEnv("SMTP_SECURE", port === 465),
    starttls: boolEnv("SMTP_STARTTLS", port === 587),
  };

  const missing = Object.entries({
    SMTP_HOST: config.host,
    SMTP_PORT: Number.isInteger(config.port) && config.port > 0 ? String(config.port) : "",
    SMTP_USER: config.user,
    SMTP_PASSWORD: config.password,
    SMTP_FROM_EMAIL: config.fromEmail,
    SMTP_ADMIN_EMAIL: config.adminEmail,
  }).filter(([, value]) => !value).map(([key]) => key);

  if (missing.length) {
    throw Object.assign(new Error("missing_secret"), { category: "missing_secret", missing });
  }

  return config;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function publicErrorFor(error: unknown) {
  const details = error as { category?: string; code?: string; command?: string; message?: string; responseCode?: number };
  const message = String(details?.message || "");
  const code = String(details?.code || "");
  const command = String(details?.command || "");
  const responseCode = Number(details?.responseCode || 0);

  if (details?.category) return details.category;
  if (responseCode === 535 || command === "AUTH" || /invalid login|authentication failed|auth/i.test(message)) return "credentials_rejected";
  if (["ECONNREFUSED", "ECONNECTION", "ESOCKET"].includes(code)) return "connection_refused";
  if (["ETIMEDOUT", "ETIMEOUT"].includes(code) || /timeout|timed out/i.test(message)) return "timeout";
  if (/starttls|tls|ssl|certificate|wrong version number/i.test(message)) return "starttls_failed";
  if ([501, 550, 553].includes(responseCode) || /recipient|sender|mailbox|address/i.test(message)) return "invalid_recipient";
  return "smtp_send_failed";
}

async function requireAdmin(request: Request) {
  const authorization = request.headers.get("Authorization") || "";
  if (!authorization.startsWith("Bearer ")) throw Object.assign(new Error("auth_rejected"), { category: "auth_rejected" });

  const supabaseUrl = env("SUPABASE_URL");
  const supabaseAnonKey = env("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !supabaseAnonKey) throw Object.assign(new Error("missing_secret"), { category: "missing_secret" });

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw Object.assign(new Error("auth_rejected"), { category: "auth_rejected" });

  let { data: admin, error: adminError } = await supabase
    .from("admin_users")
    .select("*")
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (adminError) throw adminError;

  if (!admin && userData.user.email) {
    const lookup = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", userData.user.email)
      .maybeSingle();
    if (lookup.error) throw lookup.error;
    admin = lookup.data;
  }

  if (!admin || admin.active === false || (admin.role && admin.role !== "admin")) {
    throw Object.assign(new Error("auth_rejected"), { category: "auth_rejected" });
  }
}

async function sendEmail(payload: EmailRequest) {
  const smtp = readSmtpConfig();
  const isTest = payload.type === "test";
  const to = String(payload.to || (isTest ? smtp.adminEmail : "")).trim();
  const subject = String(payload.subject || (isTest ? "Prueba SMTP Paradiso" : "")).trim();
  const body = String(payload.body || (isTest
    ? [
      "Hola,",
      "",
      "Este es un correo real de prueba enviado desde la funcion segura de Paradiso Nails.",
      "",
      "Si recibiste este mensaje, el envio SMTP quedo funcionando correctamente.",
    ].join("\n")
    : "")).trim();

  if (!isValidEmail(to)) throw Object.assign(new Error("invalid_recipient"), { category: "invalid_recipient" });
  if (!subject || !body) throw Object.assign(new Error("missing_email_content"), { category: "smtp_send_failed" });

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    requireTLS: smtp.starttls,
    auth: {
      user: smtp.user,
      pass: smtp.password,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
    tls: {
      servername: smtp.host,
      rejectUnauthorized: true,
    },
  });

  await transporter.sendMail({
    from: { name: smtp.fromName, address: smtp.fromEmail },
    to,
    subject,
    text: body,
  });

  return { to };
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse(405, { success: false, error: "method_not_allowed" });

  try {
    await requireAdmin(request);
    const payload = await request.json().catch(() => ({})) as EmailRequest;
    const result = await sendEmail(payload);
    return jsonResponse(200, { success: true, ...result });
  } catch (error) {
    const publicError = publicErrorFor(error);
    console.error("send-email failed", publicError);
    const status = publicError === "auth_rejected" ? 401 : publicError === "missing_secret" ? 500 : 400;
    return jsonResponse(status, { success: false, error: publicError });
  }
});
