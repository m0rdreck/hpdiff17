import { NextResponse } from "next/server";

/**
 * Réception des demandes de contact.
 *
 * ⇢ POUR RENDRE LE FORMULAIRE FONCTIONNEL EN PRODUCTION :
 *   branchez ici l'envoi d'e-mail (Resend, Nodemailer, SendGrid…) ou
 *   l'enregistrement en base. Aujourd'hui, la demande est simplement
 *   validée puis journalisée côté serveur.
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
  const message = String(data.message ?? "").trim();

  if (!name || !phone || !message) {
    return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 422 });
  }

  // Journalisation temporaire (à remplacer par un envoi d'e-mail).
  console.info("[contact] nouvelle demande", {
    name,
    phone,
    email: data.email ?? "",
    subject: data.subject ?? "",
    message,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
