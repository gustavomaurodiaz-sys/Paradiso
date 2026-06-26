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
  notificationTemplates: "paradiso_notification_templates",
  adminSession: "paradiso_admin_session",
};

const adminCredentials = { user: "admin", password: "paradiso2026" };
const openMinutes = 8 * 60;
const closeMinutes = 19 * 60;
const slotStepMinutes = 30;
const provisionalLimitMs = 24 * 60 * 60 * 1000;
const formatter = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const localEmailApiUrl = "http://localhost:8095/api/send-email";

let services = loadList(storageKeys.services, defaultServices);
let reservations = normalizeReservations(loadList(storageKeys.reservations, []));
let smtpConfig = loadObject(storageKeys.smtp, {});
let paymentConfig = loadObject(storageKeys.paymentConfig, defaultPaymentConfig);
let notificationTemplates = loadNotificationTemplates();
let emailOutbox = loadList(storageKeys.outbox, []);
let activeReservationFilter = "all";
let visibleMonth = new Date();
let selectedCalendarDate = todayKey();
let activeAdminView = "menu";
const aftercareSendInProgress = new Set();
visibleMonth.setDate(1);

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
  smtpConfig = loadObject(storageKeys.smtp, {});
  paymentConfig = loadObject(storageKeys.paymentConfig, defaultPaymentConfig);
  notificationTemplates = loadNotificationTemplates();
  emailOutbox = loadList(storageKeys.outbox, []);
}

function saveState() {
  localStorage.setItem(storageKeys.services, JSON.stringify(services));
  localStorage.setItem(storageKeys.reservations, JSON.stringify(reservations));
  localStorage.setItem(storageKeys.smtp, JSON.stringify(smtpConfig));
  localStorage.setItem(storageKeys.paymentConfig, JSON.stringify(paymentConfig));
  localStorage.setItem(storageKeys.notificationTemplates, JSON.stringify(notificationTemplates));
  localStorage.setItem(storageKeys.outbox, JSON.stringify(emailOutbox));
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

function isAdminLoggedIn() {
  return sessionStorage.getItem(storageKeys.adminSession) === "active";
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

function hasOverlap(dateValue, startMinutes, endMinutes) {
  return activeReservations().some((reservation) => {
    if (reservation.date !== dateValue || !reservation.startTime || !reservation.endTime) return false;
    return overlaps(startMinutes, endMinutes, timeToMinutes(reservation.startTime), timeToMinutes(reservation.endTime));
  });
}

function availableSlotsForDuration(dateValue, minutes) {
  const slots = [];
  for (let start = openMinutes; start + minutes <= closeMinutes; start += slotStepMinutes) {
    const end = start + minutes;
    if (!hasOverlap(dateValue, start, end)) slots.push(minutesToTime(start));
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

function showAdminApp() {
  $("#loginScreen").hidden = true;
  $("#adminApp").hidden = false;
  renderAllAdmin();
  showAdminView(activeAdminView);
}

function renderAllAdmin() {
  renderNotification();
  renderNotificationTemplates();
  renderPaymentConfigForm();
  renderPaymentSummary();
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
  $("#paymentDepositMode").value = paymentConfig.depositMode || "amount";
  $("#paymentDepositValue").value = paymentConfig.depositValue || "";
  $("#paymentAlias").value = paymentConfig.alias || "";
  $("#paymentHolder").value = paymentConfig.holder || "";
  $("#paymentCbu").value = paymentConfig.cbu || "";
  $("#paymentMessage").value = paymentConfig.message || "";
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
            <small>${escapeHtml(reservation.client?.name || "Cliente")} · ${escapeHtml(reservation.date || "Sin fecha")} · ${money(reservation.depositAmount || reservation.total)}</small>
          `).join("") : "<small>Sin movimientos</small>"}
        </div>
      </article>
    `).join("")}
  `;
}

function savePaymentConfig() {
  paymentConfig = {
    depositMode: $("#paymentDepositMode").value,
    depositValue: Number($("#paymentDepositValue").value || 0),
    alias: $("#paymentAlias").value.trim(),
    holder: $("#paymentHolder").value.trim(),
    cbu: $("#paymentCbu").value.trim(),
    message: $("#paymentMessage").value.trim(),
  };
  saveState();
  renderPaymentSummary();
  $("#paymentConfigStatus").textContent = "Configuracion de cobro guardada.";
}

function renderAdminServices() {
  $("#adminServiceRows").innerHTML = services.map((service) => `
    <article class="admin-row" data-service-id="${service.id}">
      <div class="admin-row-fields">
        <label>Nombre<input data-field="name" value="${service.name}" /></label>
        <label>Precio<input data-field="price" type="number" min="0" step="500" value="${service.price}" /></label>
        <label>Duracion<input data-field="minutes" type="number" min="5" step="5" value="${service.minutes}" /></label>
        <label>Descripcion<textarea data-field="description" rows="2">${service.description}</textarea></label>
      </div>
      <div class="admin-row-actions">
        <span class="status-pill ${service.active ? "approved" : "cancelled"}">${service.active ? "Activo" : "Inactivo"}</span>
        <button class="button secondary light save-service" type="button">Guardar</button>
        <button class="button secondary light toggle-service" type="button">${service.active ? "Desactivar" : "Activar"}</button>
        <button class="button secondary light delete-service" type="button">Eliminar</button>
      </div>
    </article>
  `).join("");
}

function createServiceFromForm() {
  const name = $("#newServiceName").value.trim();
  const price = Number($("#newServicePrice").value);
  const minutes = Number($("#newServiceMinutes").value);
  const description = $("#newServiceDescription").value.trim();
  if (!name || !price || !minutes || !description) return;
  const idBase = slug(name) || `servicio-${Date.now()}`;
  const id = services.some((service) => service.id === idBase) ? `${idBase}-${Date.now()}` : idBase;
  services.push({ id, name, price, minutes, description, active: true, icon: makeIcon(name) });
  $("#adminServiceForm").reset();
  saveState();
  renderAdminServices();
}

function updateService(row) {
  const service = services.find((item) => item.id === row.dataset.serviceId);
  if (!service) return;
  service.name = row.querySelector('[data-field="name"]').value.trim();
  service.price = Number(row.querySelector('[data-field="price"]').value);
  service.minutes = Number(row.querySelector('[data-field="minutes"]').value);
  service.description = row.querySelector('[data-field="description"]').value.trim();
  service.icon = makeIcon(service.name);
  saveState();
  renderAdminServices();
}

function toggleService(serviceId) {
  const service = services.find((item) => item.id === serviceId);
  if (!service) return;
  service.active = !service.active;
  saveState();
  renderAdminServices();
}

function deleteService(serviceId) {
  services = services.filter((service) => service.id !== serviceId);
  saveState();
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
  return Boolean(smtpConfig.host && smtpConfig.port && smtpConfig.user && smtpConfig.password && smtpConfig.from);
}

async function sendEmailWithSmtp({ to, subject, body }) {
  if (!isSmtpConfigComplete()) {
    throw new Error("La configuracion SMTP esta incompleta. Revisar servidor, puerto, usuario, contrasena y correo remitente.");
  }

  let response;
  const payload = JSON.stringify({
    smtp: smtpConfig,
    email: {
      to,
      subject,
      body,
      from: smtpConfig.from,
      fromName: smtpConfig.fromName || "Paradiso Nails",
    },
  });
  const endpoints = window.location.protocol === "file:" ? [localEmailApiUrl] : ["/api/send-email", localEmailApiUrl];

  try {
    for (const endpoint of endpoints) {
      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
        });
        break;
      } catch (error) {
        if (endpoint === endpoints[endpoints.length - 1]) throw error;
      }
    }
  } catch (error) {
    throw new Error("No se pudo conectar con el servicio de envio SMTP. Abrir el panel desde http://localhost:8095/gestion.html y verificar que el servidor local este iniciado.");
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success === false) {
    throw new Error(result.error || "El servicio SMTP no pudo enviar el correo.");
  }
  return result;
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
        <span>Se&ntilde;a: ${money(reservation.depositAmount || reservation.total)}</span>
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
        <button class="button primary update-reservation" type="button">Actualizar</button>
        <button class="button secondary light approve-payment" type="button">Aprobar pago</button>
        <button class="button secondary light reject-payment" type="button">Rechazar pago</button>
        <button class="button secondary light release-reservation" type="button">Liberar horario</button>
      </div>
    </article>
  `).join("");
}

function updateReservationFromRow(row, mode = "manual") {
  const reservation = reservations.find((item) => item.id === row.dataset.reservationId);
  if (!reservation) return;
  const previousStatus = reservation.bookingStatus;
  if (mode === "approve") {
    reservation.paymentStatus = "approved";
    reservation.bookingStatus = "confirmed";
  } else if (mode === "reject") {
    reservation.paymentStatus = "rejected";
    reservation.bookingStatus = "payment_rejected";
  } else if (mode === "release") {
    reservation.bookingStatus = "cancelled";
  } else {
    reservation.paymentStatus = row.querySelector(".payment-status").value;
    reservation.bookingStatus = row.querySelector(".booking-status").value;
    if (reservation.paymentStatus === "approved" && reservation.bookingStatus === "pending_validation") {
      reservation.bookingStatus = "confirmed";
    }
    if (reservation.paymentStatus === "rejected") {
      reservation.bookingStatus = "payment_rejected";
    }
    if (reservation.bookingStatus === "confirmed" && reservation.paymentStatus === "pending_validation") {
      reservation.paymentStatus = "approved";
    }
    if (reservation.bookingStatus === "payment_rejected") {
      reservation.paymentStatus = "rejected";
    }
  }
  reservation.status = reservation.bookingStatus;
  reservation.seenByAdmin = true;
  reservation.updatedAt = new Date().toISOString();
  const notification = registerClientNotification(reservation, previousStatus);
  saveState();
  renderNotification();
  renderReservations();
  renderFinishedWork();
  renderCalendar();
  renderDayAvailability();
  renderPaymentSummary();
  if (notification?.success) {
    showAdminNotice(`Notificacion preparada para ${reservation.client.name} por ${notification.channel}.`);
  } else if (notification) {
    showAdminNotice(`No se pudo enviar la notificacion a ${reservation.client.name}: ${notification.error}`, true);
  } else {
    showAdminNotice("Reserva actualizada. No se envio notificacion porque el estado no cambio.");
  }
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

  $("#adminDayReservations").innerHTML = dayReservations.length
    ? dayReservations.map((reservation) => `
      <article class="mini-reservation">
        <strong>${reservation.startTime} a ${reservation.endTime}</strong>
        <span>${reservation.client.name} &middot; ${bookingLabels[reservation.bookingStatus]} &middot; ${reservation.services.map((service) => service.name).join(", ")}</span>
      </article>
    `).join("")
    : '<p class="slot-empty">Sin reservas para esta fecha.</p>';

  $("#adminBusySlots").innerHTML = dayReservations.length
    ? dayReservations.map((reservation) => `<span>${reservation.startTime} a ${reservation.endTime} (${bookingLabels[reservation.bookingStatus]})</span>`).join("")
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
  $("#smtpHost").value = smtpConfig.host || "";
  $("#smtpPort").value = smtpConfig.port || "";
  $("#smtpUser").value = smtpConfig.user || "";
  $("#smtpPassword").value = smtpConfig.password || "";
  $("#smtpFrom").value = smtpConfig.from || "";
  $("#smtpFromName").value = smtpConfig.fromName || "";
  $("#smtpAdminEmail").value = smtpConfig.adminEmail || "";
  $("#smtpSecure").checked = Boolean(smtpConfig.secure);
}

function saveSmtpConfig() {
  smtpConfig = {
    host: $("#smtpHost").value.trim(),
    port: $("#smtpPort").value.trim(),
    user: $("#smtpUser").value.trim(),
    password: $("#smtpPassword").value,
    from: $("#smtpFrom").value.trim(),
    fromName: $("#smtpFromName").value.trim(),
    adminEmail: $("#smtpAdminEmail").value.trim(),
    secure: $("#smtpSecure").checked,
  };
  saveState();
  setSmtpStatus("Configuracion SMTP guardada.");
}

async function testSmtpConfig() {
  saveSmtpConfig();
  const testTo = smtpConfig.adminEmail?.trim();
  const button = $("#smtpTestButton");

  if (!testTo) {
    setSmtpStatus("No se pudo enviar la prueba: falta el correo administrador.", true);
    return;
  }

  button.disabled = true;
  button.textContent = "Enviando...";
  setSmtpStatus("Enviando correo real de prueba...");

  try {
    await sendEmailWithSmtp({
      to: testTo,
      subject: "Prueba SMTP Paradiso",
      body: [
        "Hola,",
        "",
        "Este es un correo real de prueba enviado desde la configuracion SMTP de Paradiso Nails.",
        "",
        "Si recibiste este mensaje, el envio SMTP quedo funcionando correctamente.",
      ].join("\n"),
    });
    emailOutbox.unshift({ to: testTo, type: "test", subject: "Prueba SMTP Paradiso", createdAt: new Date().toISOString(), status: "sent" });
    saveState();
    setSmtpStatus(`Correo de prueba enviado correctamente a ${testTo}.`);
  } catch (error) {
    emailOutbox.unshift({ to: testTo, type: "test", subject: "Prueba SMTP Paradiso", createdAt: new Date().toISOString(), status: "failed", error: error.message });
    saveState();
    setSmtpStatus(`No se pudo enviar el correo de prueba: ${error.message}`, true);
  } finally {
    button.disabled = false;
    button.textContent = "Probar envio de correo";
  }
}

function bindEvents() {
  $("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const user = $("#adminUser").value.trim();
    const password = $("#adminPassword").value;
    if (user === adminCredentials.user && password === adminCredentials.password) {
      sessionStorage.setItem(storageKeys.adminSession, "active");
      showAdminApp();
    } else {
      $("#loginStatus").textContent = "Usuario o contrasena incorrectos.";
    }
  });

  $("#logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem(storageKeys.adminSession);
    window.location.reload();
  });

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

  $("#markReservationsSeen").addEventListener("click", () => {
    reservations = reservations.map((reservation) => ({ ...reservation, seenByAdmin: true }));
    saveState();
    renderNotification();
    renderReservations();
  });

  $("#paymentConfigForm").addEventListener("submit", (event) => {
    event.preventDefault();
    savePaymentConfig();
  });

  $("#notificationTemplateForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveNotificationTemplates();
  });

  $("#resetNotificationTemplates").addEventListener("click", resetNotificationTemplates);

  $("#adminServiceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    createServiceFromForm();
  });

  $("#adminServiceRows").addEventListener("click", (event) => {
    const row = event.target.closest(".admin-row");
    if (!row) return;
    if (event.target.closest(".save-service")) updateService(row);
    if (event.target.closest(".toggle-service")) toggleService(row.dataset.serviceId);
    if (event.target.closest(".delete-service")) deleteService(row.dataset.serviceId);
  });

  $("#reservationRows").addEventListener("click", (event) => {
    const row = event.target.closest(".reservation-row");
    if (!row) return;
    if (event.target.closest(".update-reservation")) updateReservationFromRow(row);
    if (event.target.closest(".approve-payment")) updateReservationFromRow(row, "approve");
    if (event.target.closest(".reject-payment")) updateReservationFromRow(row, "reject");
    if (event.target.closest(".release-reservation")) updateReservationFromRow(row, "release");
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
  if (![storageKeys.services, storageKeys.reservations, storageKeys.smtp, storageKeys.paymentConfig, storageKeys.notificationTemplates].includes(event.key)) return;
  refreshStateFromStorage();
  if (isAdminLoggedIn()) renderAllAdmin();
});

bindEvents();
if (isAdminLoggedIn()) showAdminApp();

