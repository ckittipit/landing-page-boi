"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

type ContactFormLabels = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
};

export default function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      detail: String(formData.get("detail") || "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setState("success");
        setMessage(labels.success);
        form.reset();
      } else {
        setState("error");
        setMessage(labels.error);
      }
    } catch (error) {
      setState("error");
      setMessage(labels.error);
    }
  }

  return (
    <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="font-medium text-neutral-700">{labels.firstName}</span>
          <input
            name="firstName"
            type="text"
            placeholder={labels.firstNamePlaceholder}
            required
            className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm shadow-sm focus:border-neutral-400 focus:outline-none"
          />
        </label>
        <label className="text-sm">
          <span className="font-medium text-neutral-700">{labels.lastName}</span>
          <input
            name="lastName"
            type="text"
            placeholder={labels.lastNamePlaceholder}
            required
            className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm shadow-sm focus:border-neutral-400 focus:outline-none"
          />
        </label>
      </div>
      <label className="text-sm">
        <span className="font-medium text-neutral-700">{labels.email}</span>
        <input
          name="email"
          type="email"
          placeholder={labels.emailPlaceholder}
          required
          className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm shadow-sm focus:border-neutral-400 focus:outline-none"
        />
      </label>
      <label className="text-sm">
        <span className="font-medium text-neutral-700">{labels.message}</span>
        <textarea
          name="detail"
          placeholder={labels.messagePlaceholder}
          rows={5}
          required
          className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm shadow-sm focus:border-neutral-400 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "loading" ? labels.submitting : labels.submit}
      </button>
      {message ? (
        <p
          className={`text-sm ${
            state === "success" ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
