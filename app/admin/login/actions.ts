"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "nonep_admin_session";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function encodeMessage(message: string) {
  return encodeURIComponent(message.slice(0, 300));
}

export async function loginAdminAction(formData: FormData) {
  const password = getString(formData, "password");
  const from = getString(formData, "from") || "/admin";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    redirect(
      `/admin/login?error=${encodeMessage(
        "ADMIN_PASSWORD is missing in .env.local."
      )}`
    );
  }

  if (!password) {
    redirect(`/admin/login?error=${encodeMessage("Please enter password.")}`);
  }

  if (password !== adminPassword) {
    redirect(`/admin/login?error=${encodeMessage("Invalid password.")}`);
  }

  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, adminPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();

  cookieStore.delete(ADMIN_COOKIE_NAME);

  redirect("/admin/login");
}