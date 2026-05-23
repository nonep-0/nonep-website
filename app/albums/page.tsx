import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALBUMS_PER_PAGE = 8;

type AlbumsPageProps = {
  searchParams: Promise<{
    page?: string;
    sort?: string;
  }>;
};

type Album = {
  id: string;
  slug: string | null;
  title: string;
  subtitle: string | null;
  type: string | null;
  thumbnail_url: string | null;
  cover_image_url: string | null;
  release_label: string | null;
  release_date: string | null;
  display_order: number | null;
  is_published: boolean | null;
  created_at: string | null;
};

function toPage(value: string | undefined) {
  const page = Number(value);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.floor(page);
}

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

function chunkArray<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks.length > 0 ? chunks : [[]];
}

function createPageHref({ page, sort }: { page: number; sort: string }) {
  const params = new URLSearchParams();

  if (page > 1) params.set("page", String(page));
  if (sort && sort !== "latest") params.set("sort", sort);

  const query = params.toString();
  return query ? `/albums?${query}` : "/albums";
}

function EmptyAlbumCard({ index }: { index: number }) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-[18px] border border-white/8 bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,20,147,0.22)_0%,rgba(255,20,147,0)_34%),linear-gradient(135deg,#09090d_0%,#160b18_48%,#07070a_100%)]" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-[-12%] top-[18%] h-[130px] w-[130px] rounded-full border border-white/14" />
        <div className="absolute right-[14%] top-[18%] h-[2px] w-[34%] bg-white/35" />
        <div className="absolute right-[10%] top-[23%] h-[2px] w-[24%] bg-white/18" />
        <div className="absolute bottom-[12%] left-[12%] h-[38px] w-[38px] rounded-full border border-white/12" />
      </div>

      <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/28 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/44 backdrop-blur-sm">
        Empty
      </div>

      <div className="absolute right-4 top-4 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#ff1493]/22 bg-black/28 text-[9px] font-black text-[#ff1493]/60 backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-[30px] font-black uppercase tracking-[0.18em] text-white/10">
          NONE
        </p>
      </div>
    </div>
  );
}

function AlbumCard({ album }: { album: Album }) {
  const image =
    album.thumbnail_url || album.cover_image_url || "/source/albums-hero.png";

  return (
    <Link
      href={`/albums/${album.slug || album.id}`}
      className="group overflow-hidden rounded-[18px] border border-white/8 bg-[#0a0a0f] transition duration-300 hover:-translate-y-1 hover:border-[#ff1493]/60 hover:shadow-[0_16px_40px_rgba(255,20,147,0.16)]"
    >
      <div className="relative aspect-square overflow-hidden bg-black">
        <img
          src={image}
          alt={album.title}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
          {album.type || "Single"}
        </div>

        <div className="absolute right-4 top-4 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#ff1493]/34 bg-black/36 text-[9px] font-black text-[#ff1493] backdrop-blur-sm">
          {album.display_order
            ? String(album.display_order).padStart(2, "0")
            : "01"}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[22px] font-black leading-none tracking-[-0.03em] text-white">
            {album.title}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-white/70">
              {album.subtitle || "Official Release"}
            </p>

            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-white/56">
              {album.release_label || album.release_date || ""}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SortButton({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-[42px] items-center justify-center rounded-full border px-5 text-[13px] font-black uppercase tracking-[0.22em] transition ${
        active
          ? "border-[#ff1493] bg-[#ff1493] text-black"
          : "border-white/12 bg-white/[0.03] text-white/52 hover:border-[#ff1493]/60 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

export default async function AlbumsPage({ searchParams }: AlbumsPageProps) {
  noStore();

  const params = await searchParams;
  const sort = params.sort || "latest";

  let query = supabaseAdmin
    .from("albums")
    .select("*")
    .eq("is_published", true);

  if (sort === "oldest") {
    query = query
      .order("release_date", { ascending: true, nullsFirst: false })
      .order("display_order", { ascending: true });
  } else {
    query = query
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
  }

  const { data } = await query;
  const albums = (data || []) as Album[];

  const albumPages = chunkArray(albums, ALBUMS_PER_PAGE);
  const currentPage = clampPage(toPage(params.page), albumPages.length);
  const currentItems: Array<Album | null> = [...albumPages[currentPage - 1]];

  while (currentItems.length < ALBUMS_PER_PAGE) {
    currentItems.push(null);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-t border-[#ff1493]/50 pt-[76px]">
        <div className="absolute inset-0">
          <img
            src="/source/albums-hero.png"
            alt="NONEP Albums"
            className="h-full w-full object-cover object-[78%_16%] md:object-[78%_14%]"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.56)_44%,rgba(0,0,0,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.36)_54%,rgba(0,0,0,1)_100%)]" />

        <div className="relative mx-auto flex min-h-[360px] max-w-[1280px] items-end px-6 py-16 md:min-h-[430px] md:px-8 md:py-20">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-[#ff1493]">
              NONEP Releases
            </p>

            <h1 className="text-[52px] font-black uppercase leading-none tracking-[0.16em] text-white md:text-[84px]">
              Albums
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-8 md:py-16">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <SortButton href="/albums?sort=latest" active={sort === "latest"}>
              Latest
            </SortButton>

            <SortButton href="/albums?sort=popular" active={sort === "popular"}>
              Popular
            </SortButton>

            <SortButton href="/albums?sort=oldest" active={sort === "oldest"}>
              Oldest
            </SortButton>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/34">
              Page {currentPage} / {albumPages.length}
            </p>

            <Link
              href={createPageHref({
                page: currentPage - 1,
                sort,
              })}
              className={`flex h-[42px] w-[42px] items-center justify-center rounded-full border text-[20px] font-black transition ${
                currentPage > 1
                  ? "border-[#ff1493]/55 text-white hover:bg-[#ff1493] hover:text-black"
                  : "pointer-events-none border-white/10 text-white/18"
              }`}
            >
              ‹
            </Link>

            <Link
              href={createPageHref({
                page: currentPage + 1,
                sort,
              })}
              className={`flex h-[42px] w-[42px] items-center justify-center rounded-full border text-[20px] font-black transition ${
                currentPage < albumPages.length
                  ? "border-[#ff1493]/55 text-white hover:bg-[#ff1493] hover:text-black"
                  : "pointer-events-none border-white/10 text-white/18"
              }`}
            >
              ›
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {currentItems.map((album, index) =>
            album ? (
              <AlbumCard key={album.id} album={album} />
            ) : (
              <EmptyAlbumCard key={`empty-album-${index}`} index={index} />
            )
          )}
        </div>
      </section>
    </main>
  );
}