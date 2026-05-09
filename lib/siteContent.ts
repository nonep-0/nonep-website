import { supabaseAdmin } from "@/lib/supabaseAdmin";

type SiteContentRow = {
  page_key: string;
  section_key: string;
  content_key: string;
  value: string;
};

type SiteAssetRow = {
  page_key: string;
  section_key: string;
  asset_key: string;
  url: string;
};

export type SiteTextMap = Record<string, string>;
export type SiteAssetMap = Record<string, string>;

export async function getSiteContents(pageKey: string) {
  const { data, error } = await supabaseAdmin
    .from("site_contents")
    .select("page_key, section_key, content_key, value")
    .eq("page_key", pageKey);

  if (error) {
    throw new Error(error.message);
  }

  const contents = (data || []) as SiteContentRow[];

  return contents.reduce<SiteTextMap>((acc, item) => {
    const key = `${item.section_key}.${item.content_key}`;
    acc[key] = item.value;
    return acc;
  }, {});
}

export async function getSiteAssets(pageKey: string) {
  const { data, error } = await supabaseAdmin
    .from("site_assets")
    .select("page_key, section_key, asset_key, url")
    .eq("page_key", pageKey);

  if (error) {
    throw new Error(error.message);
  }

  const assets = (data || []) as SiteAssetRow[];

  return assets.reduce<SiteAssetMap>((acc, item) => {
    const key = `${item.section_key}.${item.asset_key}`;
    acc[key] = item.url;
    return acc;
  }, {});
}

export function text(
  contents: SiteTextMap,
  key: string,
  fallback: string = ""
) {
  return contents[key] || fallback;
}

export function lines(
  contents: SiteTextMap,
  key: string,
  fallback: string = ""
) {
  return text(contents, key, fallback)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function asset(
  assets: SiteAssetMap,
  key: string,
  fallback: string = ""
) {
  return assets[key] || fallback;
}