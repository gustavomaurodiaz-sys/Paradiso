const fs = require("fs");
const http = require("http");
const path = require("path");
const nodemailer = require("nodemailer");

const port = Number(process.env.PORT || 8095);
const root = __dirname;
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function sendJson(response, status, data) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(data));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("La solicitud es demasiado grande."));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function serveStatic(request, response) {
  const urlPath = decodeURIComponent(new URL(request.url, `http://localhost:${port}`).pathname);
  const filePath = path.normalize(path.join(root, urlPath === "/" ? "index.html" : urlPath));
  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Acceso no permitido");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("No encontrado");
      return;
    }

    response.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    response.end(content);
  });
}

function normalizeSmtpConfig(smtp) {
  const port = Number(smtp?.port);
  if (!smtp?.host?.trim()) throw new Error("Falta el servidor SMTP.");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("El puerto SMTP no es valido.");
  if (!smtp?.user?.trim()) throw new Error("Falta el usuario SMTP.");
  if (!smtp?.password) throw new Error("Falta la contrasena SMTP.");
  if (!smtp?.from?.trim()) throw new Error("Falta el correo remitente.");

  return {
    host: smtp.host.trim(),
    port,
    user: smtp.user.trim(),
    password: smtp.password,
    from: smtp.from.trim(),
    fromName: smtp.fromName?.trim() || "Paradiso Nails",
    secure: Boolean(smtp.secure),
  };
}

function normalizeEmail(email) {
  if (!email?.to?.trim()) throw new Error("Falta el correo destinatario.");
  if (!email?.subject?.trim()) throw new Error("Falta el asunto del correo.");
  if (!email?.body?.trim()) throw new Error("Falta el cuerpo del correo.");

  return {
    to: email.to.trim(),
    subject: email.subject.trim(),
    body: email.body,
  };
}

function smtpErrorMessage(error) {
  const message = error?.message || "";
  const code = error?.code || "";
  const command = error?.command || "";
  const responseCode = error?.responseCode;

  if (responseCode === 535 || /invalid login|authentication failed|auth/i.test(message) || command === "AUTH") {
    return "No se pudo autenticar con el servidor SMTP. Revisar usuario y contrasena; en Gmail debe ser una contrasena de aplicacion.";
  }

  if (/wrong version number|ssl|tls|certificate|self-signed/i.test(message)) {
    return "Fallo la seguridad SSL/TLS. Revisar antivirus o inspeccion SSL; para Gmail usar smtp.gmail.com, puerto 587 y STARTTLS activado, o puerto 465 con SSL.";
  }

  if (["ECONNREFUSED", "ETIMEDOUT", "ESOCKET", "ECONNECTION"].includes(code)) {
    return "No se pudo conectar con el servidor SMTP. Revisar servidor, puerto, conexion a internet o bloqueo del puerto.";
  }

  if (/enotfound|getaddrinfo|dns/i.test(message) || code === "EDNS") {
    return "No se encontro el servidor SMTP. Revisar que el nombre del servidor este bien escrito.";
  }

  if (responseCode === 550 || responseCode === 553 || /recipient|sender|mailbox|address/i.test(message)) {
    return "El servidor SMTP rechazo el remitente o destinatario. Revisar los correos configurados.";
  }

  return message || "No se pudo enviar el correo por SMTP.";
}

function isTlsCertificateChainError(error) {
  return /self-signed certificate|certificate chain|unable to verify/i.test(error?.message || "");
}

function createSmtpTransporter(smtp, allowInvalidCertificate = false) {
  const useImplicitTls = smtp.secure && smtp.port === 465;
  const requireStartTls = smtp.secure && smtp.port !== 465;

  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: useImplicitTls,
    requireTLS: requireStartTls,
    auth: {
      user: smtp.user,
      pass: smtp.password,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
    tls: {
      servername: smtp.host,
      rejectUnauthorized: !allowInvalidCertificate,
    },
  });
}

async function sendEmail(request, response) {
  try {
    const payload = JSON.parse(await readBody(request));
    const smtp = normalizeSmtpConfig(payload.smtp);
    const email = normalizeEmail(payload.email);

    const message = {
      from: { name: smtp.fromName, address: smtp.from },
      to: email.to,
      subject: email.subject,
      text: email.body,
    };

    try {
      await createSmtpTransporter(smtp).sendMail(message);
    } catch (error) {
      if (!isTlsCertificateChainError(error)) throw error;
      await createSmtpTransporter(smtp, true).sendMail(message);
    }

    sendJson(response, 200, { success: true });
  } catch (error) {
    const status = error instanceof SyntaxError ? 400 : 500;
    sendJson(response, status, { success: false, error: smtpErrorMessage(error) });
  }
}

const server = http.createServer((request, response) => {
  if (request.method === "OPTIONS" && request.url === "/api/send-email") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    response.end();
    return;
  }

  if (request.method === "POST" && request.url === "/api/send-email") {
    sendEmail(request, response);
    return;
  }

  if (request.method === "GET") {
    serveStatic(request, response);
    return;
  }

  response.writeHead(405);
  response.end("Metodo no permitido");
});

server.listen(port, () => {
  console.log(`Paradiso disponible en http://localhost:${port}`);
});
