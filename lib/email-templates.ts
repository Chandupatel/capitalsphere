import {
  ADMIN_EMAIL_DISPLAY,
  PHONE_DISPLAY,
  PHONES,
} from "@/constants/contact";

export const LOGO_CID = "capitalsphere-logo";

const COLORS = {
  navy950: "#050f22",
  navy900: "#081c38",
  navy800: "#0b2a4a",
  gold600: "#a5884e",
  gold500: "#c6a76a",
  gold100: "#f4ead2",
  slate600: "#55616f",
  slate500: "#6b7684",
  border: "#e6e9ef",
  surface: "#f7f8fb",
  white: "#ffffff",
};

export interface ConsultationEmailData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
  /** Which service (e.g. from a service card's "Learn More") the enquiry relates to, if any. */
  service?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function phoneLinksHtml() {
  return PHONES.map(
    (p) =>
      `<a href="${p.tel}" style="color:${COLORS.gold500};text-decoration:none;font-weight:600;">${escapeHtml(p.display)}</a>`,
  ).join(
    `<span style="color:${COLORS.slate500};margin:0 8px;">·</span>`,
  );
}

function emailShell(options: {
  preheader: string;
  title: string;
  subtitle?: string;
  bodyHtml: string;
  footerNote: string;
}) {
  const { preheader, title, subtitle, bodyHtml, footerNote } = options;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escapeHtml(title)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${COLORS.surface};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.surface};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
          <!-- Brand header -->
          <tr>
            <td style="background-color:${COLORS.navy950};border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
              <img src="cid:${LOGO_CID}" alt="CapitalSphere" width="56" height="50" style="display:inline-block;width:56px;height:auto;border:0;outline:none;text-decoration:none;" />
              <p style="margin:14px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:${COLORS.white};">
                Capital<span style="color:${COLORS.gold500};">Sphere</span>
              </p>
              <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(231,236,243,0.65);">
                Funding Today, Building Tomorrow
              </p>
            </td>
          </tr>

          <!-- Gold accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg, ${COLORS.gold600}, ${COLORS.gold500}, ${COLORS.gold100});font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:${COLORS.white};padding:36px 32px 28px;font-family:Arial,Helvetica,sans-serif;">
              <h1 style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;font-weight:700;color:${COLORS.navy950};">
                ${escapeHtml(title)}
              </h1>
              ${
                subtitle
                  ? `<p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${COLORS.slate600};">${subtitle}</p>`
                  : `<div style="height:20px;line-height:20px;">&nbsp;</div>`
              }
              ${bodyHtml}
            </td>
          </tr>

          <!-- Contact strip -->
          <tr>
            <td style="background-color:${COLORS.navy800};padding:22px 32px;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.gold500};">
                Get in touch
              </p>
              <p style="margin:0 0 6px;font-size:14px;line-height:1.6;color:${COLORS.white};">
                ${phoneLinksHtml()}
              </p>
              <p style="margin:0;font-size:14px;line-height:1.6;">
                <a href="mailto:${ADMIN_EMAIL_DISPLAY}" style="color:${COLORS.gold500};text-decoration:none;font-weight:600;">${ADMIN_EMAIL_DISPLAY}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:${COLORS.navy950};border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:rgba(231,236,243,0.55);">
                ${footerNote}
              </p>
              <p style="margin:10px 0 0;font-size:11px;line-height:1.5;color:rgba(231,236,243,0.4);">
                © ${new Date().getFullYear()} CapitalSphere Business Solution · Jaipur, Rajasthan
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string) {
  return `<tr>
    <td style="padding:12px 14px;border-bottom:1px solid ${COLORS.border};font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${COLORS.slate500};width:34%;vertical-align:top;">
      ${escapeHtml(label)}
    </td>
    <td style="padding:12px 14px;border-bottom:1px solid ${COLORS.border};font-size:14px;line-height:1.5;color:${COLORS.navy950};vertical-align:top;">
      ${value}
    </td>
  </tr>`;
}

export function buildAdminEnquiryEmail(data: ConsultationEmailData) {
  const safeName = escapeHtml(data.fullName);
  const safeCompany = data.companyName ? escapeHtml(data.companyName) : "—";
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br />");
  const safeService = data.service ? escapeHtml(data.service) : "";

  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${COLORS.border};border-radius:12px;overflow:hidden;background-color:${COLORS.surface};">
      ${safeService ? detailRow("Service Interested In", safeService) : ""}
      ${detailRow("Full Name", safeName)}
      ${detailRow("Company", safeCompany)}
      ${detailRow(
        "Email",
        `<a href="mailto:${safeEmail}" style="color:${COLORS.navy800};text-decoration:none;font-weight:600;">${safeEmail}</a>`,
      )}
      ${detailRow(
        "Phone",
        `<a href="tel:${safePhone.replace(/\s/g, "")}" style="color:${COLORS.navy800};text-decoration:none;font-weight:600;">${safePhone}</a>`,
      )}
    </table>
    <div style="margin-top:24px;padding:18px 20px;border-radius:12px;border-left:4px solid ${COLORS.gold500};background-color:${COLORS.surface};">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${COLORS.gold600};">
        Message
      </p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:${COLORS.navy950};">
        ${safeMessage}
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:${COLORS.slate500};">
      Reply directly to this email to respond to <strong style="color:${COLORS.navy800};">${safeName}</strong>.
    </p>
  `;

  const html = emailShell({
    preheader: data.service
      ? `New ${data.service} enquiry from ${data.fullName}`
      : `New consultation enquiry from ${data.fullName}`,
    title: "New Enquiry Notification",
    subtitle: data.service
      ? `A visitor submitted the <strong>Book a Free Consultation</strong> form regarding <strong>${safeService}</strong> on the CapitalSphere website.`
      : "A visitor submitted the <strong>Book a Free Consultation</strong> form on the CapitalSphere website.",
    bodyHtml,
    footerNote: "This notification was sent automatically from the CapitalSphere website consultation form.",
  });

  const text = [
    "New Enquiry Notification — CapitalSphere",
    "",
    ...(data.service ? [`Service Interested In: ${data.service}`] : []),
    `Full Name: ${data.fullName}`,
    `Company: ${data.companyName || "—"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  return {
    subject: data.service
      ? `New ${data.service} enquiry — ${data.fullName}${data.companyName ? ` (${data.companyName})` : ""}`
      : `New consultation enquiry — ${data.fullName}${data.companyName ? ` (${data.companyName})` : ""}`,
    html,
    text,
  };
}

export function buildThankYouEmail(data: ConsultationEmailData) {
  const safeName = escapeHtml(data.fullName);

  const bodyHtml = `
    <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:${COLORS.slate600};">
      Dear <strong style="color:${COLORS.navy950};">${safeName}</strong>,
    </p>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:${COLORS.slate600};">
      Thank you for reaching out to <strong style="color:${COLORS.navy950};">CapitalSphere</strong>.
      We have received your consultation request and our team will review your enquiry shortly.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;background-color:${COLORS.gold100};border-radius:12px;">
      <tr>
        <td style="padding:18px 20px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${COLORS.gold600};">
            What happens next?
          </p>
          <p style="margin:0;font-size:14px;line-height:1.65;color:${COLORS.navy800};">
            One of our advisors will contact you on the phone or email you provided —
            usually within one business day — to discuss how we can help.
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:${COLORS.slate600};">
      If your matter is urgent, please call us on
      <a href="tel:${PHONES[0].tel.replace("tel:", "")}" style="color:${COLORS.navy800};font-weight:700;text-decoration:none;">${PHONE_DISPLAY}</a>
      or email
      <a href="mailto:${ADMIN_EMAIL_DISPLAY}" style="color:${COLORS.navy800};font-weight:700;text-decoration:none;">${ADMIN_EMAIL_DISPLAY}</a>.
    </p>
    <p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:${COLORS.slate600};">
      Warm regards,<br />
      <strong style="color:${COLORS.navy950};">The CapitalSphere Team</strong>
    </p>
  `;

  const html = emailShell({
    preheader: "We received your consultation request — thank you for contacting CapitalSphere.",
    title: "Thank You for Contacting Us",
    subtitle: "Your free consultation request has been received successfully.",
    bodyHtml,
    footerNote: "You are receiving this email because you submitted a consultation request on capitalspherebusinesssolutions.in.",
  });

  const text = [
    `Dear ${data.fullName},`,
    "",
    "Thank you for reaching out to CapitalSphere. We have received your consultation request and our team will review your enquiry shortly.",
    "",
    "What happens next?",
    "One of our advisors will contact you on the phone or email you provided — usually within one business day.",
    "",
    `Urgent? Call ${PHONE_DISPLAY} or email ${ADMIN_EMAIL_DISPLAY}.`,
    "",
    "Warm regards,",
    "The CapitalSphere Team",
  ].join("\n");

  return {
    subject: "Thank you — we received your CapitalSphere consultation request",
    html,
    text,
  };
}
