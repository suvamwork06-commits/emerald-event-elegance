import { sendLovableEmail } from "@lovable.dev/email-js";
import { TEMPLATES } from "./registry";
import { render } from "@react-email/render";

export const SENDER_DOMAIN = process.env["SENDER_DOMAIN"] ?? "notify.maisonaurelle.com";

export async function sendTemplateEmail(
  templateName: string,
  to: string | string[],
  options: {
    templateData?: Record<string, unknown>;
    idempotencyKey?: string;
  } = {},
) {
  const template = TEMPLATES[templateName];
  if (!template) {
    throw new Error(`Template "${templateName}" not found`);
  }

  const data = options.templateData ?? {};
  const html = await render(template.component(data), { pretty: true });
  const text = "New enquiry notification. Please view this email in an HTML client.";

  const subject =
    typeof template.subject === "function" ? template.subject(data) : template.subject;

  const recipients = Array.isArray(to) ? to : [to];
  const results = await Promise.all(
    recipients.map((recipient) =>
      sendLovableEmail(
        {
          to: recipient,
          from: `concierge@${SENDER_DOMAIN}`,
          sender_domain: SENDER_DOMAIN,
          subject,
          html,
          text,
          idempotency_key: options.idempotencyKey,
        },
        { apiKey: process.env["LOVABLE_API_KEY"] ?? "" },
      ),
    ),
  );

  return results[0];
}
