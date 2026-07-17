export const PHONES = [
  { display: "+91 96941 34403", tel: "tel:+919694134403" },
  { display: "+91 96943 34403", tel: "tel:+919694334403" },
] as const;

/** Primary phone — used in compact UI (header, WhatsApp). */
export const PHONE_DISPLAY = PHONES[0].display;
export const PHONE_TEL = PHONES[0].tel;
export const WHATSAPP_URL = "https://wa.me/919694134403";

export const ADMIN_EMAIL_DISPLAY = "info@capitalsphere.us.cc";

// Shown in the first-visit "services under maintenance" notice modal.
export const MAINTENANCE_CONTACT_EMAIL = "info@capitalsphere.us.cc";
