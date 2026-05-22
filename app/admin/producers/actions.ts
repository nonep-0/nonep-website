"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  slugify,
  parseNumber,
  uploadAdminImage,
  supabaseAdmin,
} from "@/lib/supabase/admin";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getFile(formData: FormData, key: string) {
  const value = formData.get(key);

  if (!(value instanceof File)) {
    return null;
  }

  if (value.size === 0) {
    return null;
  }

  return value;
}

function encodeMessage(message: string) {
  return encodeURIComponent(message.slice(0, 300));
}

export async function createProducerAction(formData: FormData) {
  const name = getString(formData, "name");

  if (!name) {
    redirect("/admin/producers?error=이름을 입력해야 합니다.");
  }

  const slugInput = getString(formData, "slug");
  const slug = slugInput || slugify(name);

  const producerNumber = getString(formData, "producer_number");
  const displayOrder = getString(formData, "display_order");
  const japaneseName = getString(formData, "japanese_name");
  const role = getString(formData, "role") || "Producer";
  const meaning = getString(formData, "meaning");
  const description = getString(formData, "description");
  const signature = getString(formData, "signature");

  const profileFile = getFile(formData, "profile_image");
  const coverFile = getFile(formData, "cover_image");

  let profileImageUrl: string | null = null;
  let coverImageUrl: string | null = null;

  try {
    profileImageUrl = await uploadAdminImage({
      bucket: "producer-images",
      folder: "profiles",
      file: profileFile,
    });

    coverImageUrl = await uploadAdminImage({
      bucket: "producer-images",
      folder: "covers",
      file: coverFile,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.";

    redirect(`/admin/producers?error=${encodeMessage(message)}`);
  }

  const { data, error } = await supabaseAdmin
    .from("producers")
    .insert({
      name,
      slug,
      japanese_name: japaneseName || null,
      producer_number: producerNumber || null,
      role,
      meaning: meaning || null,
      description: description || null,
      signature: signature || null,
      profile_image_url: profileImageUrl,
      cover_image_url: coverImageUrl,
      display_order: displayOrder ? parseNumber(displayOrder) : 999,
      is_published: true,
    })
    .select("id, name")
    .single();

  if (error) {
    redirect(`/admin/producers?error=${encodeMessage(error.message)}`);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/producers");
  revalidatePath("/producers");

  redirect(`/admin/producers?success=${encodeMessage(`${data.name} 저장 완료`)}`);
}

export async function deleteProducerAction(formData: FormData) {
  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  const { error } = await supabaseAdmin
    .from("producers")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("프로듀서 삭제 실패:", error.message);
    return;
  }

  revalidatePath("/admin");
  revalidatePath("/admin/producers");
  revalidatePath("/producers");
}