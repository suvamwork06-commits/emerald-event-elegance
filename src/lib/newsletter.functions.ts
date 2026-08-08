import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const schema = z.object({
  email: z.string().email("Invalid email address").max(255),
});


export const submitNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const supabasePublic = createClient<Database>(
      process.env['SUPABASE_URL']!,
      process.env['SUPABASE_PUBLISHABLE_KEY']!,
      {
        auth: {
          storage: undefined,
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );

    const { error } = await supabasePublic
      .from("newsletter_subscribers")
      .insert({ email: data.email });

    if (error) {
      if (error.message.includes("duplicate key")) {
        return { ok: true, alreadySubscribed: true };
      }
      throw new Error("Could not join the atelier letter. Please try again.");
    }

    return { ok: true, alreadySubscribed: false };
  });

export const getSubscribers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("id, email, created_at")
      .order("created_at", { ascending: false });

    if (error) throw new Error("Could not load subscribers.");
    return data ?? [];
  });

