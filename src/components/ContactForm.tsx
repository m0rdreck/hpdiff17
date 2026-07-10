"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "sending" | "success" | "error";

const subjects = [
  "Dépannage électrique",
  "Électricité générale",
  "Rénovation / mise aux normes",
  "Demande de devis",
  "Autre",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot anti-spam
    if (data.company) {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request-failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("L’envoi a échoué. Réessayez ou appelez-moi directement.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-navy-900/10 bg-navy-50/40 px-8 py-14 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-gold-500 text-navy-950">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">Message envoyé !</h3>
        <p className="mt-2 max-w-sm text-sm leading-7 text-muted">
          Merci pour votre message. Je vous recontacte dans les plus brefs délais.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-gold-600 hover:text-gold-500"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30";

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-8">
      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-900">Nom *</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Votre nom" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-900">Téléphone *</span>
          <input
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            className={field}
            placeholder="06 00 00 00 00"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-navy-900">E-mail</span>
        <input name="email" type="email" autoComplete="email" className={field} placeholder="vous@exemple.fr" />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-navy-900">Sujet</span>
        <select name="subject" className={field} defaultValue={subjects[3]}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-navy-900">Votre message *</span>
        <textarea
          name="message"
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder="Décrivez votre besoin, le type de logement, l’urgence éventuelle…"
        />
      </label>

      {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 transition-all hover:-translate-y-0.5 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
        {status !== "sending" && <Icon name="arrow" className="size-4" />}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        Vos données ne sont utilisées que pour traiter votre demande.
      </p>
    </form>
  );
}
