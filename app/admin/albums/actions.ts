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

  if (!(value instanceof File) || value.size === 0) {
    return null;
  }

  return value;
}

function encodeMessage(message: string) {
  return encodeURIComponent(message.slice(0, 300));
}

function nullable(value: string) {
  return value.trim() ? value.trim() : null;
}

type AlbumPayload = Record<string, string | number | boolean | null>;

function missingColumnName(message: string) {
  const match = message.match(/Could not find the '([^']+)' column/i);
  return match?.[1] || null;
}

async function insertAlbumWithSchemaRetry(payload: AlbumPayload) {
  const excludedColumns: string[] = [];
  let currentPayload = { ...payload };

  for (let i = 0; i < 20; i += 1) {
    const { data, error } = await supabaseAdmin
      .from("albums")
      .insert(currentPayload)
      .select("id, title")
      .single();

    if (!error) {
      return { data, excludedColumns };
    }

    const column = missingColumnName(error.message);

    if (!column || !(column in currentPayload)) {
      throw new Error(error.message);
    }

    excludedColumns.push(column);
    const { [column]: _removed, ...nextPayload } = currentPayload;
    currentPayload = nextPayload;
  }

  throw new Error("DB 컬럼 자동 제외 횟수를 초과했습니다.");
}

async function updateAlbumWithSchemaRetry(id: string, payload: AlbumPayload) {
  const excludedColumns: string[] = [];
  let currentPayload = { ...payload };

  for (let i = 0; i < 20; i += 1) {
    const { data, error } = await supabaseAdmin
      .from("albums")
      .update(currentPayload)
      .eq("id", id)
      .select("id, title")
      .single();

    if (!error) {
      return { data, excludedColumns };
    }

    const column = missingColumnName(error.message);

    if (!column || !(column in currentPayload)) {
      throw new Error(error.message);
    }

    excludedColumns.push(column);
    const { [column]: _removed, ...nextPayload } = currentPayload;
    currentPayload = nextPayload;
  }

  throw new Error("DB 컬럼 자동 제외 횟수를 초과했습니다.");
}

function albumPayloadFromForm(
  formData: FormData,
  imageUrls?: { thumbnail?: string | null; cover?: string | null },
) {
  const title = getString(formData, "title");
  const slugInput = getString(formData, "slug");
  const youtubeUrl = getString(formData, "youtube_url");
  const youtubeVideoIdInput = getString(formData, "youtube_video_id");
  const releaseDate = getString(formData, "release_date");

  const payload: AlbumPayload = {
    title,
    slug: slugInput || slugify(title),
    japanese_title: nullable(getString(formData, "japanese_title")),
    subtitle: nullable(getString(formData, "subtitle")),
    type: nullable(getString(formData, "type")),
    display_order: parseNumber(getString(formData, "display_order") || "999"),
    release_date: normalizeDate(releaseDate || ""),
    release_label: nullable(getString(formData, "release_label")),
    genre: nullable(getString(formData, "genre")),
    format: nullable(getString(formData, "format")),
    country: nullable(getString(formData, "country")),
    youtube_views: parseNumber(getString(formData, "youtube_views")),
    youtube_url: nullable(youtubeUrl),
    youtube_video_id: nullable(
      youtubeVideoIdInput || extractYouTubeVideoId(youtubeUrl) || "",
    ),
    melon_url: nullable(getString(formData, "melon_url")),
    genie_url: nullable(getString(formData, "genie_url")),
    bugs_url: nullable(getString(formData, "bugs_url")),
    vibe_url: nullable(getString(formData, "vibe_url")),
    flo_url: nullable(getString(formData, "flo_url")),
    apple_music_url: nullable(getString(formData, "apple_music_url")),
    spotify_url: nullable(getString(formData, "spotify_url")),
    youtube_music_url: nullable(getString(formData, "youtube_music_url")),
    producer_id: nullable(getString(formData, "producer_id")),
    director_id: nullable(getString(formData, "director_id")),
    description: nullable(getString(formData, "description")),
    tracklist: nullable(getString(formData, "tracklist")),
    credit: nullable(getString(formData, "credit")),
    is_published: true,
  };

  if (imageUrls?.thumbnail) {
    payload.thumbnail_url = imageUrls.thumbnail;
  }

  if (imageUrls?.cover) {
    payload.cover_image_url = imageUrls.cover;
  }

  return payload;
}

async function uploadAlbumImages(formData: FormData, slug: string) {
  const thumbnailFile = getFile(formData, "thumbnail_image");
  const coverFile = getFile(formData, "cover_image");

  const [thumbnailUrl, coverUrl] = await Promise.all([
    uploadAdminImage({
      bucket: "images",
      folder: `albums/thumbnails/${slug || "album"}`,
      file: thumbnailFile,
    }),
    uploadAdminImage({
      bucket: "images",
      folder: `albums/covers/${slug || "album"}`,
      file: coverFile,
    }),
  ]);

  return {
    thumbnail: thumbnailUrl,
    cover: coverUrl,
  };
}

export async function createAlbumAction(formData: FormData) {
  const title = getString(formData, "title");

  if (!title) {
    redirect(
      `/admin/albums?error=${encodeMessage("앨범명을 입력해야 합니다.")}`,
    );
  }

  const slug = getString(formData, "slug") || slugify(title);
  let successMessage = "앨범 저장 완료";

  try {
    const imageUrls = await uploadAlbumImages(formData, slug);
    const payload = albumPayloadFromForm(formData, imageUrls);
    const { data, excludedColumns } = await insertAlbumWithSchemaRetry(payload);

    revalidatePath("/");
    revalidatePath("/albums");
    revalidatePath("/admin");
    revalidatePath("/admin/albums");

    const suffix = excludedColumns.length
      ? ` / 제외된 DB 미존재 컬럼: ${excludedColumns.join(", ")}`
      : "";

    successMessage = `${data?.title || title} 저장 완료${suffix}`;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "앨범 저장에 실패했습니다.";
    redirect(`/admin/albums?error=${encodeMessage(message)}`);
  }

  redirect(`/admin/albums?success=${encodeMessage(successMessage)}`);
}

export async function updateAlbumAction(formData: FormData) {
  const id = getString(formData, "id");
  const title = getString(formData, "title");

  if (!id) {
    redirect(
      `/admin/albums?error=${encodeMessage("수정할 앨범 ID가 없습니다.")}`,
    );
  }

  if (!title) {
    redirect(
      `/admin/albums?error=${encodeMessage("앨범명을 입력해야 합니다.")}`,
    );
  }

  const slug = getString(formData, "slug") || slugify(title);
  let successMessage = "앨범 수정 완료";

  try {
    const imageUrls = await uploadAlbumImages(formData, slug);
    const payload = albumPayloadFromForm(formData, imageUrls);
    const { data, excludedColumns } = await updateAlbumWithSchemaRetry(
      id,
      payload,
    );

    revalidatePath("/");
    revalidatePath("/albums");
    revalidatePath(`/albums/${slug}`);
    revalidatePath(`/albums/${id}`);
    revalidatePath("/admin");
    revalidatePath("/admin/albums");

    const suffix = excludedColumns.length
      ? ` / 제외된 DB 미존재 컬럼: ${excludedColumns.join(", ")}`
      : "";

    successMessage = `${data?.title || title} 수정 완료${suffix}`;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "앨범 수정에 실패했습니다.";
    redirect(`/admin/albums?error=${encodeMessage(message)}`);
  }

  redirect(`/admin/albums?success=${encodeMessage(successMessage)}`);
}

export async function deleteAlbumAction(formData: FormData) {
  const id = getString(formData, "id");

  if (!id) {
    redirect(
      `/admin/albums?error=${encodeMessage("삭제할 앨범 ID가 없습니다.")}`,
    );
  }

  const { error } = await supabaseAdmin.from("albums").delete().eq("id", id);

  if (error) {
    redirect(`/admin/albums?error=${encodeMessage(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/albums");
  revalidatePath("/admin");
  revalidatePath("/admin/albums");

  redirect(`/admin/albums?success=${encodeMessage("앨범 삭제 완료")}`);
}
