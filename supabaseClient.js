(function () {
  const SUPABASE_URL = "https://rxyvkethwncmrfmphacb.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_5ygkRmgvMz5TCBwg3yzHDw_2dbFSdrU";
  const SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  const SERVICES_TABLE = "services";
  const RESERVATIONS_TABLE = "reservations";
  const AVAILABILITY_TABLE = "availability_settings";
  const BLOCKED_SLOTS_TABLE = "blocked_slots";
  const PAYMENT_CONFIG_TABLE = "payment_config";

  let clientInstance = null;
  let libraryPromise = null;

  function loadSupabaseLibrary() {
    if (window.supabase?.createClient) return Promise.resolve();
    if (libraryPromise) return libraryPromise;

    libraryPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${SUPABASE_CDN}"]`);
      const script = existingScript || document.createElement("script");
      const timeout = window.setTimeout(() => reject(new Error("Supabase no respondio a tiempo.")), 7000);

      script.src = SUPABASE_CDN;
      script.async = true;
      script.onload = () => {
        window.clearTimeout(timeout);
        window.supabase?.createClient ? resolve() : reject(new Error("No se pudo inicializar Supabase."));
      };
      script.onerror = () => {
        window.clearTimeout(timeout);
        reject(new Error("No se pudo cargar Supabase."));
      };

      if (!existingScript) document.head.appendChild(script);
    }).catch((error) => {
      libraryPromise = null;
      throw error;
    });

    return libraryPromise;
  }

  async function client() {
    if (clientInstance) return clientInstance;
    await loadSupabaseLibrary();
    if (!window.supabase?.createClient) throw new Error("Supabase no esta disponible.");
    clientInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    return clientInstance;
  }

  function isNetworkError(error) {
    const message = String(error?.message || error || "").toLowerCase();
    return (
      message.includes("supabase no respondio")
      || message.includes("no se pudo cargar supabase")
      || message.includes("supabase no esta disponible")
      || message.includes("failed to fetch")
      || message.includes("networkerror")
      || message.includes("network request failed")
      || message.includes("load failed")
    );
  }

  function toAppService(row) {
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      description: row.description,
      minutes: Number(row.minutes || 0),
      price: Number(row.price || 0),
      active: Boolean(row.active),
      icon: row.icon || "",
      image: row.image_url || "",
      sortOrder: Number(row.sort_order || 0),
    };
  }

  function toDbService(service, sortOrder = 0) {
    return {
      slug: service.slug || service.id,
      name: service.name,
      description: service.description,
      minutes: Number(service.minutes || 0),
      price: Number(service.price || 0),
      active: Boolean(service.active),
      icon: service.icon || "",
      image_url: service.image || "",
      sort_order: Number(service.sortOrder ?? sortOrder ?? 0),
    };
  }

  function plainTime(value) {
    return String(value || "").slice(0, 5);
  }

  function firstValue(row, keys, fallback = "") {
    const key = keys.find((item) => row?.[item] !== undefined && row?.[item] !== null);
    return key ? row[key] : fallback;
  }

  function toAppPaymentConfig(row = {}) {
    return {
      alias: row.alias || "",
      holder: row.holder || "",
      cbu: row.cbu || "",
      depositMode: row.deposit_mode || row.depositMode || "amount",
      depositValue: Number(row.deposit_value ?? row.depositValue ?? 0),
      message: row.message || "",
    };
  }

  function toAppAvailability(row = {}) {
    return {
      id: row.id || "default",
      openTime: plainTime(row.open_time || row.openTime || "08:00"),
      closeTime: plainTime(row.close_time || row.closeTime || "19:00"),
      slotStepMinutes: Number(row.slot_step_minutes || row.slotStepMinutes || 15),
      activeDays: Array.isArray(row.active_days) ? row.active_days.map(Number) : [1, 2, 3, 4, 5, 6],
      businessTimezone: row.business_timezone || row.businessTimezone || "America/Argentina/Buenos_Aires",
    };
  }

  function toAppBlockedSlot(row = {}) {
    return {
      id: row.id,
      date: firstValue(row, ["blocked_date", "date", "reservation_date", "slot_date"]),
      startTime: plainTime(firstValue(row, ["start_time", "startTime"])),
      endTime: plainTime(firstValue(row, ["end_time", "endTime"])),
      active: row.active !== false,
      reason: row.reason || "",
    };
  }

  function normalizeReservationService(row = {}) {
    const linkedService = row.services || row.service || {};
    return {
      id: row.service_id || linkedService.id || row.id,
      name: firstValue(row, ["service_name", "name_snapshot", "service_name_snapshot", "name"], linkedService.name || "Servicio"),
      price: Number(firstValue(row, ["price", "price_snapshot", "service_price", "price_amount"], linkedService.price || 0)),
      minutes: Number(firstValue(row, ["minutes", "minutes_snapshot", "service_minutes", "duration_minutes"], linkedService.minutes || 0)),
    };
  }

  function toAppReservation(row = {}) {
    const reservationServices = Array.isArray(row.reservation_services) ? row.reservation_services : [];
    const startTime = plainTime(firstValue(row, ["start_time", "startTime", "time"]));
    const endTime = plainTime(firstValue(row, ["end_time", "endTime"]));
    const bookingStatus = firstValue(row, ["booking_status", "bookingStatus", "status"], "pending_validation");
    const paymentStatus = firstValue(row, ["payment_status", "paymentStatus"], "pending_validation");
    return {
      id: row.id,
      reference: row.reference || "",
      createdAt: row.created_at || row.createdAt || "",
      updatedAt: row.updated_at || row.updatedAt || "",
      status: bookingStatus,
      bookingStatus,
      paymentStatus,
      seenByAdmin: Boolean(row.seen_by_admin ?? row.seenByAdmin),
      client: {
        name: firstValue(row, ["client_name", "customer_name", "name"]),
        phone: firstValue(row, ["client_phone", "customer_phone", "phone"]),
        email: firstValue(row, ["client_email", "customer_email", "email"]),
      },
      date: firstValue(row, ["reservation_date", "date"]),
      time: startTime,
      startTime,
      endTime,
      comment: row.comment || "",
      paymentNotes: row.payment_notes || row.paymentNotes || "",
      services: reservationServices.map(normalizeReservationService),
      total: Number(firstValue(row, ["total_amount", "total", "total_price"], 0)),
      depositAmount: Number(firstValue(row, ["deposit_amount", "depositAmount"], 0)),
      minutes: Number(firstValue(row, ["total_minutes", "minutes", "duration_minutes"], 0)),
      paymentConfig: toAppPaymentConfig(row.payment_config || {}),
      paymentReference: row.reference || "",
    };
  }

  async function listServices({ activeOnly = false } = {}) {
    const supabaseClient = await client();

    let query = supabaseClient
      .from(SERVICES_TABLE)
      .select("id, slug, name, description, minutes, price, active, icon, image_url, sort_order")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (activeOnly) query = query.eq("active", true);

    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map(toAppService);
  }

  async function createService(service, sortOrder) {
    const supabaseClient = await client();

    const { data, error } = await supabaseClient
      .from(SERVICES_TABLE)
      .insert(toDbService(service, sortOrder))
      .select("id, slug, name, description, minutes, price, active, icon, image_url, sort_order")
      .single();

    if (error) throw error;
    return toAppService(data);
  }

  async function updateService(id, service) {
    const supabaseClient = await client();
    const payload = toDbService(service, service.sortOrder);

    const { count, error } = await supabaseClient
      .from(SERVICES_TABLE)
      .update(payload, { count: "exact" })
      .eq("id", id);

    if (error) throw error;
    if (count === 0) throw new Error("No se encontro el servicio para actualizar.");
    return toAppService({ id, ...payload });
  }

  async function deleteService(id) {
    const supabaseClient = await client();

    const { count, error } = await supabaseClient
      .from(SERVICES_TABLE)
      .delete({ count: "exact" })
      .eq("id", id);

    if (error) throw error;
    if (count === 0) throw new Error("No se encontro el servicio para eliminar.");
  }

  async function getAvailability() {
    const supabaseClient = await client();
    const { data, error } = await supabaseClient
      .from(AVAILABILITY_TABLE)
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    if (error) throw error;
    return toAppAvailability(data || {});
  }

  async function listBlockedSlots() {
    const supabaseClient = await client();
    const { data, error } = await supabaseClient
      .from(BLOCKED_SLOTS_TABLE)
      .select("*")
      .eq("active", true);

    if (error) throw error;
    return (data || []).map(toAppBlockedSlot);
  }

  async function getPaymentConfig() {
    const supabaseClient = await client();
    const { data, error } = await supabaseClient
      .from(PAYMENT_CONFIG_TABLE)
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    if (error) throw error;
    return toAppPaymentConfig(data || {});
  }

  async function createPublicReservation(reservation) {
    const supabaseClient = await client();
    const payloads = [
      {
        p_client_name: reservation.clientName,
        p_client_phone: reservation.clientPhone,
        p_client_email: reservation.clientEmail,
        p_date: reservation.date,
        p_start_time: reservation.startTime,
        p_service_ids: reservation.serviceIds,
        p_comment: reservation.comment || "",
        p_payment_notes: reservation.paymentNotes || "",
      },
      {
        p_client_name: reservation.clientName,
        p_client_phone: reservation.clientPhone,
        p_client_email: reservation.clientEmail,
        p_reservation_date: reservation.date,
        p_start_time: reservation.startTime,
        p_service_ids: reservation.serviceIds,
        p_comment: reservation.comment || "",
        p_payment_notes: reservation.paymentNotes || "",
      },
      {
        client_name: reservation.clientName,
        client_phone: reservation.clientPhone,
        client_email: reservation.clientEmail,
        reservation_date: reservation.date,
        start_time: reservation.startTime,
        service_ids: reservation.serviceIds,
        comment: reservation.comment || "",
        payment_notes: reservation.paymentNotes || "",
      },
    ];

    let lastError = null;
    for (const payload of payloads) {
      const { data, error } = await supabaseClient.rpc("create_public_reservation", payload);
      if (!error) {
        if (typeof data === "string") return data;
        return data?.reference || data?.[0]?.reference || "";
      }
      lastError = error;
      if (!["PGRST202", "42883"].includes(error.code)) break;
    }
    throw lastError;
  }

  async function listReservations() {
    const supabaseClient = await client();
    const { data, error } = await supabaseClient
      .from(RESERVATIONS_TABLE)
      .select("*, reservation_services(*, services(id, name, price, minutes))")
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) throw error;
    return (data || []).map(toAppReservation);
  }

  async function updateReservation(id, changes) {
    const supabaseClient = await client();
    const payload = {};
    if (changes.paymentStatus !== undefined) payload.payment_status = changes.paymentStatus;
    if (changes.bookingStatus !== undefined) payload.booking_status = changes.bookingStatus;
    if (changes.seenByAdmin !== undefined) payload.seen_by_admin = Boolean(changes.seenByAdmin);
    if (changes.paymentNotes !== undefined) payload.payment_notes = changes.paymentNotes || "";

    const { data, error } = await supabaseClient
      .from(RESERVATIONS_TABLE)
      .update(payload)
      .eq("id", id)
      .select("*, reservation_services(*, services(id, name, price, minutes))")
      .single();

    if (error) throw error;
    return toAppReservation(data);
  }

  async function markReservationsSeen(ids) {
    if (!ids.length) return [];
    const supabaseClient = await client();
    const { data, error } = await supabaseClient
      .from(RESERVATIONS_TABLE)
      .update({ seen_by_admin: true })
      .in("id", ids)
      .select("*, reservation_services(*, services(id, name, price, minutes))");

    if (error) throw error;
    return (data || []).map(toAppReservation);
  }

  async function signIn(email, password) {
    const supabaseClient = await client();
    return supabaseClient.auth.signInWithPassword({ email, password });
  }

  async function signOut() {
    const supabaseClient = await client();
    await supabaseClient.auth.signOut();
  }

  async function getSession() {
    const supabaseClient = await client();
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  window.paradisoSupabase = {
    isAvailable: () => true,
    isNetworkError,
    auth: {
      signIn,
      signOut,
      getSession,
    },
    services: {
      list: listServices,
      create: createService,
      update: updateService,
      delete: deleteService,
    },
    booking: {
      getAvailability,
      listBlockedSlots,
      getPaymentConfig,
      createPublicReservation,
    },
    reservations: {
      list: listReservations,
      update: updateReservation,
      markSeen: markReservationsSeen,
    },
  };
})();
