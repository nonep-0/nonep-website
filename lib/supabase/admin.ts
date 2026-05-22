import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
}

if (!serviceRoleKey) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\w가-힣ぁ-んァ-ン一-龥]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeDate(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.replaceAll(".", "-");
}

export function parseNumber(value: string) {
  const onlyNumber = value.replace(/[^\d]/g, "");

  if (!onlyNumber) {
    return 0;
  }

  return Number(onlyNumber);
}

export async function uploadAdminImage({
  bucket,
  folder,
  file,
}: {
  bucket: string;
  folder: string;
  file: File | null;
}) {
  if (!file || file.size === 0) {
    return null;
  }

  const safeName = file.name
    .replace(/\s+/g, "-")
    .replace(/[^\w.\-가-힣ぁ-んァ-ン一-龥]/g, "");

  const filePath = `${folder}/${Date.now()}-${safeName}`;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
}