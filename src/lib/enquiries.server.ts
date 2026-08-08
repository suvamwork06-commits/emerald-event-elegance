import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date?: string | null | undefined;
  guests?: string | null | undefined;
  city: string;
  budget?: string | null | undefined;
  notes?: string | null | undefined;
}



function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }

    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

export function createSupabasePublic() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: { fetch: createSupabaseFetch(key) },
  });
}

export async function insertEnquiry(data: EnquiryInput) {
  const supabase = createSupabasePublic();

  const { error } = await supabase.from("enquiries").insert({
    name: data.name,
    email: data.email,
    phone: data.phone,
    event_type: data.eventType,
    event_date: data.date ?? null,
    guests: data.guests ?? null,
    city: data.city,
    budget: data.budget ?? null,
    notes: data.notes ?? null,
  });

  if (error) throw error;
}

export async function listEnquiries(supabase: ReturnType<typeof createClient<Database>>) {
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function updateEnquiryStatus(
  supabase: ReturnType<typeof createClient<Database>>,
  id: string,
  status: string,
) {
  const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
  if (error) throw error;
}
