import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import { ADMIN_EMAIL_DISPLAY } from "@/constants/contact";
import {
  buildAdminEnquiryEmail,
  buildThankYouEmail,
  LOGO_CID,
  type ConsultationEmailData,
} from "@/lib/email-templates";

export const runtime = "nodejs";

interface ConsultationPayload extends ConsultationEmailData {
  // honeypot field — real users never fill this in
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function logoAttachment() {
  return {
    filename: "logo-mark.png",
    path: path.join(process.cwd(), "public", "images", "logo-mark.png"),
    cid: LOGO_CID,
    contentDisposition: "inline" as const,
  };
}

export async function POST(request: Request) {
  let body: Partial<ConsultationPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — silently succeed so bots don't learn anything.
  if (sanitize(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const fullName = sanitize(body.fullName, 120);
  const companyName = sanitize(body.companyName, 160);
  const email = sanitize(body.email, 160);
  const phone = sanitize(body.phone, 40);
  const message = sanitize(body.message, 3000);

  if (!fullName || !email || !phone || !message) {
    return NextResponse.json(
      { error: "Full name, email, phone and message are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!adminEmail || !smtpHost || !smtpUser || !smtpPass) {
    console.error(
      "Consultation form: missing SMTP/ADMIN_EMAIL environment variables. See README for setup.",
    );
    return NextResponse.json(
      { error: "The consultation form is not configured yet. Please call us instead." },
      { status: 500 },
    );
  }

  const data: ConsultationEmailData = { fullName, companyName, email, phone, message };
  const adminMail = buildAdminEnquiryEmail(data);
  const thankYouMail = buildThankYouEmail(data);
  const logo = logoAttachment();

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"CapitalSphere Website" <${smtpUser}>`,
      to: adminEmail,
      replyTo: email,
      subject: adminMail.subject,
      text: adminMail.text,
      html: adminMail.html,
      attachments: [logo],
    });

    await transporter.sendMail({
      from: `"CapitalSphere" <${smtpUser}>`,
      to: email,
      replyTo: ADMIN_EMAIL_DISPLAY,
      subject: thankYouMail.subject,
      text: thankYouMail.text,
      html: thankYouMail.html,
      attachments: [logo],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Consultation form: failed to send email", error);
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please call us instead." },
      { status: 500 },
    );
  }
}
