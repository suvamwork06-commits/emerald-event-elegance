import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { insertEnquiry, listEnquiries, updateEnquiryStatus } from "./enquiries.server";

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

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    await insertEnquiry(data);

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
      console.error("[submitEnquiry] email notification error:", emailError);
    }

    return { success: true };
  });

export const getEnquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    return listEnquiries(context.supabase);
  });

export const updateEnquiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "contacted", "qualified", "booked", "archived"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await updateEnquiryStatus(context.supabase, data.id, data.status);
    return { success: true };
  });
