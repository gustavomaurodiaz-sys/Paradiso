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

const defaultAvailability = {
  openTime: "08:00",
  closeTime: "19:00",
  slotStepMinutes: 15,
  activeDays: [1, 2, 3, 4, 5, 6],
  businessTimezone: "America/Argentina/Buenos_Aires",
};

const storageKeys = {
  services: "paradiso_services",
  reservations: "paradiso_reservations",
  smtp: "paradiso_smtp_config",
  outbox: "paradiso_email_outbox",
  paymentConfig: "paradiso_payment_config",
  whatsappConfig: "paradiso_whatsapp_config",
};

const flowStepIds = ["home", "servicios-disponibles", "reserva-guiada", "fecha-horario", "confirmacion-pago"];
const defaultWhatsappConfig = {
  number: "",
  message: "Hola, quisiera consultar por un turno en Paradiso Nails.",
  active: true,
};
const statusLabels = {
  pending_validation: "Pendiente de validacion de pago",
  confirmed: "Reserva confirmada",
  payment_rejected: "Pago rechazado",
  cancelled: "Cancelada",
};

const serviceVisuals = [
  { image: "assets/hero-1.jpg", layout: "tall", position: "center" },
  { image: "assets/hero-2.jpg", layout: "square", position: "center" },
  { image: "assets/hero-3.jpg", layout: "wide", position: "center" },
  { image: "assets/hero-2.jpg", layout: "tall", position: "62% center" },
  { image: "assets/hero-3.jpg", layout: "square", position: "35% center" },
  { image: "assets/hero-1.jpg", layout: "wide", position: "58% center" },
  { image: "assets/hero-3.jpg", layout: "tall", position: "42% center" },
  { image: "assets/hero-1.jpg", layout: "square", position: "68% center" },
  { image: "assets/hero-2.jpg", layout: "wide", position: "45% center" },
  { image: "assets/hero-2.jpg", layout: "square", position: "center" },
  { image: "assets/hero-1.jpg", layout: "tall", position: "62% center" },
  { image: "assets/hero-3.jpg", layout: "wide", position: "center" },
];

const allowedProofTypes = ["image/jpeg", "image/png", "application/pdf"];
const allowedProofExtensions = ["jpg", "jpeg", "png", "pdf"];
const formatter = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const $ = (selector) => document.querySelector(selector);

let services = loadList(storageKeys.services, defaultServices);
let reservations = loadList(storageKeys.reservations, []);
let smtpConfig = sanitizeSmtpConfig(loadObject(storageKeys.smtp, {}));
let emailOutbox = loadList(storageKeys.outbox, []);
let paymentConfig = loadObject(storageKeys.paymentConfig, defaultPaymentConfig);
let whatsappConfig = loadObject(storageKeys.whatsappConfig, defaultWhatsappConfig);
let selectedServiceIds = [];
let selectedDate = "";
let selectedStartTime = "";
let availabilitySettings = { ...defaultAvailability };
let blockedSlots = [];
let bookingUsesLocalFallback = false;
let reservationSubmitInProgress = false;
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

function configuredWhatsappUrl() {
  whatsappConfig = loadObject(storageKeys.whatsappConfig, defaultWhatsappConfig);
  const number = sanitizeWhatsappNumber(whatsappConfig.number);
  if (!whatsappConfig.active || !number) return "";
  const message = String(whatsappConfig.message || defaultWhatsappConfig.message).trim();
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${query}`;
}

function cacheServices(nextServices) {
  services = Array.isArray(nextServices) ? nextServices : [];
  localStorage.setItem(storageKeys.services, JSON.stringify(services));
}

function cachePaymentConfig(nextConfig) {
  paymentConfig = { ...defaultPaymentConfig, ...(nextConfig || {}) };
  localStorage.setItem(storageKeys.paymentConfig, JSON.stringify(paymentConfig));
}

function setBookingOfflineMode(enabled) {
  bookingUsesLocalFallback = Boolean(enabled);
  const notice = $("#bookingOfflineNotice");
  if (notice) notice.hidden = !enabled;
}

function cacheBookingData({ remoteServices, availability, remoteBlockedSlots, remotePaymentConfig }) {
  if (remoteServices) cacheServices(remoteServices);
  if (availability) availabilitySettings = { ...defaultAvailability, ...availability };
  if (remoteBlockedSlots) blockedSlots = remoteBlockedSlots;
  if (remotePaymentConfig) cachePaymentConfig(remotePaymentConfig);
}

async function refreshBookingDataFromSupabase() {
  const api = window.paradisoSupabase;
  if (!api?.services || !api.booking) {
    setBookingOfflineMode(true);
    return false;
  }

  try {
    const [remoteServices, availability, remoteBlockedSlots, remotePaymentConfig] = await Promise.all([
      api.services.list({ activeOnly: true }),
      api.booking.getAvailability(),
      api.booking.listBlockedSlots(),
      api.booking.getPaymentConfig(),
    ]);
    cacheBookingData({ remoteServices, availability, remoteBlockedSlots, remotePaymentConfig });
    setBookingOfflineMode(false);
    selectedServiceIds = selectedServiceIds.filter((id) => services.some((service) => service.id === id && service.active));
    renderServices();
    renderSelection();
    renderSlots();
    return true;
  } catch (error) {
    if (api.isNetworkError?.(error)) {
      setBookingOfflineMode(true);
    } else {
      setBookingOfflineMode(false);
      console.warn("No se pudieron cargar los servicios desde Supabase.", error);
    }
    return false;
  }
}

function showStep(stepId, updateHash = true) {
  const targetStep = flowStepIds.includes(stepId) ? stepId : "home";
  flowStepIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) section.hidden = id !== targetStep;
  });
  document.querySelectorAll("[data-step-target]").forEach((link) => {
    link.classList.toggle("active", link.dataset.stepTarget === targetStep);
  });
  if (updateHash) history.pushState(null, "", `#${targetStep}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function validateServiceSelection(messageTarget = "#selectionError") {
  if (selectedServiceIds.length) return true;
  const target = $(messageTarget);
  if (target) target.textContent = "Selecciona al menos un servicio para continuar.";
  return false;
}

function syncWhatsappLinks() {
  const url = configuredWhatsappUrl();
  ["#whatsappLink", "#headerWhatsappLink"].forEach((selector) => {
    const link = $(selector);
    if (!link) return;
    link.hidden = !url;
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.removeAttribute("href");
    }
  });
}

function saveReservationState() {
  localStorage.setItem(storageKeys.reservations, JSON.stringify(reservations));
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

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}

function todayKey() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function businessOpenMinutes() {
  return timeToMinutes(availabilitySettings.openTime || defaultAvailability.openTime);
}

function businessCloseMinutes() {
  return timeToMinutes(availabilitySettings.closeTime || defaultAvailability.closeTime);
}

function slotStep() {
  return Number(availabilitySettings.slotStepMinutes || defaultAvailability.slotStepMinutes);
}

function isoWeekday(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const nativeDay = new Date(year, month - 1, day).getDay();
  return nativeDay === 0 ? 7 : nativeDay;
}

function isActiveBusinessDay(dateValue) {
  if (!dateValue) return false;
  return (availabilitySettings.activeDays || defaultAvailability.activeDays).map(Number).includes(isoWeekday(dateValue));
}

function dateLabel(dateValue) {
  if (!dateValue) return "Selecciona una fecha";
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
}

function selectedServices() {
  return selectedServiceIds.map((id) => services.find((service) => service.id === id && service.active)).filter(Boolean);
}

function selectedTotals() {
  return selectedServices().reduce(
    (totals, service) => ({ price: totals.price + service.price, minutes: totals.minutes + service.minutes }),
    { price: 0, minutes: 0 },
  );
}

function reservationStart(reservation) {
  return reservation.startTime || reservation.time;
}

function reservationEnd(reservation) {
  if (reservation.endTime) return reservation.endTime;
  const start = reservationStart(reservation);
  if (!start) return "";
  return minutesToTime(timeToMinutes(start) + Number(reservation.minutes || 0));
}

function blocksAvailability(reservation) {
  const status = reservation.bookingStatus || reservation.status;
  return !["cancelled", "payment_rejected"].includes(status);
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function hasOverlap(dateValue, startMinutes, endMinutes) {
  return reservations.some((reservation) => {
    if (reservation.date !== dateValue || !blocksAvailability(reservation)) return false;
    const busyStart = reservationStart(reservation);
    const busyEnd = reservationEnd(reservation);
    if (!busyStart || !busyEnd) return false;
    return overlaps(startMinutes, endMinutes, timeToMinutes(busyStart), timeToMinutes(busyEnd));
  });
}

function isBlockedSlot(dateValue, startMinutes, endMinutes) {
  return blockedSlots.some((slot) => {
    if (!slot.active || slot.date !== dateValue) return false;
    if (!slot.startTime || !slot.endTime) return true;
    return overlaps(startMinutes, endMinutes, timeToMinutes(slot.startTime), timeToMinutes(slot.endTime));
  });
}

function isPastSlot(dateValue, startMinutes) {
  if (dateValue !== todayKey()) return false;
  const now = new Date();
  return startMinutes <= now.getHours() * 60 + now.getMinutes();
}

function availableSlots(dateValue, totalMinutes) {
  const openMinutes = businessOpenMinutes();
  const closeMinutes = businessCloseMinutes();
  if (!dateValue || !totalMinutes || !isActiveBusinessDay(dateValue) || totalMinutes > closeMinutes - openMinutes) return [];
  const slots = [];
  for (let start = openMinutes; start + totalMinutes <= closeMinutes; start += slotStep()) {
    const end = start + totalMinutes;
    if (!isPastSlot(dateValue, start) && !hasOverlap(dateValue, start, end) && !isBlockedSlot(dateValue, start, end)) slots.push(minutesToTime(start));
  }
  return slots;
}

function serviceVisual(service, index) {
  const fallback = serviceVisuals[index % serviceVisuals.length];
  return {
    ...fallback,
    image: service.image || fallback.image,
    position: service.image ? "center" : fallback.position,
  };
}

function renderServices() {
  const activeServices = services.filter((service) => service.active);
  $("#serviceCards").innerHTML = activeServices.length
    ? activeServices.map((service, index) => {
      const checked = selectedServiceIds.includes(service.id);
      const visual = serviceVisual(service, index);
      return `
        <label class="service-card catalog-card selectable-card editorial-service-card card-${visual.layout} ${checked ? "selected" : ""}" style="--reveal-index: ${index}">
          <input class="service-check" type="checkbox" value="${service.id}" ${checked ? "checked" : ""} />
          <span class="service-select-indicator" aria-hidden="true"></span>
          <span class="service-image-wrap">
            <img src="${visual.image}" alt="${service.name}" style="object-position: ${visual.position}" loading="lazy" />
            <span class="service-rating" aria-label="Calificacion 4.9 de 5">&#9733;&#9733;&#9733;&#9733;&#9733; 4.9</span>
          </span>
          <span class="service-card-body">
            <span class="service-kicker">Paradiso Selection</span>
            <span class="service-title-row">
              <span class="icon" aria-hidden="true">${service.icon}</span>
              <h3>${service.name}</h3>
            </span>
            <span class="service-facts">
              <span>${durationLabel(service.minutes)}</span>
              <span>Desde ${money(service.price)}</span>
            </span>
            <span class="service-description">${service.description}</span>
            <span class="select-service-button">${checked ? "Seleccionado" : "Seleccionar"}</span>
          </span>
        </label>
      `;
    }).join("")
    : '<p class="slot-empty">No hay servicios disponibles por el momento.</p>';
}

function renderSelection() {
  const servicesSelected = selectedServices();
  const totals = selectedTotals();
  $("#selectedCount").textContent = `${servicesSelected.length} ${servicesSelected.length === 1 ? "servicio" : "servicios"}`;
  $("#selectionTotal").textContent = money(totals.price);
  $("#selectionDuration").textContent = durationLabel(totals.minutes);
  $("#modalDuration").textContent = durationLabel(totals.minutes);
  $("#modalTotal").textContent = money(totals.price);
  $("#selectionEmpty").hidden = servicesSelected.length > 0;
  $("#selectedItems").innerHTML = servicesSelected.map((service) => `
    <article class="selected-service-row selected-item-row">
      <div>
        <strong>${service.name}</strong>
        <span>${money(service.price)} &middot; ${durationLabel(service.minutes)}</span>
      </div>
    </article>
  `).join("");

  const floatingSummary = $("#serviceFloatingSummary");
  if (floatingSummary) {
    floatingSummary.hidden = servicesSelected.length === 0;
    $("#floatingServiceList").innerHTML = servicesSelected.map((service) => `<span>${service.name}</span>`).join("");
    $("#floatingSelectionTotal").textContent = money(totals.price);
    $("#floatingSelectionDuration").textContent = durationLabel(totals.minutes);
  }
}

function selectService(serviceId, checked) {
  selectedServiceIds = checked ? Array.from(new Set([...selectedServiceIds, serviceId])) : selectedServiceIds.filter((id) => id !== serviceId);
  selectedStartTime = "";
  $("#servicesError").textContent = "";
  $("#selectionError").textContent = "";
  renderServices();
  renderSelection();
  renderSlots();
}

function renderSlots() {
  const totals = selectedTotals();
  const dateValue = $("#appointmentDate")?.value || "";
  selectedDate = dateValue;
  const slots = availableSlots(dateValue, totals.minutes);
  $("#slotDateLabel").textContent = dateLabel(dateValue);
  $("#selectedStart").textContent = selectedStartTime || "Sin elegir";
  $("#selectedEnd").textContent = selectedStartTime ? minutesToTime(timeToMinutes(selectedStartTime) + totals.minutes) : "Sin elegir";

  if (!dateValue) {
    $("#availableSlots").innerHTML = "";
    $("#slotHelp").textContent = "Selecciona una fecha para ver horarios.";
    return;
  }
  if (dateValue < todayKey()) {
    $("#availableSlots").innerHTML = "";
    $("#slotHelp").textContent = "No se pueden elegir fechas pasadas.";
    return;
  }
  if (!isActiveBusinessDay(dateValue)) {
    $("#availableSlots").innerHTML = "";
    $("#slotHelp").textContent = "Ese dia no esta habilitado para reservas.";
    return;
  }
  if (totals.minutes > businessCloseMinutes() - businessOpenMinutes()) {
    $("#availableSlots").innerHTML = "";
    $("#slotHelp").textContent = "La duracion total supera el horario de atencion.";
    return;
  }
  if (!slots.length) {
    $("#availableSlots").innerHTML = "";
    $("#slotHelp").textContent = "No hay horarios disponibles para esa fecha y duracion.";
    return;
  }

  if (selectedStartTime && !slots.includes(selectedStartTime)) selectedStartTime = "";
  $("#slotHelp").textContent = "";
  $("#availableSlots").innerHTML = slots.map((slot) => `<button class="time-slot ${slot === selectedStartTime ? "active" : ""}" type="button" data-time="${slot}">${slot}</button>`).join("");
}

function depositAmount(total, config = paymentConfig) {
  const value = Number(config.depositValue || 0);
  if (!value) return 0;
  if (config.depositMode === "percent") return Math.round(total * Math.min(value, 100) / 100);
  return Math.min(value, total);
}

function paymentConfigRows(total) {
  const deposit = depositAmount(total);
  const paymentFields = [
    paymentConfig.alias ? `<div><span>Alias</span><strong>${escapeHtml(paymentConfig.alias)}</strong></div>` : "",
    paymentConfig.holder ? `<div><span>Titular</span><strong>${escapeHtml(paymentConfig.holder)}</strong></div>` : "",
    paymentConfig.cbu ? `<div><span>CBU / CVU</span><strong>${escapeHtml(paymentConfig.cbu)}</strong></div>` : "",
  ].filter(Boolean).join("");
  const depositLabel = deposit > 0 ? money(deposit) : "Sin seña requerida";
  const message = paymentConfig.message || (deposit > 0 ? defaultPaymentConfig.message : "");
  return `
    <div class="payment-transfer-box">
      <p class="eyebrow">Datos de transferencia</p>
      <div class="payment-data-grid">
        ${paymentFields}
        <div><span>Se&ntilde;a estimada</span><strong>${depositLabel}</strong></div>
        <div><span>Total del servicio</span><strong>${money(total)}</strong></div>
      </div>
      ${message ? `<p>${escapeHtml(message)}</p>` : ""}
      <p>El importe final de la se&ntilde;a se confirma al generar la reserva.</p>
    </div>
  `;
}

function renderCheckoutReview() {
  const totals = selectedTotals();
  const endTime = minutesToTime(timeToMinutes(selectedStartTime) + totals.minutes);
  $("#checkoutReview").innerHTML = `
    <aside class="summary checkout-summary" aria-live="polite">
      <div><span>Total</span><strong>${money(totals.price)}</strong></div>
      <div><span>Tiempo total</span><strong>${durationLabel(totals.minutes)}</strong></div>
      <div><span>Inicio</span><strong>${selectedStartTime}</strong></div>
      <div><span>Fin estimado</span><strong>${endTime}</strong></div>
    </aside>
    <div class="reservation-services checkout-services">${selectedServices().map((service) => `<span>${service.name}</span>`).join("")}</div>
    <p class="slot-empty">Fecha elegida: ${dateLabel(selectedDate)}.</p>
    <p class="slot-empty">Total, duracion y se&ntilde;a son una vista previa. Supabase vuelve a validar disponibilidad, precios y bloqueo al confirmar.</p>
    ${paymentConfigRows(totals.price)}
  `;
}

function validateProof(file) {
  if (!file || !file.name || !file.size) return "";
  const extension = file.name.split(".").pop().toLowerCase();
  if (!allowedProofTypes.includes(file.type) && !allowedProofExtensions.includes(extension)) {
    return "El comprobante debe ser JPG, JPEG, PNG o PDF.";
  }
  return "";
}

function readProofFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, type: file.type, size: file.size, dataUrl: reader.result });
    reader.onerror = () => reject(new Error("No se pudo leer el comprobante."));
    reader.readAsDataURL(file);
  });
}

function queueReservationEmails(reservation) {
  const adminEmail = smtpConfig.adminEmail || "admin@paradisonails.com";
  emailOutbox.unshift({
    to: adminEmail,
    type: "admin",
    reservationId: reservation.id,
    subject: `Nueva reserva pendiente ${reservation.reference}`,
    createdAt: new Date().toISOString(),
    includesProof: Boolean(reservation.paymentProof),
  });
  emailOutbox.unshift({
    to: reservation.client.email,
    type: "client",
    reservationId: reservation.id,
    subject: "Recibimos tu solicitud de reserva",
    createdAt: new Date().toISOString(),
  });
}

function reservationErrorMessage(error) {
  const message = String(error?.message || error || "");
  const lower = message.toLowerCase();
  if (lower.includes("overlap") || lower.includes("ocup") || lower.includes("conflict") || lower.includes("superpos")) {
    return "Ese horario ya fue ocupado. Elegi otro turno disponible.";
  }
  if (lower.includes("blocked") || lower.includes("bloque")) {
    return "Ese horario fue bloqueado por administracion. Elegi otro turno disponible.";
  }
  if (lower.includes("permission") || lower.includes("permis") || lower.includes("rls") || lower.includes("unauthorized")) {
    return "Supabase rechazo la operacion por permisos. Revisar la configuracion de acceso.";
  }
  if (lower.includes("service") || lower.includes("servicio")) {
    return "Uno de los servicios seleccionados ya no esta disponible. Actualiza la pagina y volve a elegir.";
  }
  return message || "No se pudo generar la reserva. Intentá nuevamente.";
}

function reservationPayloadFromForm(formData) {
  return {
    clientName: String(formData.get("clientName") || "").trim(),
    clientPhone: String(formData.get("clientPhone") || "").trim(),
    clientEmail: String(formData.get("clientEmail") || "").trim(),
    date: selectedDate,
    startTime: selectedStartTime,
    serviceIds: selectedServices().map((service) => service.id),
    comment: String(formData.get("clientComment") || "").trim(),
    paymentNotes: String(formData.get("paymentNotes") || "").trim(),
  };
}

async function createLocalReservation(formData) {
  const proofFile = formData.get("paymentProof");
  const proofError = validateProof(proofFile);
  if (proofError) throw new Error(proofError);

  const paymentProof = proofFile?.size ? await readProofFile(proofFile) : null;
  const totals = selectedTotals();
  const startMinutes = timeToMinutes(selectedStartTime);
  const endTime = minutesToTime(startMinutes + totals.minutes);
  const reference = `TR-${Date.now().toString().slice(-8)}`;
  const paymentSnapshot = loadObject(storageKeys.paymentConfig, defaultPaymentConfig);
  const deposit = depositAmount(totals.price, paymentSnapshot);
  const reservation = {
    id: `RES-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "pending_validation",
    paymentStatus: "pending_validation",
    bookingStatus: "pending_validation",
    paymentMethod: "Transferencia Mercado Pago",
    paymentReference: reference,
    reference,
    seenByAdmin: false,
    client: { name: formData.get("clientName"), phone: formData.get("clientPhone"), email: formData.get("clientEmail") },
    date: selectedDate,
    time: selectedStartTime,
    startTime: selectedStartTime,
    endTime,
    comment: formData.get("clientComment") || "",
    paymentNotes: formData.get("paymentNotes") || "",
    services: selectedServices(),
    total: totals.price,
    depositAmount: deposit,
    minutes: totals.minutes,
    paymentConfig: paymentSnapshot,
    paymentProof,
  };
  reservations.unshift(reservation);
  queueReservationEmails(reservation);
  saveReservationState();
  return reservation;
}

async function createReservation(formData) {
  const payload = reservationPayloadFromForm(formData);
  if (!payload.clientName || !payload.clientPhone || !payload.clientEmail || !payload.date || !payload.startTime || !payload.serviceIds.length) {
    throw new Error("Completá tus datos, servicios, fecha y horario antes de confirmar.");
  }

  const api = window.paradisoSupabase;
  if (!api?.booking) {
    setBookingOfflineMode(true);
    return createLocalReservation(formData);
  }

  try {
    const reference = await api.booking.createPublicReservation(payload);
    setBookingOfflineMode(false);
    return {
      reference,
      client: { name: payload.clientName, phone: payload.clientPhone, email: payload.clientEmail },
      date: payload.date,
      startTime: payload.startTime,
      bookingStatus: "pending_validation",
    };
  } catch (error) {
    if (api.isNetworkError?.(error)) {
      setBookingOfflineMode(true);
      return createLocalReservation(formData);
    }
    setBookingOfflineMode(false);
    throw new Error(reservationErrorMessage(error));
  }
}

function resetFlow() {
  selectedServiceIds = [];
  selectedDate = "";
  selectedStartTime = "";
  $("#appointmentDate").value = todayKey();
  $("#reservationForm").reset();
  renderServices();
  renderSelection();
  renderSlots();
}

function closeDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog?.open) dialog.close();
}

function bindEvents() {
  $("#serviceCards").addEventListener("change", (event) => {
    const checkbox = event.target.closest(".service-check");
    if (checkbox) selectService(checkbox.value, checkbox.checked);
  });

  document.querySelectorAll("[data-step-target]").forEach((control) => {
    control.addEventListener("click", (event) => {
      if (control.target === "_blank") return;
      event.preventDefault();
      showStep(control.dataset.stepTarget);
    });
  });

  $("#continueToGuide").addEventListener("click", () => {
    if (!validateServiceSelection("#servicesError")) return;
    $("#servicesError").textContent = "";
    showStep("reserva-guiada");
  });

  $("#continueToSchedule").addEventListener("click", async () => {
    if (!validateServiceSelection("#selectionError")) return;
    await refreshBookingDataFromSupabase();
    $("#selectionError").textContent = "";
    $("#appointmentDate").value = $("#appointmentDate").value || todayKey();
    renderSlots();
    showStep("fecha-horario");
  });

  $("#appointmentDate").addEventListener("change", () => {
    selectedStartTime = "";
    renderSlots();
  });

  $("#availableSlots").addEventListener("click", (event) => {
    const button = event.target.closest(".time-slot");
    if (!button) return;
    selectedStartTime = button.dataset.time;
    renderSlots();
  });

  $("#continueToCheckout").addEventListener("click", async () => {
    await refreshBookingDataFromSupabase();
    if (!selectedStartTime) {
      $("#slotHelp").textContent = "Selecciona un horario disponible para continuar.";
      return;
    }
    renderCheckoutReview();
    showStep("confirmacion-pago");
  });

  $("#reservationForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (reservationSubmitInProgress) return;
    const totals = selectedTotals();
    const startMinutes = selectedStartTime ? timeToMinutes(selectedStartTime) : 0;
    const endMinutes = startMinutes + totals.minutes;
    if (!selectedDate || !selectedStartTime || !isActiveBusinessDay(selectedDate) || isPastSlot(selectedDate, startMinutes) || hasOverlap(selectedDate, startMinutes, endMinutes) || isBlockedSlot(selectedDate, startMinutes, endMinutes)) {
      showStep("fecha-horario");
      renderSlots();
      $("#slotHelp").textContent = "Ese horario ya no esta disponible. Elegi otro turno.";
      return;
    }
    const submitButton = event.currentTarget.querySelector('button[type="submit"]');
    reservationSubmitInProgress = true;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Generando reserva...";
    }
    try {
      const reservation = await createReservation(new FormData(event.currentTarget));
      $("#confirmationText").textContent = `${reservation.client.name}, recibimos tu solicitud para el ${reservation.date} a las ${reservation.startTime}. Codigo de reserva: ${reservation.reference || "pendiente local"}. Estado: ${statusLabels[reservation.bookingStatus]}.`;
      $("#confirmationDialog").showModal();
      resetFlow();
      showStep("home", false);
    } catch (error) {
      alert(error.message);
    } finally {
      reservationSubmitInProgress = false;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Generar reserva";
      }
    }
  });

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => closeDialog(button.dataset.closeDialog));
  });
}

function bindHeroParallax() {
  const hero = document.querySelector(".hero");
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let frame = 0;
  const setShift = (x = 0, y = 0) => {
    hero.style.setProperty("--hero-shift-x", `${x}px`);
    hero.style.setProperty("--hero-shift-y", `${y}px`);
  };

  hero.addEventListener("mousemove", (event) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;
      setShift(x, y);
      frame = 0;
    });
  });

  hero.addEventListener("mouseleave", () => setShift());
}

window.addEventListener("storage", (event) => {
  if (![storageKeys.services, storageKeys.reservations, storageKeys.paymentConfig, storageKeys.whatsappConfig].includes(event.key)) return;
  services = loadList(storageKeys.services, defaultServices);
  reservations = loadList(storageKeys.reservations, []);
  paymentConfig = loadObject(storageKeys.paymentConfig, defaultPaymentConfig);
  whatsappConfig = loadObject(storageKeys.whatsappConfig, defaultWhatsappConfig);
  selectedServiceIds = selectedServiceIds.filter((id) => services.some((service) => service.id === id && service.active));
  syncWhatsappLinks();
  renderServices();
  renderSelection();
  renderSlots();
});

$("#appointmentDate").value = todayKey();
$("#appointmentDate").min = todayKey();
syncWhatsappLinks();
renderServices();
renderSelection();
renderSlots();
bindEvents();
bindHeroParallax();
showStep(window.location.hash.replace("#", "") || "home", false);
refreshBookingDataFromSupabase();

window.addEventListener("popstate", () => {
  showStep(window.location.hash.replace("#", "") || "home", false);
});
