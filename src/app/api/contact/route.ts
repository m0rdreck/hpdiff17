import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

/**
 * Réception des demandes de contact → envoi d'un e-mail via Resend.
 *
 * Variables d'environnement (à définir dans Vercel) :
 *   RESEND_API_KEY : clé API Resend (obligatoire pour l'envoi réel)
 *   CONTACT_TO     : e-mail de réception (défaut : e-mail du site)
 *   CONTACT_FROM   : expéditeur vérifié (ex. "HP Diff <contact@hpdiff17.fr>")
 *
 * Sans RESEND_API_KEY, la demande est simplement journalisée (fallback dev)
 * afin de ne jamais bloquer le formulaire.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const email = String(data.email ?? "").trim();
  const subject = String(data.subject ?? "Demande de contact").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !phone || !message) {
    return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 422 });
  }

  const to = process.env.CONTACT_TO || site.email || "";
  const from = process.env.CONTACT_FROM || `HP Diff <onboarding@resend.dev>`;
  const apiKey = process.env.RESEND_API_KEY;

  const text = [
    `Nouvelle demande depuis le site ${site.name}`,
    "",
    `Nom     : ${name}`,
    `Tél     : ${phone}`,
    `E-mail  : ${email || "—"}`,
    `Sujet   : ${subject}`,
    "",
    "Message :",
    message,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;color:#14162e">
      <h2 style="color:#15174a">Nouvelle demande — ${site.name}</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px 0;color:#5b607a">Nom</td><td style="font-weight:600">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#5b607a">Téléphone</td><td style="font-weight:600">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:6px 0;color:#5b607a">E-mail</td><td>${escapeHtml(email) || "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#5b607a">Sujet</td><td>${escapeHtml(subject)}</td></tr>
      </table>
      <p style="white-space:pre-wrap;background:#f5f6fb;border-left:3px solid #d4a62a;padding:14px;border-radius:8px;margin-top:16px">${escapeHtml(message)}</p>
    </div>`;

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY absent — e-mail non envoyé. Demande :", {
      name, phone, email, subject, message, at: new Date().toISOString(),
    });
    // On ne bloque pas l'utilisateur, mais la config e-mail reste à finaliser.
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `[Site] ${subject} — ${name}`,
      text,
      html,
      ...(email ? { replyTo: email } : {}),
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ ok: false, error: "send-failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] exception:", err);
    return NextResponse.json({ ok: false, error: "send-failed" }, { status: 502 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
