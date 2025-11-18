"use client";

import { useEffect, useMemo, useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  country: string;
  message: string;
  privacyConsent: boolean;
  marketingOptIn: boolean;
  honeypot: string;
};

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
  "Singapore",
  "Other",
];

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    company: "",
    country: "",
    message: "",
    privacyConsent: false,
    marketingOptIn: false,
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [startTime] = useState<number>(() => Date.now());

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  const isSubmitDisabled = useMemo(
    () => status === "submitting",
    [status],
  );

  const handleChange = (
    field: keyof FormState,
    value: string | boolean,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Lazy load captcha script if site key provided
    const existing = document.querySelector('script[data-captcha-script="true"]');
    if (existing || (!recaptchaSiteKey && !hcaptchaSiteKey)) return;

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.dataset.captchaScript = "true";
    if (recaptchaSiteKey) {
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    } else if (hcaptchaSiteKey) {
      script.src = "https://js.hcaptcha.com/1/api.js";
    }
    document.body.appendChild(script);
  }, [recaptchaSiteKey, hcaptchaSiteKey]);

  const validateFields = () => {
    const errs: Record<string, string> = {};
    const required = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "jobTitle",
      "company",
      "country",
    ] as const;

    required.forEach((field) => {
      if (!form[field].trim()) {
        errs[field] = "Required";
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email.trim())) {
      errs.email = "Enter a valid email";
    }

    const phoneRegex = /^[\d+().\-\s]{7,}$/;
    if (form.phone && !phoneRegex.test(form.phone.trim())) {
      errs.phone = "Enter a valid phone";
    }

    if (!form.privacyConsent) {
      errs.privacyConsent = "Required";
    }

    setFieldErrors(errs);
    return errs;
  };

  const getCaptchaToken = async () => {
    // Prefer reCAPTCHA v3 if site key present
    const grecaptcha = (window as { grecaptcha?: { ready: () => Promise<void>; execute: (key: string, opts: { action: string }) => Promise<string>; } }).grecaptcha;
    if (recaptchaSiteKey && grecaptcha) {
      await grecaptcha.ready();
      const token = await grecaptcha.execute(recaptchaSiteKey, { action: "contact" });
      return { token, provider: "recaptcha" as const };
    }

    // Basic hCaptcha execution requires rendering widget; for now, rely on honeypot/time if none.
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const errs = validateFields();
    if (Object.keys(errs).length) {
      setStatus("error");
      setErrors(Object.values(errs));
      return;
    }

    setStatus("submitting");
    setErrors([]);

    let captchaToken: string | undefined;
    let captchaProvider: "recaptcha" | "hcaptcha" | undefined;
    try {
      const captcha = await getCaptchaToken();
      if (captcha) {
        captchaToken = captcha.token;
        captchaProvider = captcha.provider;
      }
    } catch (err) {
      console.warn("Captcha fetch failed", err);
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        captchaToken,
        captchaProvider,
        timeToSubmitMs: Date.now() - startTime,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data?.ok === false) {
      setStatus("error");
      setErrors(data?.errors ?? ["We could not submit your request. Try again."]);
      return;
    }

    setStatus("success");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
      company: "",
      country: "",
      message: "",
      privacyConsent: false,
      marketingOptIn: false,
      honeypot: "",
    });
    setFieldErrors({});
  };

  return (
    <section className="space-y-6 rounded-[32px] bg-white p-8 shadow-lg ring-1 ring-zinc-200">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.5em] text-zinc-500">Contact</p>
        <h1 className="text-4xl font-semibold text-zinc-900">
          Interested in working with DOLL?
        </h1>
        <p className="text-sm text-zinc-600">
          Tell us a bit about your project. We’ll route you to the right team.
        </p>
      </div>

      {status === "success" ? (
        <div className="rounded-2xl bg-green-50 px-4 py-3 text-green-800">
          Thanks! We received your request and will follow up shortly.
        </div>
      ) : null}

      {status === "error" ? (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-red-800">
          <p className="font-semibold">Submission failed</p>
          <ul className="list-disc pl-5 text-sm">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="First name"
            required
            value={form.firstName}
            onChange={(val) => handleChange("firstName", val)}
            error={fieldErrors.firstName}
          />
          <TextField
            label="Last name"
            required
            value={form.lastName}
            onChange={(val) => handleChange("lastName", val)}
            error={fieldErrors.lastName}
          />
          <TextField
            label="Business email address"
            type="email"
            required
            value={form.email}
            onChange={(val) => handleChange("email", val)}
            error={fieldErrors.email}
          />
          <TextField
            label="Phone number"
            required
            value={form.phone}
            onChange={(val) => handleChange("phone", val)}
            error={fieldErrors.phone}
          />
          <TextField
            label="Job title"
            required
            value={form.jobTitle}
            onChange={(val) => handleChange("jobTitle", val)}
            error={fieldErrors.jobTitle}
          />
          <TextField
            label="Company / institution"
            required
            value={form.company}
            onChange={(val) => handleChange("company", val)}
            error={fieldErrors.company}
          />
          <SelectField
            label="Country"
            required
            options={countries}
            value={form.country}
            onChange={(val) => handleChange("country", val)}
            error={fieldErrors.country}
          />
        </div>

        <div>
          <label className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-600">
            Tell us about your project
            <textarea
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              rows={5}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm transition focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              placeholder="What problem are you trying to solve?"
            />
          </label>
        </div>

        <label className="flex items-start gap-3 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={form.privacyConsent}
            onChange={(e) => handleChange("privacyConsent", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
            required
          />
          <span>
            I agree to the processing of my information as described in the{" "}
            <a href="/privacy" className="font-semibold underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {fieldErrors.privacyConsent ? (
          <p className="text-sm text-red-600">{fieldErrors.privacyConsent}</p>
        ) : null}

        <label className="flex items-start gap-3 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={form.marketingOptIn}
            onChange={(e) => handleChange("marketingOptIn", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
          />
          <span>Send me occasional product updates and news.</span>
        </label>

        {/* Honeypot */}
        <div className="hidden">
          <label>
            Do not fill this field
            <input
              type="text"
              value={form.honeypot}
              onChange={(e) => handleChange("honeypot", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {status === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
  type = "text",
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-600">
      <span className="flex items-center gap-1">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-2xl border bg-white px-4 py-3 text-base text-zinc-900 shadow-sm transition focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200 ${
          error ? "border-red-400" : "border-zinc-200"
        }`}
      />
      {error ? <span className="text-xs font-normal text-red-600">{error}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  options,
  value,
  onChange,
  required,
  error,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-600">
      <span className="flex items-center gap-1">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      <select
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-2xl border bg-white px-4 py-3 text-base text-zinc-900 shadow-sm transition focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200 ${
          error ? "border-red-400" : "border-zinc-200"
        }`}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs font-normal text-red-600">{error}</span> : null}
    </label>
  );
}

export default ContactForm;
