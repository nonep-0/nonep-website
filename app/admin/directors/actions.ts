"use server";

import { revalidatePath } from "next/cache";
import {
  slugify,
  supabaseAdmin,
  uploadAdminImage,
} from "@/lib/supabase/admin";

export async function createDirectorAction(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const slug = slugify(slugInput || name);

  if (!name || !slug) {
    throw new Error("디렉터 이름은 필수입니다.");
  }

  const profileImage = formData.get("profile_image") as File | null;
  const coverImage = formData.get("cover_image") as File | null;

  const profileImageUrl = await uploadAdminImage({
    bucket: "director-images",
    folder: slug,
    file: profileImage,
  });

  const coverImageUrl = await uploadAdminImage({
    bucket: "director-images",
    folder: slug,
    file: coverImage,
  });

  const { error } = await supabaseAdmin.from("directors").insert({
    slug,
    name,
    japanese_name: String(formData.get("japanese_name") || "").trim() || null,
    role: String(formData.get("role") || "Director").trim(),
    position: String(formData.get("position") || "").trim() || null,
    profile_image_url: profileImageUrl,
    cover_image_url: coverImageUrl,
    description: String(formData.get("description") || "").trim() || null,
    signature: String(formData.get("signature") || "").trim() || null,
    display_order:
      Number(String(formData.get("display_order") || "").trim()) || 999,
    is_published: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/directors");
  revalidatePath("/directors");
  revalidatePath("/");
}

export async function deleteDirectorAction(formData: FormData) {
  const id = String(formData.get("id") || "").trim();

  if (!id) {
    throw new Error("삭제할 디렉터 ID가 없습니다.");
  }

  const { error } = await supabaseAdmin.from("directors").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/directors");
  revalidatePath("/directors");
  revalidatePath("/");
}