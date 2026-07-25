(function () {
  const SUPABASE_URL = "https://rxyvkethwncmrfmphacb.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_5ygkRmgvMz5TCBwg3yzHDw_2dbFSdrU";
  const SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  const SERVICES_TABLE = "services";

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
  };
})();
