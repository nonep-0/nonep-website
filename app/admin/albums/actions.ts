"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  normalizeDate,
  parseNumber,
  slugify,
  supabaseAdmin,
  uploadAdminImage,
} from "@/lib/supabase/admin";
import { extractYouTubeVideoId } from "@/lib/youtube";

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

export async function createAlbumAction(formData: FormData) {
  const title = getString(formData, "title");

  if (!title) {
    redirect("/admin/albums?error=앨범명을 입력해야 합니다.");
  }

  const slugInput = getString(formData, "slug");
  const slug = slugInput || slugify(title);

  const japaneseTitle = getString(formData, "japanese_title");
  const subtitle = getString(formData, "subtitle");
  const type = getString(formData, "type") || "Single";
  const releaseDate = getString(formData, "release_date");
  const releaseLabel = getString(formData, "release_label");
  const genre = getString(formData, "genre");
  const format = getString(formData, "format");
  const country = getString(formData, "country");
  const youtubeViews = getString(formData, "youtube_views");
  const youtubeUrl = getString(formData, "youtube_url");
  const youtubeVideoIdInput = getString(formData, "youtube_video_id");
  const youtubeVideoId =
    youtubeVideoIdInput || extractYouTubeVideoId(youtubeUrl);
  const producerId = getString(formData, "producer_id");
  const directorId = getString(formData, "director_id");
  const description = getString(formData, "description");
  const tracklist = getString(formData, "tracklist");
  const credit = getString(formData, "credit");
  const displayOrder = getString(formData, "display_order");

  const thumbnailFile = getFile(formData, "thumbnail_image");
  const coverFile = getFile(formData, "cover_image");

  let thumbnailUrl: string | null = null;
  let coverImageUrl: string | null = null;

  try {
    thumbnailUrl = await uploadAdminImage({
      bucket: "album-images",
      folder: "thumbnails",
      file: thumbnailFile,
    });

    coverImageUrl = await uploadAdminImage({
      bucket: "album-images",
      folder: "covers",
      file: coverFile,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.";

    redirect(`/admin/albums?error=${encodeMessage(message)}`);
  }

  const { data, error } = await supabaseAdmin
    .from("albums")
    .insert({
      title,
      slug,
      japanese_title: japaneseTitle || null,
      subtitle: subtitle || null,
      type,
      thumbnail_url: thumbnailUrl,
      cover_image_url: coverImageUrl,
      release_date: releaseDate ? normalizeDate(releaseDate) : null,
      release_label: releaseLabel || null,
      genre: genre || null,
      format: format || null,
      country: country || null,
      youtube_views: youtubeViews ? parseNumber(youtubeViews) : 0,
      youtube_url: youtubeUrl || null,
      youtube_video_id: youtubeVideoId || null,
      producer_id: producerId || null,
      director_id: directorId || null,
      description: description || null,
      tracklist: tracklist || null,
      credit: credit || null,
      display_order: displayOrder ? parseNumber(displayOrder) : 999,
      is_published: true,
    })
    .select("id, title")
    .single();

  if (error) {
    redirect(`/admin/albums?error=${encodeMessage(error.message)}`);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/albums");
  revalidatePath("/albums");
  revalidatePath("/");
  revalidatePath("/producers");
  revalidatePath("/directors");

  redirect(`/admin/albums?success=${encodeMessage(`${data.title} 저장 완료`)}`);
}

export async function deleteAlbumAction(formData: FormData) {
  const id = getString(formData, "id");

  if (!id) {
    redirect("/admin/albums?error=삭제할 앨범 ID가 없습니다.");
  }

  const { error } = await supabaseAdmin.from("albums").delete().eq("id", id);

  if (error) {
    redirect(`/admin/albums?error=${encodeMessage(error.message)}`);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/albums");
  revalidatePath("/albums");
  revalidatePath("/");
  revalidatePath("/producers");
  revalidatePath("/directors");

  redirect("/admin/albums?success=앨범 삭제 완료");
}