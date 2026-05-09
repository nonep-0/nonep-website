"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function updateInquiry(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "new");
  const adminMemo = String(formData.get("admin_memo") || "");

  if (!id) {
    throw new Error("문의 ID가 없습니다.");
  }

  const { error } = await supabaseAdmin
    .from("inquiries")
    .update({
      status,
      admin_memo: adminMemo,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function deleteInquiry(formData: FormData) {
  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("문의 ID가 없습니다.");
  }

  const { error } = await supabaseAdmin.from("inquiries").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  redirect("/admin");
}