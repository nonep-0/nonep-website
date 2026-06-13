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

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

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

function safeFolder(folder: string) {
  return folder
    .split("/")
    .map((part) =>
      part
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join("/");
}

function getImageExtension(file: File) {
  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext && /^[a-z0-9]+$/.test(ext)) return ext;

  return "jpg";
}

async function ensurePublicBucket(bucket: string) {
  const { data } = await supabaseAdmin.storage.getBucket(bucket);

  if (data) {
    if (!data.public) {
      await supabaseAdmin.storage.updateBucket(bucket, { public: true });
    }
    return;
  }

  const { error } = await supabaseAdmin.storage.createBucket(bucket, {
    public: true,
    fileSizeLimit: MAX_IMAGE_SIZE,
    allowedMimeTypes: VALID_IMAGE_TYPES,
  });

  if (error && !/already exists/i.test(error.message)) {
    throw new Error(`Storage 버킷 생성 실패: ${error.message}`);
  }
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

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("이미지 파일은 10MB 이하만 업로드할 수 있습니다.");
  }

  if (!VALID_IMAGE_TYPES.includes(file.type)) {
    throw new Error("이미지는 JPG, PNG, WEBP, GIF 형식만 업로드할 수 있습니다.");
  }

  await ensurePublicBucket(bucket);

  const ext = getImageExtension(file);
  const cleanFolder = safeFolder(folder);
  const filePath = `${cleanFolder}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
}
