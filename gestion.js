const defaultServices = [
  { id: "esmaltado-semipermanente", name: "Esmaltado semipermanente", description: "Color duradero con terminacion prolija y brillo intenso.", minutes: 60, price: 30000, active: true, icon: "ES" },
  { id: "kapping-gel", name: "Kapping gel", description: "Refuerzo sobre una natural para mayor resistencia.", minutes: 90, price: 25000, active: true, icon: "KG" },
  { id: "soft-gel", name: "Soft gel", description: "Extension liviana con terminacion elegante y natural.", minutes: 90, price: 35000, active: true, icon: "SG" },
  { id: "esculpidas-acrilicas", name: "Esculpidas acrilicas", description: "Extension esculpida para largo, forma y estructura definida.", minutes: 120, price: 45000, active: true, icon: "EA" },
  { id: "esculpidas-gelificadas", name: "Esculpidas gelificadas", description: "Extension en gel con acabado pulido y resistente.", minutes: 120, price: 45000, active: true, icon: "EG" },
  { id: "retiro-semi-kapping", name: "Retiro de semipermanente/kapping", description: "Retiro cuidado para proteger la una natural.", minutes: 30, price: 10000, active: true, icon: "RS" },
  { id: "nail-art-simple", name: "Nail art simple", description: "Detalle delicado para sumar un toque especial.", minutes: 15, price: 5000, active: true, icon: "NS" },
  { id: "nail-art-elaborado", name: "Nail art elaborado", description: "Diseno mas trabajado con detalles personalizados.", minutes: 30, price: 10000, active: true, icon: "NE" },
  { id: "francesita-baby-boomer", name: "Francesita / baby boomer", description: "Terminacion clasica, suave y sofisticada.", minutes: 20, price: 8000, active: true, icon: "FB" },
  { id: "reparacion-una", name: "Reparacion por una", description: "Arreglo puntual para recuperar la pieza danada.", minutes: 15, price: 3000, active: true, icon: "RU" },
  { id: "manicura-rusa", name: "Manicura rusa", description: "Limpieza precisa de cuticulas para un acabado impecable.", minutes: 60, price: 25000, active: true, icon: "MR" },
  { id: "belleza-pies-semi", name: "Belleza de pies semipermanente", description: "Cuidado de pies con color semipermanente prolijo.", minutes: 60, price: 30000, active: true, icon: "BP" },
];

const defaultPaymentConfig = {
  alias: "laura.dba",
  holder: "Laura Paradiso",
  cbu: "",
  depositMode: "amount",
  depositValue: 0,
  message: "Transferi el importe exacto y adjunta el comprobante para validar tu reserva.",
};

const defaultAvailabilitySettings = {
  id: "default",
  openTime: "08:00",
  closeTime: "19:00",
  slotStepMinutes: 15,
  activeDays: [1, 2, 3, 4, 5, 6],
  businessTimezone: "America/Argentina/Buenos_Aires",
};

const weekDays = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miercoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sabado" },
  { value: 7, label: "Domingo" },
];

const paymentLabels = {
  pending_validation: "Pendiente de validacion de pago",
  approved: "Pago aprobado",
  rejected: "Pago rechazado",
};

const bookingLabels = {
  pending_validation: "Reservado provisionalmente",
  confirmed: "Reserva confirmada",
  payment_rejected: "Pago rechazado",
  cancelled: "Cancelada",
};

const defaultNotificationTemplates = {
  pending_validation: {
    subject: "Tu reserva quedo provisional en Paradiso Nails",
    body: `Hola {nombre_cliente} 💅✨

¡Muchas gracias por elegir Paradiso Nails!

Queremos contarte que recibimos correctamente tu solicitud y tu turno quedó reservado de manera provisional, mientras verificamos el pago de la seña.

Detalles de tu reserva

📅 Fecha: {fecha}
🕒 Hora: {hora}
💖 Servicio(s): {servicios}

Una vez que el pago sea confirmado, te enviaremos automáticamente un nuevo mensaje para avisarte que tu turno quedó confirmado.

Ante cualquier consulta estaremos felices de ayudarte.

¡Muchas gracias por confiar en Paradiso Nails! 💖`,
  },
  confirmed: {
    subject: "Tu reserva fue confirmada en Paradiso Nails",
    body: `Hola {nombre_cliente} 💅✨

¡Tenemos una excelente noticia!

Tu reserva fue confirmada y ya está todo listo para recibirte en Paradiso Nails.

Detalles de tu reserva

📅 Fecha: {fecha}
🕒 Hora: {hora}
💖 Servicio(s): {servicios}

Para que podamos brindarte la mejor experiencia, te recomendamos:

✨ No utilizar cremas ni aceites en las manos antes de asistir.
✨ Evitar cortar tus uñas previamente.
✨ Asistir con las uñas limpias. Si tenés esmalte anterior, recordanos si necesitás remoción.
✨ Si ya elegiste un diseño, podés traer una foto de referencia para inspirarnos.

Estamos muy felices de recibirte y esperamos que disfrutes un momento pensado especialmente para vos.

¡Te esperamos! 💖

Equipo Paradiso Nails`,
  },
  payment_rejected: {
    subject: "No pudimos validar el pago de tu reserva",
    body: `Hola {nombre_cliente} 💅✨

Intentamos verificar el pago correspondiente a tu reserva, pero por el momento no pudimos confirmarlo.

Datos de la reserva

📅 Fecha: {fecha}
🕒 Hora: {hora}
💖 Servicio(s): {servicios}

Esto puede deberse a un inconveniente temporal con el medio de pago o a que la transferencia aún no pudo ser validada.

No te preocupes. Si todavía deseás conservar tu turno, podés realizar nuevamente el pago o comunicarte con nosotras para ayudarte.

Será un placer asistirte.

Muchas gracias por elegir Paradiso Nails. 💖`,
  },
  cancelled: {
    subject: "Tu reserva fue cancelada",
    body: `Hola {nombre_cliente} 💅✨

Queremos informarte que tu reserva fue cancelada.

Datos de la reserva

📅 Fecha: {fecha}
🕒 Hora: {hora}
💖 Servicio(s): {servicios}

Si la cancelación fue solicitada por vos, agradecemos que nos hayas avisado.

Si se trató de un inconveniente o simplemente querés reprogramar tu turno, estaremos encantadas de ayudarte a encontrar una nueva fecha y horario.

Esperamos volver a recibirte muy pronto.

Muchas gracias por confiar en Paradiso Nails. 💕`,
  },
  aftercare: {
    subject: "Consejos para cuidar tus uñas - Paradiso Nails",
    guaranteeDays: 7,
    body: `Hola {nombre_cliente} 💅✨

¡Tus uñas quedaron hermosas! 🌟

Para cuidarlas y mantenerlas lindas por más tiempo, te dejamos algunos consejos importantes:

💖 Usá guantes al limpiar o al estar en contacto con productos químicos.
💖 Evitá el agua caliente durante las primeras horas.
💖 No uses tus uñas como herramientas para abrir cosas.
💖 Tratá de no golpearlas ni hacer fuerza innecesaria con ellas.

Tu servicio cuenta con {dias_garantia} días de garantía.

La garantía cubre desprendimientos ocasionados por defecto del material o aplicación.

No cubre daños por golpes, mal uso, mordidas, cortes, exposición excesiva a productos químicos o uso de las uñas como herramienta.

¡Disfrutá mucho tu nuevo set! 💅✨

Gracias por elegir {nombre_salon} 💖`,
  },
};

const notificationTemplateLabels = {
  ...bookingLabels,
  aftercare: "Fin de trabajo / Consejos de cuidado",
};

const storageKeys = {
  services: "paradiso_services",
  reservations: "paradiso_reservations",
  smtp: "paradiso_smtp_config",
  outbox: "paradiso_email_outbox",
  paymentConfig: "paradiso_payment_config",
  availabilitySettings: "paradiso_availability_settings",
  blockedSlots: "paradiso_blocked_slots",
  notificationTemplates: "paradiso_notification_templates",
  whatsappConfig: "paradiso_whatsapp_config",
  adminSession: "paradiso_admin_session",
};

const adminSessionModes = {
  supabase: "supabase",
  offline: "offline",
};
const openMinutes = 8 * 60;
const closeMinutes = 19 * 60;
const slotStepMinutes = 30;
const provisionalLimitMs = 24 * 60 * 60 * 1000;
const serviceImageMaxSize = 1100;
const serviceImageQuality = 0.78;
const defaultWhatsappConfig = {
  number: "",
  message: "Hola, quisiera consultar por un turno en Paradiso Nails.",
  active: true,
};
const formatter = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

let services = loadList(storageKeys.services, defaultServices);
let reservations = normalizeReservations(loadList(storageKeys.reservations, []));
let smtpConfig = sanitizeSmtpConfig(loadObject(storageKeys.smtp, {}));
let paymentConfig = loadObject(storageKeys.paymentConfig, defaultPaymentConfig);
let availabilitySettings = loadObject(storageKeys.availabilitySettings, defaultAvailabilitySettings);
let blockedSlots = loadList(storageKeys.blockedSlots, []);
let notificationTemplates = loadNotificationTemplates();
let emailOutbox = loadList(storageKeys.outbox, []);
let whatsappConfig = loadObject(storageKeys.whatsappConfig, defaultWhatsappConfig);
let activeReservationFilter = "all";
let visibleMonth = new Date();
let selectedCalendarDate = todayKey();
let activeAdminView = "menu";
let editingBlockedSlotId = "";
const aftercareSendInProgress = new Set();
visibleMonth.setDate(1);
cleanStoredSmtpSecrets();

function loadList(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch (error) {
    return fallback;
  }
}

function loadObject(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" ? { ...fallback, ...value } : fallback;
  } catch (error) {
    return fallback;
  }
}

function sanitizeSmtpConfig(config = {}) {
  return {
    from: config.from || "",
    fromName: config.fromName || "",
    adminEmail: config.adminEmail || "",
    active: config.active !== false,
  };
}

function cleanStoredSmtpSecrets() {
  const raw = localStorage.getItem(storageKeys.smtp);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    const hasSensitiveValue = Boolean(parsed?.host || parsed?.port || parsed?.user || parsed?.password || parsed?.secure !== undefined);
    if (hasSensitiveValue) {
      smtpConfig = sanitizeSmtpConfig(parsed);
      localStorage.setItem(storageKeys.smtp, JSON.stringify(smtpConfig));
    }
  } catch (error) {
    localStorage.removeItem(storageKeys.smtp);
    smtpConfig = sanitizeSmtpConfig({});
  }
}

function sanitizeWhatsappNumber(value) {
  return String(value || "").replace(/\D/g, "");
}

function whatsappUrl(config = whatsappConfig) {
  const number = sanitizeWhatsappNumber(config.number);
  if (!config.active || !number) return "";
  const message = String(config.message || defaultWhatsappConfig.message).trim();
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${query}`;
}

function loadNotificationTemplates() {
  const stored = loadObject(storageKeys.notificationTemplates, {});
  return Object.fromEntries(Object.entries(defaultNotificationTemplates).map(([status, template]) => [
    status,
    {
      subject: stored[status]?.subject || template.subject,
      body: stored[status]?.body || template.body,
      guaranteeDays: Number(stored[status]?.guaranteeDays || template.guaranteeDays || 0),
    },
  ]));
}

function normalizePaymentStatus(reservation) {
  if (["approved", "rejected", "pending_validation"].includes(reservation.paymentStatus)) return reservation.paymentStatus;
  if (reservation.paymentStatus === "paid" || reservation.status === "confirmed" || reservation.status === "paid") return "approved";
  if (reservation.paymentStatus === "pending" || reservation.status === "pending") return "pending_validation";
  if (reservation.status === "payment_rejected") return "rejected";
  return "pending_validation";
}

function normalizeBookingStatus(reservation) {
  if (["pending_validation", "confirmed", "payment_rejected", "cancelled"].includes(reservation.bookingStatus)) return reservation.bookingStatus;
  if (reservation.bookingStatus === "pending" || reservation.status === "pending") return "pending_validation";
  if (reservation.status === "confirmed") return "confirmed";
  if (reservation.status === "cancelled") return "cancelled";
  if (reservation.status === "payment_rejected") return "payment_rejected";
  return "pending_validation";
}

function normalizeReservations(items) {
  return items.map((reservation) => {
    const startTime = reservation.startTime || reservation.time;
    const minutes = Number(reservation.minutes || 0);
    const endTime = reservation.endTime || (startTime ? minutesToTime(timeToMinutes(startTime) + minutes) : "");
    const paymentStatus = normalizePaymentStatus(reservation);
    const bookingStatus = normalizeBookingStatus(reservation);
    return { ...reservation, startTime, time: startTime, endTime, paymentStatus, bookingStatus, status: bookingStatus, seenByAdmin: Boolean(reservation.seenByAdmin) };
  });
}

function refreshStateFromStorage() {
  services = loadList(storageKeys.services, defaultServices);
  reservations = normalizeReservations(loadList(storageKeys.reservations, []));
  smtpConfig = sanitizeSmtpConfig(loadObject(storageKeys.smtp, {}));
  paymentConfig = loadObject(storageKeys.paymentConfig, defaultPaymentConfig);
  availabilitySettings = loadObject(storageKeys.availabilitySettings, defaultAvailabilitySettings);
  blockedSlots = loadList(storageKeys.blockedSlots, []);
  notificationTemplates = loadNotificationTemplates();
  emailOutbox = loadList(storageKeys.outbox, []);
  whatsappConfig = loadObject(storageKeys.whatsappConfig, defaultWhatsappConfig);
  cleanStoredSmtpSecrets();
}

function saveState() {
  localStorage.setItem(storageKeys.services, JSON.stringify(services));
  localStorage.setItem(storageKeys.reservations, JSON.stringify(reservations));
  localStorage.setItem(storageKeys.smtp, JSON.stringify(sanitizeSmtpConfig(smtpConfig)));
  localStorage.setItem(storageKeys.paymentConfig, JSON.stringify(paymentConfig));
  localStorage.setItem(storageKeys.availabilitySettings, JSON.stringify(availabilitySettings));
  localStorage.setItem(storageKeys.blockedSlots, JSON.stringify(blockedSlots));
  localStorage.setItem(storageKeys.notificationTemplates, JSON.stringify(notificationTemplates));
  localStorage.setItem(storageKeys.outbox, JSON.stringify(emailOutbox));
  localStorage.setItem(storageKeys.whatsappConfig, JSON.stringify(whatsappConfig));
}

function saveServicesState() {
  localStorage.setItem(storageKeys.services, JSON.stringify(services));
}

function saveReservationsState() {
  localStorage.setItem(storageKeys.reservations, JSON.stringify(reservations));
}

function saveAvailabilityState() {
  localStorage.setItem(storageKeys.availabilitySettings, JSON.stringify(availabilitySettings));
  localStorage.setItem(storageKeys.blockedSlots, JSON.stringify(blockedSlots));
}

function cacheServices(nextServices) {
  services = Array.isArray(nextServices) ? nextServices : [];
  saveServicesState();
}

function cacheReservations(nextReservations) {
  reservations = normalizeReservations(Array.isArray(nextReservations) ? nextReservations : []);
  saveReservationsState();
}

function cacheAvailability(nextAvailability, nextBlockedSlots = blockedSlots) {
  availabilitySettings = { ...defaultAvailabilitySettings, ...(nextAvailability || {}) };
  blockedSlots = Array.isArray(nextBlockedSlots) ? nextBlockedSlots : [];
  saveAvailabilityState();
}

function mergeAdminServices(remoteServices) {
  const remoteIds = new Set(remoteServices.map((service) => service.id));
  const localInactiveServices = services.filter((service) => service && service.active === false && !remoteIds.has(service.id));
  return [...remoteServices, ...localInactiveServices].sort((a, b) => {
    const order = Number(a.sortOrder || 0) - Number(b.sortOrder || 0);
    return order || String(a.name || "").localeCompare(String(b.name || ""));
  });
}

function setOfflineMode(enabled, message = "Modo sin conexión: el acceso y los cambios son sólo temporales en este dispositivo.") {
  const notice = $("#offlineModeNotice");
  if (notice) {
    notice.textContent = message;
    notice.hidden = !enabled;
  }
}

async function refreshServicesFromSupabase(renderAfterLoad = true) {
  const serviceApi = window.paradisoSupabase?.services;
  if (!serviceApi) {
    setOfflineMode(true);
    return false;
  }

  try {
    const remoteServices = await serviceApi.list();
    setOfflineMode(false);
    cacheServices(mergeAdminServices(remoteServices));
    if (renderAfterLoad && isAdminLoggedIn()) {
      renderAdminServices();
      renderReservations();
      renderFinishedWork();
      renderCalendar();
      renderDayAvailability();
    }
    return true;
  } catch (error) {
    if (window.paradisoSupabase?.isNetworkError?.(error)) {
      setOfflineMode(true);
    } else {
      setOfflineMode(false);
      console.warn("No se pudieron cargar los servicios desde Supabase.", error);
    }
    return false;
  }
}

async function runServiceOperation(remoteOperation, localFallback) {
  const api = window.paradisoSupabase;
  if (!api?.services || !api.isAvailable?.()) {
    setOfflineMode(true);
    return localFallback();
  }

  try {
    const result = await remoteOperation(api.services);
    setOfflineMode(false);
    return result;
  } catch (error) {
    if (api.isNetworkError?.(error)) {
      setOfflineMode(true);
      console.warn("Supabase no respondio. Se usa localStorage temporalmente.", error);
      return localFallback();
    }
    setOfflineMode(false);
    throw error;
  }
}

async function refreshReservationsFromSupabase(renderAfterLoad = true) {
  const reservationApi = window.paradisoSupabase?.reservations;
  if (!reservationApi) {
    setOfflineMode(true, "Modo sin conexion: las reservas se guardan solo en este dispositivo.");
    return false;
  }

  try {
    const remoteReservations = await reservationApi.list();
    cacheReservations(remoteReservations);
    setOfflineMode(false);
    if (renderAfterLoad && isAdminLoggedIn()) {
      renderNotification();
      renderReservations();
      renderFinishedWork();
      renderCalendar();
      renderDayAvailability();
      renderPaymentSummary();
    }
    return true;
  } catch (error) {
    if (window.paradisoSupabase?.isNetworkError?.(error)) {
      setOfflineMode(true, "Modo sin conexion: las reservas se guardan solo en este dispositivo.");
    } else {
      setOfflineMode(false);
      console.warn("No se pudieron cargar las reservas desde Supabase.", error);
    }
    return false;
  }
}

async function runReservationOperation(remoteOperation, localFallback) {
  const api = window.paradisoSupabase;
  if (!api?.reservations || !api.isAvailable?.()) {
    setOfflineMode(true, "Modo sin conexion: las reservas se guardan solo en este dispositivo.");
    return localFallback();
  }

  try {
    const result = await remoteOperation(api.reservations);
    setOfflineMode(false);
    return result;
  } catch (error) {
    if (api.isNetworkError?.(error)) {
      setOfflineMode(true, "Modo sin conexion: las reservas se guardan solo en este dispositivo.");
      console.warn("Supabase no respondio. Se usan reservas locales temporalmente.", error);
      return localFallback();
    }
    setOfflineMode(false);
    throw error;
  }
}

async function refreshAvailabilityFromSupabase(renderAfterLoad = true) {
  const bookingApi = window.paradisoSupabase?.booking;
  if (!bookingApi) {
    setOfflineMode(true);
    return false;
  }

  try {
    const [remoteAvailability, remoteBlockedSlots] = await Promise.all([
      bookingApi.getAvailability(),
      bookingApi.listBlockedSlots({ activeOnly: false }),
    ]);
    cacheAvailability(remoteAvailability, remoteBlockedSlots);
    setOfflineMode(false);
    if (renderAfterLoad && isAdminLoggedIn()) {
      renderAvailabilitySettings();
      renderBlockedSlots();
      renderCalendar();
      renderDayAvailability();
    }
    return true;
  } catch (error) {
    if (window.paradisoSupabase?.isNetworkError?.(error)) {
      setOfflineMode(true);
    } else {
      setOfflineMode(false);
      console.warn("No se pudo cargar la disponibilidad desde Supabase.", error);
    }
    return false;
  }
}

async function runAvailabilityOperation(remoteOperation, localFallback) {
  const api = window.paradisoSupabase;
  if (!api?.booking || !api.isAvailable?.()) {
    setOfflineMode(true);
    return localFallback();
  }

  try {
    const result = await remoteOperation(api.booking);
    setOfflineMode(false);
    return result;
  } catch (error) {
    if (api.isNetworkError?.(error)) {
      setOfflineMode(true);
      console.warn("Supabase no respondio. Se usa disponibilidad local temporalmente.", error);
      return localFallback();
    }
    setOfflineMode(false);
    throw error;
  }
}

async function refreshPaymentConfigFromSupabase(renderAfterLoad = true) {
  const bookingApi = window.paradisoSupabase?.booking;
  if (!bookingApi) {
    setOfflineMode(true);
    return false;
  }

  try {
    paymentConfig = await bookingApi.getPaymentConfig();
    localStorage.setItem(storageKeys.paymentConfig, JSON.stringify(paymentConfig));
    setOfflineMode(false);
    if (renderAfterLoad && isAdminLoggedIn()) {
      renderPaymentConfigForm();
      renderPaymentSummary();
    }
    return true;
  } catch (error) {
    if (window.paradisoSupabase?.isNetworkError?.(error)) {
      setOfflineMode(true);
    } else {
      setOfflineMode(false);
      console.warn("No se pudo cargar la configuracion de pago desde Supabase.", error);
    }
    return false;
  }
}

async function runPaymentConfigOperation(remoteOperation, localFallback) {
  const api = window.paradisoSupabase;
  if (!api?.booking || !api.isAvailable?.()) {
    setOfflineMode(true);
    return localFallback();
  }

  try {
    const result = await remoteOperation(api.booking);
    setOfflineMode(false);
    return result;
  } catch (error) {
    if (api.isNetworkError?.(error)) {
      setOfflineMode(true);
      console.warn("Supabase no respondio. Se usa configuracion de pago local temporalmente.", error);
      return localFallback();
    }
    setOfflineMode(false);
    throw error;
  }
}

function money(value) {
  return formatter.format(value || 0).replace(/\s/g, "");
}

function durationLabel(minutes) {
  if (!minutes) return "0 min";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  if (!rest) return `${hours} h`;
  return `${hours} h ${rest} min`;
}

function todayKey() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dateLabel(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
}

function reservationEndDate(reservation) {
  if (!reservation.date || !(reservation.startTime || reservation.time)) return null;
  const [year, month, day] = reservation.date.split("-").map(Number);
  const endMinutes = reservation.endTime
    ? timeToMinutes(reservation.endTime)
    : timeToMinutes(reservation.startTime || reservation.time) + Number(reservation.minutes || 0);
  return new Date(year, month - 1, day, Math.floor(endMinutes / 60), endMinutes % 60);
}

function dateTimeLabel(value) {
  if (!value) return "Sin fecha";
  return new Date(value).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" });
}

function splitClientName(fullName) {
  const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "Cliente",
    lastName: parts.slice(1).join(" ") || "-",
  };
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[character]));
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function slug(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function makeIcon(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

function previewImageMarkup(image, label = "Sin foto personalizada") {
  return image
    ? `<img src="${escapeHtml(image)}" alt="Vista previa del servicio" />`
    : `<span>${label}</span>`;
}

function imageFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      reject(new Error("El archivo seleccionado no es una imagen."));
      return;
    }

    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      const scale = Math.min(1, serviceImageMaxSize / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/jpeg", serviceImageQuality));
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No pudimos leer la imagen seleccionada."));
    };
    image.src = objectUrl;
  });
}

async function imageValueFromControls(urlInput, fileInput) {
  const file = fileInput?.files?.[0];
  if (file) return imageFileToDataUrl(file);
  return urlInput?.value.trim() || "";
}

function setImagePreview(preview, image) {
  if (!preview) return;
  preview.innerHTML = previewImageMarkup(image);
}

function currentAdminSessionMode() {
  return sessionStorage.getItem(storageKeys.adminSession);
}

function setAdminSessionMode(mode) {
  sessionStorage.setItem(storageKeys.adminSession, mode);
}

function clearAdminSessionMode() {
  sessionStorage.removeItem(storageKeys.adminSession);
}

function isAdminLoggedIn() {
  return [adminSessionModes.supabase, adminSessionModes.offline].includes(currentAdminSessionMode());
}

function hasRecoverableOfflineSession() {
  return isAdminLoggedIn();
}

function blocksAvailability(reservation) {
  return ["pending_validation", "confirmed"].includes(reservation.bookingStatus);
}

function activeReservations() {
  return reservations.filter(blocksAvailability);
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function businessOpenMinutes() {
  return timeToMinutes(availabilitySettings.openTime || defaultAvailabilitySettings.openTime);
}

function businessCloseMinutes() {
  return timeToMinutes(availabilitySettings.closeTime || defaultAvailabilitySettings.closeTime);
}

function businessSlotStep() {
  return Number(availabilitySettings.slotStepMinutes || defaultAvailabilitySettings.slotStepMinutes);
}

function isoWeekday(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const nativeDay = new Date(year, month - 1, day).getDay();
  return nativeDay === 0 ? 7 : nativeDay;
}

function isActiveBusinessDay(dateValue) {
  return (availabilitySettings.activeDays || defaultAvailabilitySettings.activeDays).map(Number).includes(isoWeekday(dateValue));
}

function hasOverlap(dateValue, startMinutes, endMinutes) {
  return activeReservations().some((reservation) => {
    if (reservation.date !== dateValue || !reservation.startTime || !reservation.endTime) return false;
    return overlaps(startMinutes, endMinutes, timeToMinutes(reservation.startTime), timeToMinutes(reservation.endTime));
  });
}

function slotIsBlocked(dateValue, startMinutes, endMinutes) {
  return blockedSlots.some((slot) => {
    if (!slot.active || slot.date !== dateValue) return false;
    if (!slot.startTime || !slot.endTime) return true;
    return overlaps(startMinutes, endMinutes, timeToMinutes(slot.startTime), timeToMinutes(slot.endTime));
  });
}

function availableSlotsForDuration(dateValue, minutes) {
  const slots = [];
  if (!isActiveBusinessDay(dateValue)) return slots;
  const openMinutes = businessOpenMinutes();
  const closeMinutes = businessCloseMinutes();
  for (let start = openMinutes; start + minutes <= closeMinutes; start += businessSlotStep()) {
    const end = start + minutes;
    if (!hasOverlap(dateValue, start, end) && !slotIsBlocked(dateValue, start, end)) slots.push(minutesToTime(start));
  }
  return slots;
}

function isExpiredProvisional(reservation) {
  return reservation.bookingStatus === "pending_validation" && Date.now() - new Date(reservation.createdAt).getTime() > provisionalLimitMs;
}

function toggleAdminMenu(forceOpen) {
  const dropdown = $("#adminMenuDropdown");
  const button = $("#adminMenuButton");
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : dropdown.hidden;
  dropdown.hidden = !shouldOpen;
  button.setAttribute("aria-expanded", String(shouldOpen));
}

function showAdminView(view) {
  activeAdminView = view || "menu";
  $$("[data-admin-view-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.adminViewPanel !== activeAdminView;
  });
  toggleAdminMenu(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showAuthLoading() {
  const loading = $("#authLoadingScreen");
  const login = $("#loginScreen");
  const app = $("#adminApp");
  if (loading) loading.hidden = false;
  if (login) login.hidden = true;
  if (app) app.hidden = true;
}

function showLogin(message = "", isError = false) {
  const loading = $("#authLoadingScreen");
  const login = $("#loginScreen");
  const app = $("#adminApp");
  const status = $("#loginStatus");
  if (loading) loading.hidden = true;
  if (login) login.hidden = false;
  if (app) app.hidden = true;
  if (status) {
    status.textContent = message;
    status.classList.toggle("error-status", Boolean(isError));
  }
  const passwordInput = $("#adminPassword");
  if (passwordInput) passwordInput.value = "";
}

function showAdminApp() {
  const loading = $("#authLoadingScreen");
  if (loading) loading.hidden = true;
  $("#loginScreen").hidden = true;
  $("#adminApp").hidden = false;
  renderAllAdmin();
  showAdminView(activeAdminView);
  refreshServicesFromSupabase();
  refreshReservationsFromSupabase();
  refreshAvailabilityFromSupabase();
  refreshPaymentConfigFromSupabase();
}

function renderAllAdmin() {
  renderNotification();
  renderNotificationTemplates();
  renderWhatsappConfigForm();
  renderPaymentConfigForm();
  renderPaymentSummary();
  renderAvailabilitySettings();
  renderBlockedSlots();
  renderAdminServices();
  renderReservations();
  renderFinishedWork();
  renderCalendar();
  renderDayAvailability();
  renderSmtpForm();
}

function renderNotification() {
  const count = reservations.filter((reservation) => !reservation.seenByAdmin).length;
  $("#newReservationNotice").hidden = count === 0;
  $("#newReservationText").textContent = `${count} ${count === 1 ? "reserva nueva" : "reservas nuevas"}`;
}

function renderNotificationTemplates() {
  $("#notificationTemplateFields").innerHTML = Object.entries(notificationTemplateLabels).map(([status, label]) => {
    const template = notificationTemplates[status] || defaultNotificationTemplates[status];
    return `
      <article class="notification-template-card" data-notification-status="${status}">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">${label}</p>
            <h3>${label}</h3>
          </div>
        </div>
        <label>Asunto del email
          <input type="text" class="notification-subject" value="${escapeHtml(template.subject)}" required />
        </label>
        ${status === "aftercare" ? `
          <label>D&iacute;as de garant&iacute;a
            <input type="number" class="notification-guarantee-days" min="0" step="1" value="${template.guaranteeDays || 7}" required />
          </label>
        ` : ""}
        <label>Cuerpo del email / mensaje
          <textarea class="notification-body" rows="9" required>${escapeHtml(template.body)}</textarea>
        </label>
      </article>
    `;
  }).join("");
}

function renderWhatsappPreview() {
  const preview = $("#whatsappLinkPreview");
  if (!preview) return;
  const numberInput = $("#whatsappConsultNumber");
  if (numberInput) numberInput.value = sanitizeWhatsappNumber(numberInput.value);
  const nextConfig = {
    number: numberInput?.value || whatsappConfig.number,
    message: $("#whatsappConsultMessage")?.value || whatsappConfig.message,
    active: $("#whatsappConsultActive")?.value !== "false",
  };
  const url = whatsappUrl(nextConfig);
  preview.textContent = url ? `Vista previa: ${url}` : "El boton se ocultara hasta cargar un numero valido.";
}

function renderWhatsappConfigForm() {
  $("#whatsappConsultNumber").value = sanitizeWhatsappNumber(whatsappConfig.number);
  $("#whatsappConsultActive").value = String(whatsappConfig.active !== false);
  $("#whatsappConsultMessage").value = whatsappConfig.message || defaultWhatsappConfig.message;
  renderWhatsappPreview();
}

function saveWhatsappConfig() {
  const number = sanitizeWhatsappNumber($("#whatsappConsultNumber").value);
  const active = $("#whatsappConsultActive").value === "true";
  const message = $("#whatsappConsultMessage").value.trim() || defaultWhatsappConfig.message;
  const status = $("#whatsappSettingsStatus");

  if (active && !number) {
    status.textContent = "Cargá un número válido o dejá WhatsApp inactivo.";
    status.classList.add("error-status");
    status.hidden = false;
    return;
  }

  whatsappConfig = { number, message, active };
  localStorage.setItem(storageKeys.whatsappConfig, JSON.stringify(whatsappConfig));
  renderWhatsappPreview();
  status.textContent = "WhatsApp guardado correctamente.";
  status.classList.remove("error-status");
  status.hidden = false;
}

function saveNotificationTemplates() {
  notificationTemplates = Object.fromEntries($$(".notification-template-card").map((card) => [
    card.dataset.notificationStatus,
    {
      subject: card.querySelector(".notification-subject").value.trim(),
      body: card.querySelector(".notification-body").value.trim(),
      guaranteeDays: Number(card.querySelector(".notification-guarantee-days")?.value || defaultNotificationTemplates[card.dataset.notificationStatus]?.guaranteeDays || 0),
    },
  ]));
  saveState();
  $("#notificationTemplateStatus").textContent = "Mensajes guardados correctamente.";
}

function resetNotificationTemplates() {
  notificationTemplates = JSON.parse(JSON.stringify(defaultNotificationTemplates));
  saveState();
  renderNotificationTemplates();
  $("#notificationTemplateStatus").textContent = "Textos restaurados.";
}

function renderPaymentConfigForm() {
  $("#paymentDepositEnabled").value = Number(paymentConfig.depositValue || 0) > 0 ? "true" : "false";
  $("#paymentDepositMode").value = paymentConfig.depositMode || "amount";
  $("#paymentDepositValue").value = paymentConfig.depositValue || "";
  $("#paymentAlias").value = paymentConfig.alias || "";
  $("#paymentHolder").value = paymentConfig.holder || "";
  $("#paymentCbu").value = paymentConfig.cbu || "";
  $("#paymentMessage").value = paymentConfig.message || "";
  togglePaymentDepositFields();
}

function togglePaymentDepositFields() {
  const enabled = $("#paymentDepositEnabled")?.value !== "false";
  if ($("#paymentDepositMode")) $("#paymentDepositMode").disabled = !enabled;
  if ($("#paymentDepositValue")) $("#paymentDepositValue").disabled = !enabled;
}

function renderPaymentSummary() {
  const groups = [
    ["Pagos pendientes", reservations.filter((reservation) => reservation.paymentStatus === "pending_validation")],
    ["Pagos confirmados", reservations.filter((reservation) => reservation.paymentStatus === "approved")],
    ["Pagos rechazados", reservations.filter((reservation) => reservation.paymentStatus === "rejected")],
  ];
  $("#paymentSummary").innerHTML = `
    ${groups.map(([label, items]) => `
      <article>
        <span>${label}</span>
        <strong>${items.length}</strong>
        <div class="payment-mini-list">
          ${items.length ? items.slice(0, 5).map((reservation) => `
            <small>${escapeHtml(reservation.client?.name || "Cliente")} · ${escapeHtml(reservation.date || "Sin fecha")} · ${money(reservation.depositAmount ?? reservation.total)}</small>
          `).join("") : "<small>Sin movimientos</small>"}
        </div>
      </article>
    `).join("")}
  `;
}

function paymentConfigFromForm() {
  const depositEnabled = $("#paymentDepositEnabled").value === "true";
  const depositMode = $("#paymentDepositMode").value;
  const rawValue = $("#paymentDepositValue").value;
  const depositValue = depositEnabled ? Number(rawValue || 0) : 0;
  return {
    depositMode: $("#paymentDepositMode").value,
    depositValue,
    alias: $("#paymentAlias").value.trim(),
    holder: $("#paymentHolder").value.trim(),
    cbu: $("#paymentCbu").value.trim(),
    message: $("#paymentMessage").value.trim(),
  };
}

function validatePaymentConfig(config) {
  if (!Number.isFinite(config.depositValue)) return "La seña debe ser un número válido.";
  if (config.depositValue < 0) return "La seña no puede ser negativa.";
  if (config.depositMode === "percent" && config.depositValue > 100) return "El porcentaje de seña debe estar entre 0 y 100.";
  if (!["amount", "percent"].includes(config.depositMode)) return "El tipo de seña no es válido.";
  return "";
}

async function savePaymentConfig() {
  const nextConfig = paymentConfigFromForm();
  const validationError = validatePaymentConfig(nextConfig);
  if (validationError) throw new Error(validationError);

  const savedConfig = await runPaymentConfigOperation(
    (bookingApi) => bookingApi.updatePaymentConfig(nextConfig),
    () => nextConfig,
  );
  paymentConfig = savedConfig;
  localStorage.setItem(storageKeys.paymentConfig, JSON.stringify(paymentConfig));
  renderPaymentConfigForm();
  renderPaymentSummary();
  $("#paymentConfigStatus").textContent = "Configuracion de cobro guardada.";
  $("#paymentConfigStatus").classList.remove("error-status");
  $("#paymentConfigStatus").hidden = false;
}

function setInlineStatus(selector, message, isError = false) {
  const target = $(selector);
  if (!target) return;
  target.textContent = message;
  target.classList.toggle("error-status", isError);
  target.hidden = false;
}

function renderAvailabilitySettings() {
  const activeDays = new Set((availabilitySettings.activeDays || []).map(Number));
  $("#availabilityDayFields").innerHTML = weekDays.map((day) => `
    <label class="availability-day-toggle">
      <input type="checkbox" value="${day.value}" ${activeDays.has(day.value) ? "checked" : ""} />
      <span>${day.label}</span>
    </label>
  `).join("");
  $("#availabilityOpenTime").value = availabilitySettings.openTime || defaultAvailabilitySettings.openTime;
  $("#availabilityCloseTime").value = availabilitySettings.closeTime || defaultAvailabilitySettings.closeTime;
  $("#availabilitySlotStep").value = availabilitySettings.slotStepMinutes || defaultAvailabilitySettings.slotStepMinutes;
}

function blockedSlotLabel(slot) {
  if (!slot.startTime || !slot.endTime) return "Dia completo";
  return `${slot.startTime} a ${slot.endTime}`;
}

function renderBlockedSlots() {
  $("#blockedSlotDate").min = todayKey();
  if (!$("#blockedSlotDate").value) $("#blockedSlotDate").value = todayKey();
  toggleBlockedSlotTimeFields();
  const sorted = [...blockedSlots].sort((a, b) => {
    const byDate = String(a.date || "").localeCompare(String(b.date || ""));
    return byDate || String(a.startTime || "").localeCompare(String(b.startTime || ""));
  });
  $("#blockedSlotRows").innerHTML = sorted.length
    ? sorted.map((slot) => `
      <article class="admin-row blocked-slot-row" data-blocked-slot-id="${slot.id}">
        <div class="admin-row-fields">
          <div>
            <strong>${escapeHtml(slot.date || "Sin fecha")}</strong>
            <span>${escapeHtml(blockedSlotLabel(slot))}</span>
            ${slot.reason ? `<p class="slot-empty">${escapeHtml(slot.reason)}</p>` : ""}
          </div>
        </div>
        <div class="admin-row-actions">
          <span class="status-pill ${slot.active ? "approved" : "cancelled"}">${slot.active ? "Activo" : "Inactivo"}</span>
          <button class="button secondary light edit-blocked-slot" type="button">Editar</button>
          <button class="button secondary light toggle-blocked-slot" type="button">${slot.active ? "Desactivar" : "Activar"}</button>
        </div>
      </article>
    `).join("")
    : '<p class="slot-empty">No hay bloqueos cargados.</p>';
}

function blockedSlotFromForm() {
  const mode = $("#blockedSlotMode").value;
  return {
    date: $("#blockedSlotDate").value,
    fullDay: mode === "full-day",
    startTime: mode === "full-day" ? "" : $("#blockedSlotStartTime").value,
    endTime: mode === "full-day" ? "" : $("#blockedSlotEndTime").value,
    reason: $("#blockedSlotReason").value.trim(),
    active: $("#blockedSlotActive").value === "true",
  };
}

function validateBlockedSlot(slot) {
  if (!slot.date) return "Elegí una fecha para el bloqueo.";
  if (slot.date < todayKey()) return "No se puede crear un bloqueo en una fecha pasada.";
  if (slot.fullDay) return "";
  if (!slot.startTime || !slot.endTime) return "Completá hora de inicio y fin.";
  const start = timeToMinutes(slot.startTime);
  const end = timeToMinutes(slot.endTime);
  if (end <= start) return "La hora final debe ser mayor a la inicial.";
  if (start < businessOpenMinutes() || end > businessCloseMinutes()) return "El rango debe estar dentro del horario de atención.";
  return "";
}

function affectedReservationsForBlockedSlot(slot) {
  if (!slot.active) return [];
  return activeReservations().filter((reservation) => {
    if (reservation.date !== slot.date || !reservation.startTime || !reservation.endTime) return false;
    if (slot.fullDay) return true;
    return overlaps(
      timeToMinutes(slot.startTime),
      timeToMinutes(slot.endTime),
      timeToMinutes(reservation.startTime),
      timeToMinutes(reservation.endTime),
    );
  });
}

function confirmAffectedReservations(slot) {
  const affected = affectedReservationsForBlockedSlot(slot);
  if (!affected.length) return true;
  const detail = affected.map((reservation) => (
    `- ${reservation.client?.name || "Cliente"}: ${reservation.startTime} a ${reservation.endTime} (${bookingLabels[reservation.bookingStatus]})`
  )).join("\n");
  return window.confirm(`Este bloqueo coincide con reservas activas. No se van a modificar, pero quedaran dentro del bloqueo:\n\n${detail}\n\n¿Querés guardar el bloqueo igualmente?`);
}

function fillBlockedSlotForm(slot) {
  editingBlockedSlotId = slot?.id || "";
  $("#blockedSlotDate").value = slot?.date || todayKey();
  const fullDay = !slot?.startTime || !slot?.endTime;
  $("#blockedSlotMode").value = fullDay ? "full-day" : "range";
  $("#blockedSlotStartTime").value = fullDay ? "" : slot.startTime;
  $("#blockedSlotEndTime").value = fullDay ? "" : slot.endTime;
  $("#blockedSlotReason").value = slot?.reason || "";
  $("#blockedSlotActive").value = String(slot?.active !== false);
  $("#cancelBlockedSlotEdit").hidden = !editingBlockedSlotId;
  toggleBlockedSlotTimeFields();
}

function resetBlockedSlotForm() {
  editingBlockedSlotId = "";
  $("#blockedSlotForm").reset();
  $("#blockedSlotDate").value = todayKey();
  $("#blockedSlotActive").value = "true";
  $("#cancelBlockedSlotEdit").hidden = true;
  toggleBlockedSlotTimeFields();
}

function toggleBlockedSlotTimeFields() {
  const fullDay = $("#blockedSlotMode").value === "full-day";
  $("#blockedSlotTimeFields").hidden = fullDay;
  $("#blockedSlotStartTime").required = !fullDay;
  $("#blockedSlotEndTime").required = !fullDay;
}

async function saveAvailabilitySettings() {
  const activeDays = $$("#availabilityDayFields input:checked").map((input) => Number(input.value));
  const nextSettings = {
    ...availabilitySettings,
    openTime: $("#availabilityOpenTime").value,
    closeTime: $("#availabilityCloseTime").value,
    slotStepMinutes: Number($("#availabilitySlotStep").value),
    activeDays,
  };
  if (!activeDays.length) throw new Error("Dejá al menos un día activo.");
  if (timeToMinutes(nextSettings.closeTime) <= timeToMinutes(nextSettings.openTime)) throw new Error("La hora de cierre debe ser mayor a la apertura.");
  if (nextSettings.slotStepMinutes < 5) throw new Error("El intervalo mínimo es de 5 minutos.");

  const savedSettings = await runAvailabilityOperation(
    (bookingApi) => bookingApi.updateAvailability(nextSettings),
    () => nextSettings,
  );
  availabilitySettings = savedSettings;
  saveAvailabilityState();
  renderAvailabilitySettings();
  renderCalendar();
  renderDayAvailability();
  setInlineStatus("#availabilityStatus", "Disponibilidad guardada correctamente.");
}

async function saveBlockedSlotFromForm() {
  const nextSlot = blockedSlotFromForm();
  const validationError = validateBlockedSlot(nextSlot);
  if (validationError) throw new Error(validationError);
  if (!confirmAffectedReservations(nextSlot)) return;

  const savedSlot = await runAvailabilityOperation(
    (bookingApi) => editingBlockedSlotId
      ? bookingApi.updateBlockedSlot(editingBlockedSlotId, nextSlot)
      : bookingApi.createBlockedSlot(nextSlot),
    () => ({ ...nextSlot, id: editingBlockedSlotId || `local-block-${Date.now()}` }),
  );
  blockedSlots = editingBlockedSlotId
    ? blockedSlots.map((slot) => (slot.id === editingBlockedSlotId ? savedSlot : slot))
    : [savedSlot, ...blockedSlots];
  saveAvailabilityState();
  resetBlockedSlotForm();
  renderBlockedSlots();
  renderCalendar();
  renderDayAvailability();
  setInlineStatus("#blockedSlotStatus", "Bloqueo guardado correctamente.");
}

async function toggleBlockedSlot(slotId) {
  const slot = blockedSlots.find((item) => item.id === slotId);
  if (!slot) return;
  const nextSlot = { ...slot, active: !slot.active, fullDay: !slot.startTime || !slot.endTime };
  if (!confirmAffectedReservations(nextSlot)) return;
  const savedSlot = await runAvailabilityOperation(
    (bookingApi) => bookingApi.updateBlockedSlot(slot.id, nextSlot),
    () => nextSlot,
  );
  blockedSlots = blockedSlots.map((item) => (item.id === slot.id ? savedSlot : item));
  saveAvailabilityState();
  renderBlockedSlots();
  renderCalendar();
  renderDayAvailability();
  setInlineStatus("#blockedSlotStatus", savedSlot.active ? "Bloqueo activado." : "Bloqueo desactivado.");
}

function renderAdminServices() {
  $("#adminServiceRows").innerHTML = services.map((service) => `
    <article class="admin-row" data-service-id="${service.id}">
      <div class="service-image-editor">
        <div class="admin-image-preview">
          ${previewImageMarkup(service.image)}
        </div>
        <div class="service-image-controls">
          <label>URL de imagen<input data-field="image" type="url" value="${escapeHtml(service.image || "")}" placeholder="https://..." /></label>
          <label>Cambiar foto<input data-field="imageFile" type="file" accept="image/*" /></label>
          <p class="slot-empty">Sub&iacute; una foto o peg&aacute; una URL. Si la dej&aacute;s vac&iacute;a, se usa una imagen editorial predeterminada.</p>
        </div>
      </div>
      <div class="admin-row-fields">
        <label>Nombre<input data-field="name" value="${escapeHtml(service.name)}" /></label>
        <label>Precio<input data-field="price" type="number" min="0" step="500" value="${service.price}" /></label>
        <label>Duracion<input data-field="minutes" type="number" min="5" step="5" value="${service.minutes}" /></label>
        <label>Descripcion<textarea data-field="description" rows="2">${escapeHtml(service.description)}</textarea></label>
      </div>
      <div class="admin-row-actions">
        <span class="status-pill ${service.active ? "approved" : "cancelled"}">${service.active ? "Activo" : "Inactivo"}</span>
        <button class="button secondary light save-service" type="button">Guardar</button>
        <button class="button secondary light clear-service-image" type="button">Quitar foto</button>
        <button class="button secondary light toggle-service" type="button">${service.active ? "Desactivar" : "Activar"}</button>
        <button class="button secondary light delete-service" type="button">Eliminar</button>
      </div>
    </article>
  `).join("");
}

async function createServiceFromForm() {
  const name = $("#newServiceName").value.trim();
  const price = Number($("#newServicePrice").value);
  const minutes = Number($("#newServiceMinutes").value);
  const description = $("#newServiceDescription").value.trim();
  if (!name || !price || !minutes || !description) return;
  const image = await imageValueFromControls($("#newServiceImageUrl"), $("#newServiceImageFile"));
  const idBase = slug(name) || `servicio-${Date.now()}`;
  const id = services.some((service) => service.id === idBase || service.slug === idBase) ? `${idBase}-${Date.now()}` : idBase;
  const localService = { id, slug: id, name, price, minutes, description, image, active: true, icon: makeIcon(name), sortOrder: services.length };
  const savedService = await runServiceOperation(
    (serviceApi) => serviceApi.create(localService, services.length),
    () => localService,
  );
  services.push(savedService);
  $("#adminServiceForm").reset();
  $("#newServiceImagePreview").innerHTML = "<span>Sin foto personalizada</span>";
  saveServicesState();
  renderAdminServices();
}

async function updateService(row) {
  const service = services.find((item) => item.id === row.dataset.serviceId);
  if (!service) return;
  const nextService = {
    ...service,
    name: row.querySelector('[data-field="name"]').value.trim(),
    price: Number(row.querySelector('[data-field="price"]').value),
    minutes: Number(row.querySelector('[data-field="minutes"]').value),
    description: row.querySelector('[data-field="description"]').value.trim(),
    image: await imageValueFromControls(row.querySelector('[data-field="image"]'), row.querySelector('[data-field="imageFile"]')),
  };
  nextService.icon = makeIcon(nextService.name);
  nextService.slug = nextService.slug || slug(nextService.name) || nextService.id;

  const savedService = await runServiceOperation(
    (serviceApi) => serviceApi.update(service.id, nextService),
    () => nextService,
  );
  services = services.map((item) => (item.id === service.id ? savedService : item));
  saveServicesState();
  renderAdminServices();
}

async function clearServiceImage(serviceId) {
  const service = services.find((item) => item.id === serviceId);
  if (!service) return;
  const nextService = { ...service, image: "" };
  const savedService = await runServiceOperation(
    (serviceApi) => serviceApi.update(service.id, nextService),
    () => nextService,
  );
  services = services.map((item) => (item.id === service.id ? savedService : item));
  saveServicesState();
  renderAdminServices();
}

async function toggleService(serviceId) {
  const service = services.find((item) => item.id === serviceId);
  if (!service) return;
  const nextService = { ...service, active: !service.active };
  const savedService = await runServiceOperation(
    (serviceApi) => serviceApi.update(service.id, nextService),
    () => nextService,
  );
  services = services.map((item) => (item.id === service.id ? savedService : item));
  saveServicesState();
  renderAdminServices();
}

async function deleteService(serviceId) {
  await runServiceOperation(
    (serviceApi) => serviceApi.delete(serviceId),
    () => undefined,
  );
  services = services.filter((service) => service.id !== serviceId);
  saveServicesState();
  renderAdminServices();
}

function reservationMatchesFilter(reservation) {
  if (activeReservationFilter === "all") return true;
  if (activeReservationFilter === "paid") return reservation.paymentStatus === "approved";
  if (activeReservationFilter === "pending") return reservation.bookingStatus === "pending_validation";
  if (activeReservationFilter === "confirmed") return reservation.bookingStatus === "confirmed";
  if (activeReservationFilter === "cancelled") return ["cancelled", "payment_rejected"].includes(reservation.bookingStatus);
  return true;
}

function proofActions(reservation) {
  if (!reservation.paymentProof?.dataUrl) return '<span>Sin comprobante</span>';
  return `
    <a class="button secondary light proof-link" href="${reservation.paymentProof.dataUrl}" target="_blank" rel="noreferrer">Ver comprobante</a>
    <a class="button secondary light proof-link" href="${reservation.paymentProof.dataUrl}" download="${reservation.paymentProof.name}">Descargar</a>
  `;
}

function notificationServices(reservation) {
  const names = reservation.services?.map((service) => service.name).filter(Boolean) || [];
  return names.length ? names.join(", ") : "Servicio no especificado";
}

function notificationVariables(reservation, status) {
  const clientName = splitClientName(reservation.client?.name);
  const template = notificationTemplates[status] || {};
  return {
    "{nombre_cliente}": clientName.firstName,
    "{apellido_cliente}": clientName.lastName,
    "{fecha}": reservation.date ? dateLabel(reservation.date) : "Fecha pendiente",
    "{hora}": reservation.startTime || reservation.time || "Horario pendiente",
    "{servicios}": notificationServices(reservation),
    "{total}": money(reservation.total),
    "{estado_reserva}": bookingLabels[status] || notificationTemplateLabels[status] || "Estado pendiente",
    "{dias_garantia}": String(template.guaranteeDays || defaultNotificationTemplates.aftercare.guaranteeDays),
    "{nombre_salon}": "Paradiso Nails",
  };
}

function fillNotificationTemplate(template, reservation, status) {
  const variables = notificationVariables(reservation, status);
  return Object.entries(variables).reduce((text, [key, value]) => text.replaceAll(key, value), template || "");
}

function notificationContent(reservation, status) {
  const template = notificationTemplates[status];
  if (!template) return { subject: "", body: "" };
  return {
    subject: fillNotificationTemplate(template.subject, reservation, status),
    body: fillNotificationTemplate(template.body, reservation, status),
  };
}

function normalizeWhatsAppPhone(value) {
  let digits = String(value || "").replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length === 10 && !digits.startsWith("54")) digits = `549${digits}`;
  if (digits.length === 11 && digits.startsWith("9")) digits = `54${digits}`;
  return digits.length >= 10 ? digits : "";
}

function showAdminNotice(message, isError = false) {
  let target = $("#adminNotificationStatus");
  if (!target) {
    target = document.createElement("p");
    target.id = "adminNotificationStatus";
    target.className = "admin-status";
    $("#reservationRows")?.before(target);
  }
  target.textContent = message;
  target.classList.toggle("error-status", isError);
  target.hidden = false;
}

function openClientNotification(reservation, subject, message) {
  const phone = normalizeWhatsAppPhone(reservation.client?.phone);
  if (phone) {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, "_blank");
    if (!opened) {
      return { success: false, channel: "WhatsApp", to: reservation.client.phone, error: "El navegador bloqueo la apertura de WhatsApp." };
    }
    opened.opener = null;
    return { success: true, channel: "WhatsApp", to: reservation.client.phone, error: "" };
  }

  const email = reservation.client?.email;
  if (email) {
    const emailSubject = encodeURIComponent(subject || "Actualizacion de tu reserva - Paradiso Nails");
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${email}?subject=${emailSubject}&body=${body}`;
    return { success: true, channel: "Correo", to: email, error: "" };
  }

  return { success: false, channel: "Sin medio", to: "", error: "La reserva no tiene telefono ni correo del cliente." };
}

function registerClientNotification(reservation, previousStatus) {
  const nextStatus = reservation.bookingStatus;
  if (previousStatus === nextStatus || !notificationTemplates[nextStatus]) return null;

  const content = notificationContent(reservation, nextStatus);
  const delivery = openClientNotification(reservation, content.subject, content.body);
  const sentAt = new Date().toISOString();
  const entry = {
    id: `notification-${Date.now()}`,
    status: nextStatus,
    label: bookingLabels[nextStatus],
    channel: delivery.channel,
    to: delivery.to,
    subject: content.subject,
    message: content.body,
    sentAt,
    success: delivery.success,
    error: delivery.error,
  };

  reservation.notifications = [entry, ...(Array.isArray(reservation.notifications) ? reservation.notifications : [])];
  reservation.lastNotificationAt = sentAt;
  reservation.lastNotificationStatus = nextStatus;
  reservation.lastNotificationSuccess = delivery.success;
  reservation.lastNotificationError = delivery.error;
  return entry;
}

function renderNotificationLog(reservation) {
  const notifications = Array.isArray(reservation.notifications) ? reservation.notifications : [];
  if (!notifications.length) return '<p class="notification-log empty">Sin notificaciones enviadas al cliente.</p>';

  return `
    <div class="notification-log">
      <strong>Notificaciones al cliente</strong>
      ${notifications.slice(0, 3).map((entry) => `
        <span class="${entry.success ? "sent" : "failed"}">
          ${entry.success ? "Enviada" : "Fallida"} por ${escapeHtml(entry.channel)} &middot; ${escapeHtml(entry.label)} &middot; ${dateTimeLabel(entry.sentAt)}
          ${entry.error ? `<small>${escapeHtml(entry.error)}</small>` : ""}
        </span>
      `).join("")}
    </div>
  `;
}

function finishedWorkReservations() {
  return reservations
    .filter((reservation) => {
      if (["cancelled", "payment_rejected"].includes(reservation.bookingStatus)) return false;
      const endDate = reservationEndDate(reservation);
      return endDate && endDate.getTime() <= Date.now();
    })
    .sort((a, b) => reservationEndDate(b).getTime() - reservationEndDate(a).getTime());
}

function showAftercareStatus(message, isError = false) {
  const target = $("#aftercareStatus");
  target.textContent = message;
  target.classList.toggle("error-status", isError);
  target.hidden = false;
}

function isSmtpConfigComplete() {
  return smtpConfig.active !== false;
}

async function sendEmailWithSmtp({ to, subject, body }) {
  if (!isSmtpConfigComplete()) {
    throw new Error("El envio de correo esta desactivado en gestion.");
  }

  const emailApi = window.paradisoSupabase?.email;
  if (!emailApi?.send) throw new Error("La funcion segura de correo no esta disponible.");

  return emailApi.send({
    type: "custom",
    to,
    subject,
    body,
  });
}

function renderFinishedWork() {
  const items = finishedWorkReservations();
  if (!items.length) {
    $("#finishedWorkRows").innerHTML = '<p class="slot-empty">Todavia no hay trabajos finalizados para enviar consejos.</p>';
    return;
  }

  $("#finishedWorkRows").innerHTML = items.map((reservation) => {
    const clientName = splitClientName(reservation.client?.name);
    const aftercare = reservation.aftercareAdvice || {};
    const wasSent = Boolean(aftercare.success && aftercare.sentAt);
    return `
      <article class="reservation-row finished-work-row" data-reservation-id="${reservation.id}">
        <div class="reservation-main">
          <div>
            <strong>${escapeHtml(clientName.firstName)} ${escapeHtml(clientName.lastName)}</strong>
            <span>${escapeHtml(reservation.client?.email || "Sin correo")} &middot; ${escapeHtml(reservation.client?.phone || "Sin telefono")}</span>
          </div>
          <span class="status-pill ${wasSent ? "confirmed" : reservation.bookingStatus}">${wasSent ? "Consejos enviados" : bookingLabels[reservation.bookingStatus]}</span>
        </div>
        <div class="reservation-services">${reservation.services.map((service) => `<span>${escapeHtml(service.name)}</span>`).join("")}</div>
        <div class="reservation-meta">
          <span>Nombre: ${escapeHtml(clientName.firstName)}</span>
          <span>Apellido: ${escapeHtml(clientName.lastName)}</span>
          <span>Fecha: ${escapeHtml(reservation.date)}</span>
          <span>Hora: ${escapeHtml(reservation.startTime || reservation.time)}</span>
        </div>
        <div class="reservation-meta">
          <span>Duracion: ${durationLabel(reservation.minutes)}</span>
          <span>Estado turno: ${bookingLabels[reservation.bookingStatus]}</span>
          <span>Estado pago: ${paymentLabels[reservation.paymentStatus]}</span>
          <span>${wasSent ? `Enviado: ${dateTimeLabel(aftercare.sentAt)}` : "Pendiente de envio"}</span>
        </div>
        <div class="form-row compact-actions">
          <button class="button primary send-aftercare" type="button" ${wasSent ? "disabled" : ""}>Enviar consejos</button>
        </div>
      </article>
    `;
  }).join("");
}

async function sendAftercareEmail(row) {
  const reservation = reservations.find((item) => item.id === row.dataset.reservationId);
  if (!reservation) return;
  if (reservation.aftercareAdvice?.success) {
    showAftercareStatus("Los consejos ya fueron enviados para esta reserva. Se evito un envio duplicado.");
    return;
  }
  if (aftercareSendInProgress.has(reservation.id)) {
    showAftercareStatus("El envio de consejos ya esta en proceso.");
    return;
  }

  const email = reservation.client?.email?.trim();
  const content = notificationContent(reservation, "aftercare");
  const button = row.querySelector(".send-aftercare");
  aftercareSendInProgress.add(reservation.id);
  if (button) {
    button.disabled = true;
    button.textContent = "Enviando...";
  }

  if (!email) {
    reservation.aftercareAdvice = { attemptedAt: new Date().toISOString(), success: false, error: "La reserva no tiene correo cargado.", channel: "email", to: "" };
    aftercareSendInProgress.delete(reservation.id);
    saveState();
    renderFinishedWork();
    showAftercareStatus("No se pudo enviar: la reserva no tiene correo cargado.", true);
    return;
  }

  try {
    await sendEmailWithSmtp({ to: email, subject: content.subject, body: content.body });
    const sentAt = new Date().toISOString();
    reservation.aftercareAdvice = { sentAt, success: true, error: "", channel: "email", to: email, subject: content.subject };
    emailOutbox.unshift({ to: email, type: "aftercare", reservationId: reservation.id, subject: content.subject, body: content.body, createdAt: sentAt, status: "sent" });
    saveState();
    renderFinishedWork();
    showAftercareStatus("Consejos enviados correctamente.");
  } catch (error) {
    reservation.aftercareAdvice = { attemptedAt: new Date().toISOString(), success: false, error: error.message, channel: "email", to: email, subject: content.subject };
    emailOutbox.unshift({ to: email, type: "aftercare", reservationId: reservation.id, subject: content.subject, body: content.body, createdAt: new Date().toISOString(), status: "failed", error: error.message });
    saveState();
    renderFinishedWork();
    showAftercareStatus(`No se pudo enviar el correo: ${error.message}`, true);
  } finally {
    aftercareSendInProgress.delete(reservation.id);
  }
}

function renderReservations() {
  const visible = reservations.filter(reservationMatchesFilter);
  if (!visible.length) {
    $("#reservationRows").innerHTML = '<p class="slot-empty">No hay reservas para mostrar.</p>';
    return;
  }
  $("#reservationRows").innerHTML = visible.map((reservation) => `
    <article class="reservation-row ${reservation.seenByAdmin ? "" : "new-reservation"} ${isExpiredProvisional(reservation) ? "expired-reservation" : ""}" data-reservation-id="${reservation.id}">
      <div class="reservation-main">
        <div>
          <strong>${reservation.client.name}</strong>
          <span>${reservation.date} &middot; ${reservation.startTime} a ${reservation.endTime} &middot; ${reservation.client.phone}</span>
          <span>${reservation.client.email}</span>
        </div>
        <span class="status-pill ${reservation.bookingStatus}">${bookingLabels[reservation.bookingStatus]}</span>
      </div>
      ${isExpiredProvisional(reservation) ? '<p class="reservation-alert">Reserva provisional con mas de 24 horas sin aprobacion. Revisar o liberar horario.</p>' : ""}
      <div class="reservation-services">${reservation.services.map((service) => `<span>${service.name}</span>`).join("")}</div>
      <div class="reservation-meta">
        <span>Total: ${money(reservation.total)}</span>
        <span>Se&ntilde;a: ${money(reservation.depositAmount ?? reservation.total)}</span>
        <span>Tiempo: ${durationLabel(reservation.minutes)}</span>
        <span>Pago: ${paymentLabels[reservation.paymentStatus]}</span>
      </div>
      <div class="reservation-meta">
        <span>Alias: ${reservation.paymentConfig?.alias || paymentConfig.alias}</span>
        <span>Titular: ${reservation.paymentConfig?.holder || paymentConfig.holder}</span>
        <span>Ref: ${reservation.paymentReference || reservation.reference}</span>
        <span>Comprobante: ${reservation.paymentProof?.name || "Sin archivo"}</span>
        <span>Estado: ${bookingLabels[reservation.bookingStatus]}</span>
      </div>
      ${reservation.comment ? `<p class="reservation-comment">${reservation.comment}</p>` : ""}
      ${reservation.paymentNotes ? `<p class="reservation-comment">Pago: ${reservation.paymentNotes}</p>` : ""}
      <div class="proof-actions">${proofActions(reservation)}</div>
      ${renderNotificationLog(reservation)}
      <div class="form-row compact-actions">
        <label>
          Estado del pago
          <select class="payment-status">
            ${Object.entries(paymentLabels).map(([value, label]) => `<option value="${value}" ${reservation.paymentStatus === value ? "selected" : ""}>${label}</option>`).join("")}
          </select>
        </label>
        <label>
          Estado del turno
          <select class="booking-status">
            ${Object.entries(bookingLabels).map(([value, label]) => `<option value="${value}" ${reservation.bookingStatus === value ? "selected" : ""}>${label}</option>`).join("")}
          </select>
        </label>
        <label>
          Notas de pago
          <textarea class="payment-notes" rows="2">${escapeHtml(reservation.paymentNotes || "")}</textarea>
        </label>
        <button class="button primary update-reservation" type="button">Actualizar</button>
        <button class="button secondary light approve-payment" type="button">Aprobar pago</button>
        <button class="button secondary light reject-payment" type="button">Rechazar pago</button>
        <button class="button secondary light release-reservation" type="button">Liberar horario</button>
      </div>
    </article>
  `).join("");
}

async function updateReservationFromRow(row, mode = "manual") {
  const reservation = reservations.find((item) => item.id === row.dataset.reservationId);
  if (!reservation) return;
  let nextPaymentStatus = reservation.paymentStatus;
  let nextBookingStatus = reservation.bookingStatus;
  if (mode === "approve") {
    nextPaymentStatus = "approved";
    nextBookingStatus = "confirmed";
  } else if (mode === "reject") {
    nextPaymentStatus = "rejected";
    nextBookingStatus = "payment_rejected";
  } else if (mode === "release") {
    nextBookingStatus = "cancelled";
  } else {
    nextPaymentStatus = row.querySelector(".payment-status").value;
    nextBookingStatus = row.querySelector(".booking-status").value;
    if (nextPaymentStatus === "approved" && nextBookingStatus === "pending_validation") {
      nextBookingStatus = "confirmed";
    }
    if (nextPaymentStatus === "rejected") {
      nextBookingStatus = "payment_rejected";
    }
    if (nextBookingStatus === "confirmed" && nextPaymentStatus === "pending_validation") {
      nextPaymentStatus = "approved";
    }
    if (nextBookingStatus === "payment_rejected") {
      nextPaymentStatus = "rejected";
    }
  }

  const localUpdatedReservation = {
    ...reservation,
    paymentStatus: nextPaymentStatus,
    bookingStatus: nextBookingStatus,
    status: nextBookingStatus,
    seenByAdmin: true,
    paymentNotes: row.querySelector(".payment-notes")?.value.trim() || "",
    updatedAt: new Date().toISOString(),
  };
  const savedReservation = await runReservationOperation(
    (reservationApi) => reservationApi.update(reservation.id, {
      paymentStatus: localUpdatedReservation.paymentStatus,
      bookingStatus: localUpdatedReservation.bookingStatus,
      seenByAdmin: true,
      paymentNotes: localUpdatedReservation.paymentNotes,
    }),
    () => localUpdatedReservation,
  );

  reservations = reservations.map((item) => (item.id === reservation.id ? savedReservation : item));
  saveReservationsState();
  renderNotification();
  renderReservations();
  renderFinishedWork();
  renderCalendar();
  renderDayAvailability();
  renderPaymentSummary();
  showAdminNotice("Reserva actualizada.");
}

function renderCalendar() {
  const title = visibleMonth.toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  $("#adminCalendarTitle").textContent = title;
  const firstDay = new Date(visibleMonth);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - mondayOffset);
  const days = [];
  for (let index = 0; index < 42; index += 1) {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    const key = dateKey(day);
    const count = activeReservations().filter((reservation) => reservation.date === key).length;
    const className = ["day-cell", day.getMonth() !== visibleMonth.getMonth() ? "outside" : "", key === selectedCalendarDate ? "selected" : "", count ? "has-bookings" : ""].filter(Boolean).join(" ");
    days.push(`<button class="${className}" type="button" data-date="${key}">${day.getDate()}${count ? `<small>${count}</small>` : ""}</button>`);
  }
  $("#adminCalendarGrid").innerHTML = days.join("");
}

function renderDayAvailability() {
  $("#adminSelectedDateLabel").textContent = dateLabel(selectedCalendarDate);
  const dayReservations = activeReservations().filter((reservation) => reservation.date === selectedCalendarDate).sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  const dayBlocks = blockedSlots.filter((slot) => slot.active && slot.date === selectedCalendarDate);

  $("#adminDayReservations").innerHTML = dayReservations.length
    ? dayReservations.map((reservation) => `
      <article class="mini-reservation">
        <strong>${reservation.startTime} a ${reservation.endTime}</strong>
        <span>${reservation.client.name} &middot; ${bookingLabels[reservation.bookingStatus]} &middot; ${reservation.services.map((service) => service.name).join(", ")}</span>
      </article>
    `).join("")
    : '<p class="slot-empty">Sin reservas para esta fecha.</p>';

  const busyItems = [
    ...dayReservations.map((reservation) => `<span>${reservation.startTime} a ${reservation.endTime} (${bookingLabels[reservation.bookingStatus]})</span>`),
    ...dayBlocks.map((slot) => `<span>Bloqueo: ${escapeHtml(blockedSlotLabel(slot))}${slot.reason ? ` - ${escapeHtml(slot.reason)}` : ""}</span>`),
  ];
  $("#adminBusySlots").innerHTML = busyItems.length
    ? busyItems.join("")
    : '<span>Sin horarios ocupados</span>';

  const freeSlots = availableSlotsForDuration(selectedCalendarDate, 30);
  $("#adminFreeSlots").innerHTML = freeSlots.length ? freeSlots.map((slot) => `<span>${slot}</span>`).join("") : '<span>Sin disponibilidad</span>';
}

function setSmtpStatus(message, isError = false) {
  const status = $("#smtpStatus");
  status.textContent = message;
  status.classList.toggle("error-status", isError);
}

function renderSmtpForm() {
  smtpConfig = sanitizeSmtpConfig(smtpConfig);
  $("#smtpFrom").value = smtpConfig.from || "";
  $("#smtpFromName").value = smtpConfig.fromName || "";
  $("#smtpAdminEmail").value = smtpConfig.adminEmail || "";
  $("#smtpActive").value = String(smtpConfig.active !== false);
}

function saveSmtpConfig() {
  smtpConfig = {
    from: $("#smtpFrom").value.trim(),
    fromName: $("#smtpFromName").value.trim(),
    adminEmail: $("#smtpAdminEmail").value.trim(),
    active: $("#smtpActive").value === "true",
  };
  localStorage.setItem(storageKeys.smtp, JSON.stringify(sanitizeSmtpConfig(smtpConfig)));
  setSmtpStatus("Configuracion SMTP guardada.");
}

async function testSmtpConfig() {
  saveSmtpConfig();
  const button = $("#smtpTestButton");

  if (smtpConfig.active === false) {
    setSmtpStatus("No se pudo enviar la prueba: el envio de correo esta desactivado.", true);
    return;
  }

  button.disabled = true;
  button.textContent = "Enviando...";
  setSmtpStatus("Enviando correo real de prueba desde la funcion segura...");

  try {
    const emailApi = window.paradisoSupabase?.email;
    if (!emailApi?.sendTest) throw new Error("La funcion segura de correo no esta disponible.");
    const result = await emailApi.sendTest({
      to: smtpConfig.adminEmail || undefined,
    });
    const sentTo = result?.to || smtpConfig.adminEmail || "correo administrador configurado en Supabase";
    emailOutbox.unshift({ to: sentTo, type: "test", subject: "Prueba SMTP Paradiso", createdAt: new Date().toISOString(), status: "sent" });
    saveState();
    setSmtpStatus(`Correo de prueba enviado correctamente a ${sentTo}.`);
  } catch (error) {
    const sentTo = smtpConfig.adminEmail || "correo administrador configurado en Supabase";
    emailOutbox.unshift({ to: sentTo, type: "test", subject: "Prueba SMTP Paradiso", createdAt: new Date().toISOString(), status: "failed", error: error.message });
    saveState();
    setSmtpStatus(`No se pudo enviar el correo de prueba: ${error.message}`, true);
  } finally {
    button.disabled = false;
    button.textContent = "Probar envio de correo";
  }
}

async function validateSupabaseAdminSession(session) {
  const auth = window.paradisoSupabase?.auth;
  if (!auth?.validateAdminSession) throw new Error("Supabase Auth no esta disponible.");
  await auth.validateAdminSession(session);
  setAdminSessionMode(adminSessionModes.supabase);
  setOfflineMode(false);
}

async function signOutAdmin() {
  try {
    await window.paradisoSupabase?.auth?.signOut?.();
  } catch (error) {
    if (!window.paradisoSupabase?.isNetworkError?.(error)) {
      console.warn("No se pudo cerrar la sesion de Supabase.", error);
    }
  }
  clearAdminSessionMode();
  setOfflineMode(false);
  showLogin();
}

async function rejectUnauthorizedSession(error) {
  try {
    await window.paradisoSupabase?.auth?.signOut?.();
  } catch (signOutError) {
    console.warn("No se pudo cerrar la sesion no autorizada.", signOutError);
  }
  clearAdminSessionMode();
  setOfflineMode(false);
  showLogin(error?.message || "Acceso no autorizado.", true);
}

function recoverOfflineSession() {
  setAdminSessionMode(adminSessionModes.offline);
  setOfflineMode(true, "Modo sin conexión: el acceso y los cambios son sólo temporales en este dispositivo.");
  showAdminApp();
}

function friendlyAuthError(error) {
  const message = String(error?.message || error || "");
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials")) return "Email o contraseña incorrectos.";
  if (normalized.includes("email not confirmed")) return "El email todavia no esta confirmado en Supabase Auth.";
  if (normalized.includes("jwt expired") || normalized.includes("session")) return "La sesion expiro. Vuelve a iniciar sesion.";
  return message || "No se pudo validar el acceso.";
}

function subscribeAuthStateChanges() {
  const auth = window.paradisoSupabase?.auth;
  if (!auth?.onAuthStateChange) return;

  auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_OUT") {
      clearAdminSessionMode();
      setOfflineMode(false);
      showLogin();
      return;
    }

    if (!session || !["SIGNED_IN", "TOKEN_REFRESHED", "USER_UPDATED"].includes(event)) return;

    try {
      await validateSupabaseAdminSession(session);
      if ($("#adminApp").hidden) showAdminApp();
    } catch (error) {
      await rejectUnauthorizedSession(error);
    }
  }).catch((error) => {
    if (!window.paradisoSupabase?.isNetworkError?.(error)) {
      console.warn("No se pudo escuchar el estado de autenticacion.", error);
    }
  });
}

function bindEvents() {
  $("#loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const user = $("#adminUser").value.trim().toLowerCase();
    const password = $("#adminPassword").value;
    const submitButton = event.currentTarget.querySelector('button[type="submit"]');
    const originalLabel = submitButton?.textContent || "Ingresar";
    let signedInBeforeValidation = false;
    $("#loginStatus").textContent = "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Verificando...";
    }

    try {
      const auth = window.paradisoSupabase?.auth;
      if (!auth?.signIn || !window.paradisoSupabase.isAvailable?.()) throw new Error("Supabase no esta disponible.");
      const { data, error } = await auth.signIn(user, password);
      if (error) throw error;
      signedInBeforeValidation = true;
      const session = data?.session || await auth.getSession?.();
      await validateSupabaseAdminSession(session);
      showAdminApp();
    } catch (error) {
      if (window.paradisoSupabase?.isNetworkError?.(error)) {
        if (hasRecoverableOfflineSession()) {
          recoverOfflineSession();
        } else {
          clearAdminSessionMode();
          showLogin("Supabase no esta disponible. No se puede iniciar sesion sin conexion.", true);
        }
      } else {
        if (signedInBeforeValidation) await window.paradisoSupabase?.auth?.signOut?.().catch(() => {});
        clearAdminSessionMode();
        setOfflineMode(false);
        showLogin(friendlyAuthError(error), true);
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });

  $("#logoutButton").addEventListener("click", signOutAdmin);

  $("#adminMenuButton").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleAdminMenu();
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".admin-menu-wrapper")) toggleAdminMenu(false);
  });

  $$("[data-admin-view]").forEach((button) => {
    button.addEventListener("click", () => showAdminView(button.dataset.adminView));
  });

  $("#markReservationsSeen").addEventListener("click", async () => {
    const unseenIds = reservations.filter((reservation) => !reservation.seenByAdmin).map((reservation) => reservation.id);
    await runReservationOperation(
      (reservationApi) => reservationApi.markSeen(unseenIds),
      () => reservations.map((reservation) => ({ ...reservation, seenByAdmin: true })),
    ).then((updatedReservations) => {
      if (updatedReservations?.length) {
        const updatedById = new Map(updatedReservations.map((reservation) => [reservation.id, reservation]));
        reservations = reservations.map((reservation) => updatedById.get(reservation.id) || reservation);
      } else {
        reservations = reservations.map((reservation) => ({ ...reservation, seenByAdmin: true }));
      }
    }).catch((error) => showAdminNotice(error.message, true));
    saveReservationsState();
    renderNotification();
    renderReservations();
  });

  $("#paymentConfigForm").addEventListener("submit", (event) => {
    event.preventDefault();
    savePaymentConfig().catch((error) => {
      $("#paymentConfigStatus").textContent = error.message;
      $("#paymentConfigStatus").classList.add("error-status");
      $("#paymentConfigStatus").hidden = false;
    });
  });

  $("#paymentDepositEnabled").addEventListener("change", togglePaymentDepositFields);

  $("#availabilitySettingsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveAvailabilitySettings().catch((error) => setInlineStatus("#availabilityStatus", error.message, true));
  });

  $("#blockedSlotMode").addEventListener("change", toggleBlockedSlotTimeFields);

  $("#blockedSlotForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveBlockedSlotFromForm().catch((error) => setInlineStatus("#blockedSlotStatus", error.message, true));
  });

  $("#cancelBlockedSlotEdit").addEventListener("click", () => {
    resetBlockedSlotForm();
    setInlineStatus("#blockedSlotStatus", "Edicion cancelada.");
  });

  $("#blockedSlotRows").addEventListener("click", (event) => {
    const row = event.target.closest(".blocked-slot-row");
    if (!row) return;
    const slot = blockedSlots.find((item) => item.id === row.dataset.blockedSlotId);
    if (!slot) return;
    if (event.target.closest(".edit-blocked-slot")) fillBlockedSlotForm(slot);
    if (event.target.closest(".toggle-blocked-slot")) toggleBlockedSlot(slot.id).catch((error) => setInlineStatus("#blockedSlotStatus", error.message, true));
  });

  $("#notificationTemplateForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveNotificationTemplates();
  });

  $("#resetNotificationTemplates").addEventListener("click", resetNotificationTemplates);

  $("#whatsappSettingsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveWhatsappConfig();
  });

  ["#whatsappConsultNumber", "#whatsappConsultActive", "#whatsappConsultMessage"].forEach((selector) => {
    $(selector).addEventListener("input", renderWhatsappPreview);
    $(selector).addEventListener("change", renderWhatsappPreview);
  });

  $("#adminServiceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    createServiceFromForm().catch((error) => alert(error.message));
  });

  $("#newServiceImageUrl").addEventListener("input", () => {
    setImagePreview($("#newServiceImagePreview"), $("#newServiceImageUrl").value.trim());
  });

  $("#newServiceImageFile").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    setImagePreview($("#newServiceImagePreview"), file ? URL.createObjectURL(file) : $("#newServiceImageUrl").value.trim());
  });

  $("#adminServiceRows").addEventListener("click", (event) => {
    const row = event.target.closest(".admin-row");
    if (!row) return;
    if (event.target.closest(".save-service")) updateService(row).catch((error) => alert(error.message));
    if (event.target.closest(".clear-service-image")) clearServiceImage(row.dataset.serviceId).catch((error) => alert(error.message));
    if (event.target.closest(".toggle-service")) toggleService(row.dataset.serviceId).catch((error) => alert(error.message));
    if (event.target.closest(".delete-service")) deleteService(row.dataset.serviceId).catch((error) => alert(error.message));
  });

  $("#adminServiceRows").addEventListener("input", (event) => {
    if (!event.target.matches('[data-field="image"]')) return;
    const row = event.target.closest(".admin-row");
    setImagePreview(row?.querySelector(".admin-image-preview"), event.target.value.trim());
  });

  $("#adminServiceRows").addEventListener("change", (event) => {
    if (!event.target.matches('[data-field="imageFile"]')) return;
    const row = event.target.closest(".admin-row");
    const file = event.target.files?.[0];
    const currentUrl = row?.querySelector('[data-field="image"]')?.value.trim() || "";
    setImagePreview(row?.querySelector(".admin-image-preview"), file ? URL.createObjectURL(file) : currentUrl);
  });

  $("#reservationRows").addEventListener("click", (event) => {
    const row = event.target.closest(".reservation-row");
    if (!row) return;
    if (event.target.closest(".update-reservation")) updateReservationFromRow(row).catch((error) => showAdminNotice(error.message, true));
    if (event.target.closest(".approve-payment")) updateReservationFromRow(row, "approve").catch((error) => showAdminNotice(error.message, true));
    if (event.target.closest(".reject-payment")) updateReservationFromRow(row, "reject").catch((error) => showAdminNotice(error.message, true));
    if (event.target.closest(".release-reservation")) updateReservationFromRow(row, "release").catch((error) => showAdminNotice(error.message, true));
  });

  $("#finishedWorkRows").addEventListener("click", (event) => {
    const row = event.target.closest(".finished-work-row");
    if (!row || !event.target.closest(".send-aftercare")) return;
    sendAftercareEmail(row);
  });

  $$(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".filter-tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      activeReservationFilter = tab.dataset.reservationFilter;
      renderReservations();
    });
  });

  $("#adminCalendarGrid").addEventListener("click", (event) => {
    const button = event.target.closest(".day-cell");
    if (!button) return;
    selectedCalendarDate = button.dataset.date;
    renderCalendar();
    renderDayAvailability();
  });

  $("#adminPrevMonth").addEventListener("click", () => {
    visibleMonth.setMonth(visibleMonth.getMonth() - 1);
    renderCalendar();
  });

  $("#adminNextMonth").addEventListener("click", () => {
    visibleMonth.setMonth(visibleMonth.getMonth() + 1);
    renderCalendar();
  });

  $("#smtpForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveSmtpConfig();
  });

  $("#smtpTestButton").addEventListener("click", testSmtpConfig);
}

window.addEventListener("storage", (event) => {
  if (![storageKeys.services, storageKeys.reservations, storageKeys.smtp, storageKeys.paymentConfig, storageKeys.availabilitySettings, storageKeys.blockedSlots, storageKeys.notificationTemplates, storageKeys.whatsappConfig].includes(event.key)) return;
  refreshStateFromStorage();
  if (isAdminLoggedIn()) renderAllAdmin();
});

async function initAdmin() {
  bindEvents();
  showAuthLoading();
  subscribeAuthStateChanges();

  try {
    const auth = window.paradisoSupabase?.auth;
    if (!auth?.getSession) throw new Error("Supabase no esta disponible.");
    const session = await auth.getSession();
    if (session) {
      await validateSupabaseAdminSession(session);
      showAdminApp();
      return;
    }

    clearAdminSessionMode();
    setOfflineMode(false);
    showLogin();
  } catch (error) {
    if (window.paradisoSupabase?.isNetworkError?.(error)) {
      if (hasRecoverableOfflineSession()) {
        recoverOfflineSession();
      } else {
        clearAdminSessionMode();
        showLogin("Supabase no esta disponible. No se puede iniciar sesion sin conexion.", true);
      }
      return;
    }
    await rejectUnauthorizedSession(error);
  }
}

initAdmin();

