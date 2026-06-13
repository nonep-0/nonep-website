"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseNumber, slugify, supabaseAdmin, uploadAdminImage } from "@/lib/supabase/admin";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getFile(formData: FormData, key: string) {
  const value = formData.get(key);
  if (!(value instanceof File) || value.size === 0) return null;
  return value;
}

function encodeMessage(message: string) {
  return encodeURIComponent(message.slice(0, 300));
}

function nullable(value: string) {
  return value ? value : null;
}

function directorPayloadFromForm(formData: FormData, urls?: { profile?: string | null; cover?: string | null }) {
  const name = getString(formData, "name");
  const slug = getString(formData, "slug") || slugify(name);

  const payload: Record<string, string | number | boolean | null> = {
    name,
    slug,
    japanese_name: nullable(getString(formData, "japanese_name")),
    role: getString(formData, "role") || "Director",
    position: nullable(getString(formData, "position")),
    description: nullable(getString(formData, "description")),
    signature: nullable(getString(formData, "signature")),
    display_order: parseNumber(getString(formData, "display_order") || "999"),
    is_published: true,
  };

  if (urls?.profile) payload.profile_image_url = urls.profile;
  if (urls?.cover) payload.cover_image_url = urls.cover;

  return payload;
}

async function uploadDirectorImages(formData: FormData, slug: string) {
  const [profile, cover] = await Promise.all([
    uploadAdminImage({ bucket: "director-images", folder: `profiles/${slug}`, file: getFile(formData, "profile_image") }),
    uploadAdminImage({ bucket: "director-images", folder: `covers/${slug}`, file: getFile(formData, "cover_image") }),
  ]);
  return { profile, cover };
}

export async function createDirectorAction(formData: FormData) {
  const name = getString(formData, "name");
  if (!name) redirect(`/admin/directors?error=${encodeMessage("디렉터 이름을 입력해야 합니다.")}`);

  const slug = getString(formData, "slug") || slugify(name);

  let successMessage = "디렉터 저장 완료";

  try {
    const urls = await uploadDirectorImages(formData, slug);
    const { data, error } = await supabaseAdmin.from("directors").insert(directorPayloadFromForm(formData, urls)).select("id, name").single();
    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/directors");
    revalidatePath("/directors");
    successMessage = `${data.name} 저장 완료`;
  } catch (error) {
    const message = error instanceof Error ? error.message : "디렉터 저장에 실패했습니다.";
    redirect(`/admin/directors?error=${encodeMessage(message)}`);
  }

  redirect(`/admin/directors?success=${encodeMessage(successMessage)}`);
}

export async function updateDirectorAction(formData: FormData) {
  const id = getString(formData, "id");
  const name = getString(formData, "name");
  if (!id) redirect(`/admin/directors?error=${encodeMessage("수정할 디렉터 ID가 없습니다.")}`);
  if (!name) redirect(`/admin/directors?error=${encodeMessage("디렉터 이름을 입력해야 합니다.")}`);

  const slug = getString(formData, "slug") || slugify(name);

  let successMessage = "디렉터 수정 완료";

  try {
    const urls = await uploadDirectorImages(formData, slug);
    const { data, error } = await supabaseAdmin.from("directors").update(directorPayloadFromForm(formData, urls)).eq("id", id).select("id, name").single();
    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/directors");
    revalidatePath("/directors");
    revalidatePath(`/directors/${slug}`);
    revalidatePath(`/directors/${id}`);
    successMessage = `${data.name} 수정 완료`;
  } catch (error) {
    const message = error instanceof Error ? error.message : "디렉터 수정에 실패했습니다.";
    redirect(`/admin/directors?error=${encodeMessage(message)}`);
  }

  redirect(`/admin/directors?success=${encodeMessage(successMessage)}`);
}

export async function deleteDirectorAction(formData: FormData) {
  const id = getString(formData, "id");
  if (!id) redirect(`/admin/directors?error=${encodeMessage("삭제할 디렉터 ID가 없습니다.")}`);

  const { error } = await supabaseAdmin.from("directors").delete().eq("id", id);
  if (error) redirect(`/admin/directors?error=${encodeMessage(error.message)}`);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/directors");
  revalidatePath("/directors");
  redirect(`/admin/directors?success=${encodeMessage("디렉터 삭제 완료")}`);
}
