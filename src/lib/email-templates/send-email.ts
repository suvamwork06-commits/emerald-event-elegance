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

  const html = await render(template.component(options.templateData ?? {}), {
    pretty: true,
  });

  const subject =
    typeof template.subject === "function"
      ? template.subject(options.templateData ?? {})
      : template.subject;

  return sendLovableEmail({
    to,
    from: { name: "Maison Aurelle", email: `concierge@${SENDER_DOMAIN}` },
    subject,
    html,
    idempotencyKey: options.idempotencyKey,
    domain: SENDER_DOMAIN,
  });
}
