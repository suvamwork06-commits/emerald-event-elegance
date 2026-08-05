/**
 * EmailJS integration placeholder.
 * Replace the three IDs below with your EmailJS credentials
 * (Dashboard → Account → API keys / Email Services / Email Templates).
 */
export const EMAILJS_CONFIG = {
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
};

const ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

export async function sendEnquiry(params: Record<string, string>) {
  if (EMAILJS_CONFIG.serviceId.startsWith("YOUR_")) {
    // Not configured yet — resolve so the UI flow stays intact.
    console.info("[EmailJS placeholder] enquiry payload:", params);
    await new Promise((r) => setTimeout(r, 900));
    return { delivered: false as const };
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_CONFIG.serviceId,
      template_id: EMAILJS_CONFIG.templateId,
      user_id: EMAILJS_CONFIG.publicKey,
      template_params: params,
    }),
  });
  if (!res.ok) throw new Error("Enquiry could not be sent");
  return { delivered: true as const };
}