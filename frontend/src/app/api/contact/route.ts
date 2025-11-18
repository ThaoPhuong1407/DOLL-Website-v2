import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createContactSubmission } from "@/lib/strapi";

export const dynamic = "force-dynamic";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  company?: string;
  country?: string;
  message?: string;
  privacyConsent?: boolean;
  marketingOptIn?: boolean;
  captchaToken?: string;
  captchaProvider?: "recaptcha" | "hcaptcha";
  honeypot?: string;
  timeToSubmitMs?: number;
};

const isNonEmpty = (value?: string) => !!value && value.trim().length > 0;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d+().\-\s]{7,}$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const errors: string[] = [];

    // Honeypot and timing guard
    if (body.honeypot) {
      return NextResponse.json({ ok: false, message: "Invalid submission" }, { status: 400 });
    }
    if (typeof body.timeToSubmitMs === "number" && body.timeToSubmitMs < 800) {
      return NextResponse.json({ ok: false, message: "Form submitted too quickly" }, { status: 400 });
    }

    if (!isNonEmpty(body.firstName)) errors.push("First name is required");
    if (!isNonEmpty(body.lastName)) errors.push("Last name is required");
    if (!isNonEmpty(body.email)) errors.push("Email is required");
    if (isNonEmpty(body.email) && !emailRegex.test(body.email!.trim())) {
      errors.push("Email format looks invalid");
    }
    if (!isNonEmpty(body.phone)) errors.push("Phone number is required");
    if (isNonEmpty(body.phone) && !phoneRegex.test(body.phone!.trim())) {
      errors.push("Phone number format looks invalid");
    }
    if (!isNonEmpty(body.jobTitle)) errors.push("Job title is required");
    if (!isNonEmpty(body.company)) errors.push("Company is required");
    if (!isNonEmpty(body.country)) errors.push("Country is required");
    if (!body.privacyConsent) errors.push("Privacy consent is required");

    if (errors.length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Optional CAPTCHA verification if secrets are configured
    const captchaOk = await verifyCaptcha(body);
    if (!captchaOk) {
      return NextResponse.json(
        { ok: false, errors: ["Captcha verification failed"] },
        { status: 400 },
      );
    }

    let savedToStrapi = false;
    try {
      // Persist to Strapi (expects "contact-submissions" collection type)
      await createContactSubmission({
        firstName: body.firstName!.trim(),
        lastName: body.lastName!.trim(),
        email: body.email!.trim(),
        phone: body.phone?.trim() ?? null,
        jobTitle: body.jobTitle?.trim() ?? null,
        company: body.company?.trim() ?? null,
        country: body.country?.trim() ?? null,
        message: body.message?.trim() ?? null,
      });
      savedToStrapi = true;
    } catch (err) {
      console.error("Failed to save to Strapi", err);
    }

    // Try to send an email notification if SMTP env vars are present
    const emailSent = await maybeSendEmail(body);

    if (!savedToStrapi || !emailSent) {
      return NextResponse.json(
        {
          ok: true,
          warning: buildWarning(savedToStrapi, emailSent),
        },
        { status: 207 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact submit failed", error);
    return NextResponse.json(
      { ok: false, message: "Failed to submit form" },
      { status: 500 },
    );
  }
}

function buildWarning(savedToStrapi: boolean, emailSent: boolean) {
  if (!savedToStrapi && !emailSent) {
    return "Could not persist to Strapi or send email. Check Strapi permissions/content type and SMTP configuration.";
  }
  if (!savedToStrapi) {
    return "Email sent but could not persist to Strapi. Check API token permissions or contact-submissions content type.";
  }
  return "Saved to Strapi but email failed. Check SMTP configuration.";
}

async function verifyCaptcha(payload: ContactPayload): Promise<boolean> {
  const recaptchaSecret = process.env.RECAPTCHA_SECRET;
  const hcaptchaSecret = process.env.HCAPTCHA_SECRET;

  // If no secret configured, skip captcha verification but keep honeypot/time guard.
  if (!recaptchaSecret && !hcaptchaSecret) return true;

  if (!payload.captchaToken || !payload.captchaProvider) return false;

  try {
    if (payload.captchaProvider === "recaptcha" && recaptchaSecret) {
      const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: payload.captchaToken,
        }),
      });
      const data = (await res.json()) as { success?: boolean; score?: number };
      return !!data.success && (data.score ?? 0) >= 0.3;
    }

    if (payload.captchaProvider === "hcaptcha" && hcaptchaSecret) {
      const res = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: hcaptchaSecret,
          response: payload.captchaToken,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      return !!data.success;
    }
  } catch (err) {
    console.error("Captcha verification error", err);
    return false;
  }

  return false;
}

async function maybeSendEmail(payload: ContactPayload) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_EMAIL_TO,
    CONTACT_EMAIL_FROM,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL_TO) {
    console.warn("Skipping email send: SMTP env vars missing");
    return false;
  }

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `New contact from ${payload.firstName ?? ""} ${
      payload.lastName ?? ""
    }`.trim();

    const lines = [
      `Name: ${payload.firstName ?? ""} ${payload.lastName ?? ""}`.trim(),
      `Email: ${payload.email ?? ""}`,
      `Phone: ${payload.phone ?? ""}`,
      `Job Title: ${payload.jobTitle ?? ""}`,
      `Company: ${payload.company ?? ""}`,
      `Country: ${payload.country ?? ""}`,
      `Message: ${payload.message ?? ""}`,
      `Marketing opt-in: ${payload.marketingOptIn ? "Yes" : "No"}`,
      `Time to submit (ms): ${payload.timeToSubmitMs ?? ""}`,
    ];

    await transport.sendMail({
      from: CONTACT_EMAIL_FROM || SMTP_USER,
      to: CONTACT_EMAIL_TO,
      subject,
      text: lines.join("\n"),
    });
    return true;
  } catch (error) {
    console.error("Email send failed", error);
    return false;
  }
}
