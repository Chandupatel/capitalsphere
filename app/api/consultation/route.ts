import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

interface ConsultationPayload {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
  // honeypot field — real users never fill this in
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
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
      subject: `New consultation request — ${fullName}${companyName ? ` (${companyName})` : ""}`,
      text: [
        `Full Name: ${fullName}`,
        `Company Name: ${companyName || "—"}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0f1b2d;line-height:1.6">
          <h2 style="margin:0 0 16px;color:#0b2a4a">New Consultation Request</h2>
          <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
            <tr><td style="font-weight:bold;">Full Name</td><td>${escapeHtml(fullName)}</td></tr>
            <tr><td style="font-weight:bold;">Company Name</td><td>${escapeHtml(companyName) || "—"}</td></tr>
            <tr><td style="font-weight:bold;">Email</td><td>${escapeHtml(email)}</td></tr>
            <tr><td style="font-weight:bold;">Phone</td><td>${escapeHtml(phone)}</td></tr>
          </table>
          <p style="font-weight:bold;margin-top:16px;">Message</p>
          <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
