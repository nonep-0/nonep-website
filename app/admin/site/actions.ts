"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function updateSiteContent(formData: FormData) {
  const id = String(formData.get("id") || "");
  const value = String(formData.get("value") || "");

  if (!id) {
    throw new Error("콘텐츠 ID가 없습니다.");
  }

  const { error } = await supabaseAdmin
    .from("site_contents")
    .update({
      value,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/site");
  revalidatePath("/service");
}

export async function updateSiteAsset(formData: FormData) {
  const id = String(formData.get("id") || "");
  const url = String(formData.get("url") || "");

  if (!id) {
    throw new Error("이미지 ID가 없습니다.");
  }

  const { error } = await supabaseAdmin
    .from("site_assets")
    .update({
      url,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/site");
  revalidatePath("/service");
}