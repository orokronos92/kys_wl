import nodemailer, { type Transporter } from "nodemailer";
import { questions, type QuestionId } from "@/lib/questions";

// Envoi d'e-mail via SMTP (boîte KYS). Config lue depuis les variables d'env
// (jamais en dur). Si la config est absente, l'envoi est silencieusement ignoré
// — la notification ne doit jamais bloquer une inscription.

let transporter: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) {
    transporter = null;
    return null;
  }
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = SSL implicite ; 587 = STARTTLS
    auth: { user, pass },
  });
  return transporter;
}

function libelleReponse(qid: QuestionId, code: string | undefined): string {
  if (!code) return "—";
  const q = questions.find((x) => x.id === qid);
  return q?.options.find((o) => o.code === code)?.label ?? code;
}

export interface NotifInscrit {
  email: string;
  rang?: number;
  estFondateur?: boolean;
  answers: Partial<Record<QuestionId, string>>;
}

export async function notifierNouvelInscrit(data: NotifInscrit): Promise<void> {
  const t = getTransporter();
  if (!t) return;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "";
  const to = process.env.NOTIF_TO || process.env.SMTP_USER || "";

  const reponses = questions.map(
    (q) => `• ${q.title}\n  → ${libelleReponse(q.id, data.answers[q.id])}`,
  );

  const text = [
    "Nouvel inscrit sur la liste d'attente KYS.",
    "",
    `E-mail   : ${data.email}`,
    `Rang     : ${data.rang ?? "—"}`,
    `Fondateur: ${data.estFondateur ? "oui ✅" : "non"}`,
    "",
    "Réponses au questionnaire :",
    ...reponses,
  ].join("\n");

  await t.sendMail({
    from,
    to,
    subject: `KYS — nouvel inscrit${data.estFondateur ? " (fondateur)" : ""} : ${data.email}`,
    text,
  });
}
