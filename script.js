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

const storageKeys = {
  services: "paradiso_services",
  reservations: "paradiso_reservations",
  smtp: "paradiso_smtp_config",
  outbox: "paradiso_email_outbox",
  paymentConfig: "paradiso_payment_config",
};

const flowStepIds = ["home", "servicios-disponibles", "reserva-guiada", "fecha-horario", "confirmacion-pago"];
const defaultWhatsappNumber = "5490000000000";
const statusLabels = {
  pending_validation: "Pendiente de validacion de pago",
  confirmed: "Reserva confirmada",
  payment_rejected: "Pago rechazado",
  cancelled: "Cancelada",
};

const allowedProofTypes = ["image/jpeg", "image/png", "application/pdf"];
const allowedProofExtensions = ["jpg", "jpeg", "png", "pdf"];
const openMinutes = 8 * 60;
const closeMinutes = 19 * 60;
const slotStepMinutes = 15;
const formatter = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const $ = (selector) => document.querySelector(selector);

let services = loadList(storageKeys.services, defaultServices);
let reservations = loadList(storageKeys.reservations, []);
let smtpConfig = loadObject(storageKeys.smtp, {});
let emailOutbox = loadList(storageKeys.outbox, []);
let paymentConfig = loadObject(storageKeys.paymentConfig, defaultPaymentConfig);
let selectedServiceIds = [];
let selectedDate = "";
let selectedStartTime = "";

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
  const configuredNumber = $("#whatsappLink")?.dataset.whatsappNumber || defaultWhatsappNumber;
  const text = encodeURIComponent("Hola Paradiso, quiero consultar por un turno.");
  const url = `https://wa.me/${configuredNumber}?text=${text}`;
  ["#whatsappLink", "#headerWhatsappLink"].forEach((selector) => {
    const link = $(selector);
    if (link) link.href = url;
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

function isPastSlot(dateValue, startMinutes) {
  if (dateValue !== todayKey()) return false;
  const now = new Date();
  return startMinutes <= now.getHours() * 60 + now.getMinutes();
}

function availableSlots(dateValue, totalMinutes) {
  if (!dateValue || !totalMinutes || totalMinutes > closeMinutes - openMinutes) return [];
  const slots = [];
  for (let start = openMinutes; start + totalMinutes <= closeMinutes; start += slotStepMinutes) {
    const end = start + totalMinutes;
    if (!isPastSlot(dateValue, start) && !hasOverlap(dateValue, start, end)) slots.push(minutesToTime(start));
  }
  return slots;
}

function renderServices() {
  const activeServices = services.filter((service) => service.active);
  $("#serviceCards").innerHTML = activeServices.length
    ? activeServices.map((service) => {
      const checked = selectedServiceIds.includes(service.id);
      return `
        <label class="service-card catalog-card selectable-card ${checked ? "selected" : ""}">
          <input class="service-check" type="checkbox" value="${service.id}" ${checked ? "checked" : ""} />
          <span class="icon">${service.icon}</span>
          <h3>${service.name}</h3>
          <p>${service.description}</p>
          <div class="service-meta catalog-meta">
            <span>${money(service.price)}</span>
            <span>${durationLabel(service.minutes)}</span>
          </div>
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
  if (totals.minutes > closeMinutes - openMinutes) {
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
  if (!value) return total;
  if (config.depositMode === "percent") return Math.round(total * Math.min(value, 100) / 100);
  return Math.min(value, total);
}

function paymentConfigRows(total) {
  const deposit = depositAmount(total);
  return `
    <div class="payment-transfer-box">
      <p class="eyebrow">Datos de transferencia</p>
      <div class="payment-data-grid">
        <div><span>Alias</span><strong>${paymentConfig.alias || "Sin configurar"}</strong></div>
        <div><span>Titular</span><strong>${paymentConfig.holder || "Sin configurar"}</strong></div>
        <div><span>Se&ntilde;a a transferir</span><strong>${money(deposit)}</strong></div>
        <div><span>Total del servicio</span><strong>${money(total)}</strong></div>
        ${paymentConfig.cbu ? `<div><span>CBU</span><strong>${paymentConfig.cbu}</strong></div>` : ""}
      </div>
      <p>${paymentConfig.message || defaultPaymentConfig.message}</p>
    </div>
  `;
}

function renderCheckoutReview() {
  paymentConfig = loadObject(storageKeys.paymentConfig, defaultPaymentConfig);
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
    ${paymentConfigRows(totals.price)}
  `;
}

function validateProof(file) {
  if (!file) return "Adjunta el comprobante de transferencia.";
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

async function createReservation(formData) {
  const proofFile = formData.get("paymentProof");
  const proofError = validateProof(proofFile);
  if (proofError) throw new Error(proofError);

  const paymentProof = await readProofFile(proofFile);
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

  $("#continueToSchedule").addEventListener("click", () => {
    if (!validateServiceSelection("#selectionError")) return;
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

  $("#continueToCheckout").addEventListener("click", () => {
    if (!selectedStartTime) {
      $("#slotHelp").textContent = "Selecciona un horario disponible para continuar.";
      return;
    }
    renderCheckoutReview();
    showStep("confirmacion-pago");
  });

  $("#reservationForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const totals = selectedTotals();
    if (!selectedDate || !selectedStartTime || hasOverlap(selectedDate, timeToMinutes(selectedStartTime), timeToMinutes(selectedStartTime) + totals.minutes)) {
      showStep("fecha-horario");
      renderSlots();
      $("#slotHelp").textContent = "Ese horario ya no esta disponible. Elegi otro turno.";
      return;
    }
    try {
      const reservation = await createReservation(new FormData(event.currentTarget));
      $("#confirmationText").textContent = `${reservation.client.name}, recibimos tu solicitud para el ${reservation.date} de ${reservation.startTime} a ${reservation.endTime}. Total: ${money(reservation.total)}. Estado: ${statusLabels[reservation.bookingStatus]}.`;
      $("#confirmationDialog").showModal();
      resetFlow();
      showStep("home", false);
    } catch (error) {
      alert(error.message);
    }
  });

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => closeDialog(button.dataset.closeDialog));
  });
}

window.addEventListener("storage", (event) => {
  if (![storageKeys.services, storageKeys.reservations, storageKeys.paymentConfig].includes(event.key)) return;
  services = loadList(storageKeys.services, defaultServices);
  reservations = loadList(storageKeys.reservations, []);
  paymentConfig = loadObject(storageKeys.paymentConfig, defaultPaymentConfig);
  selectedServiceIds = selectedServiceIds.filter((id) => services.some((service) => service.id === id && service.active));
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
showStep(window.location.hash.replace("#", "") || "home", false);

window.addEventListener("popstate", () => {
  showStep(window.location.hash.replace("#", "") || "home", false);
});
