import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  eventType: z.string().min(1),
  date: z.string().optional().nullable(),
  guests: z.string().optional().nullable(),
  city: z.string().min(2),
  budget: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

function createSupabasePublic() {
  const { createClient } = require("@supabase/supabase-js") as typeof import("@supabase/supabase-js");
  return createClient<Database>(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
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

    if (error) {
      console.error("[submitEnquiry] insert error:", error);
      throw new Error("Could not save your enquiry. Please try again.");
    }

    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      await sendTemplateEmail("new-enquiry", "concierge@maisonaurelle.com", {
        templateData: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          event_type: data.eventType,
          event_date: data.date ?? "—",
          guests: data.guests ?? "—",
          city: data.city,
          budget: data.budget ?? "—",
          notes: data.notes ?? "",
          submittedAt: new Date().toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        },
        idempotencyKey: `enquiry-${data.email}-${Date.now()}`,
      });
    } catch (emailError) {
      // Email notification is a best-effort add-on; do not fail the enquiry.
      console.error("[submitEnquiry] email notification error:", emailError);
    }

    return { success: true };
  });
