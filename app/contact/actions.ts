"use server";

import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function encodeMessage(message: string) {
  return encodeURIComponent(message.slice(0, 300));
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function fileToAttachment(file: File | null) {
  if (!file || file.size === 0) {
    return null;
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return {
    filename: file.name,
    content: buffer,
    contentType: file.type || "application/octet-stream",
  };
}

export async function sendContactAction(formData: FormData) {
  const name = getString(formData, "name");
  const email = getString(formData, "email");
  const message = getString(formData, "message");
  const fileValue = formData.get("demo_file");

  const file = fileValue instanceof File ? fileValue : null;

  if (!name || !email || !message) {
    redirect(
      `/contact?error=${encodeMessage("이름, 이메일, 메시지를 모두 입력해주세요.")}`
    );
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailTo = process.env.MAIL_TO || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !mailTo) {
    redirect(
      `/contact?error=${encodeMessage(
        "메일 환경변수가 설정되지 않았습니다. .env.local을 확인해주세요."
      )}`
    );
  }

  try {
    const attachment = await fileToAttachment(file);

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        minVersion: "TLSv1",
        ciphers: "DEFAULT@SECLEVEL=0",
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"NONEP Contact" <${smtpUser}>`,
      to: mailTo,
      replyTo: email,
      subject: `[NONEP CONTACT] ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7;">
          <h2>NONEP Contact Inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
      attachments: attachment ? [attachment] : [],
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "메일 전송에 실패했습니다.";

    redirect(`/contact?error=${encodeMessage(errorMessage)}`);
  }

  redirect(
    `/contact?success=${encodeMessage("문의가 정상적으로 전송되었습니다.")}`
  );
}