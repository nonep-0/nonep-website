import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALBUMS_PER_PAGE = 8;
const PROFILES_PER_PAGE = 3;

type HomePageProps = {
  searchParams: Promise<{
    albumPage?: string;
    producerPage?: string;
    directorPage?: string;
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
};

type Producer = {
  id: string;
  slug: string | null;
  name: string;
  japanese_name: string | null;
  producer_number: string | null;
  role: string | null;
  meaning: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  display_order: number | null;
};

type Director = {
  id: string;
  slug: string | null;
  name: string;
  japanese_name: string | null;
  role: string | null;
  position: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  display_order: number | null;
};

function toPage(value: string | undefined) {
  const page = Number(value);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.floor(page);
}

function chunkArray<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks.length > 0 ? chunks : [[]];
}

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

function createPageHref({
  albumPage,
  producerPage,
  directorPage,
}: {
  albumPage?: number;
  producerPage?: number;
  directorPage?: number;
}) {
  const params = new URLSearchParams();

  if (albumPage && albumPage > 1) params.set("albumPage", String(albumPage));
  if (producerPage && producerPage > 1)
    params.set("producerPage", String(producerPage));
  if (directorPage && directorPage > 1)
    params.set("directorPage", String(directorPage));

  const query = params.toString();
  return query ? `/?${query}` : "/";
}

function formatProducerNumber(value?: string | null) {
  if (!value) return "NO.---";

  const rawValue = String(value).trim();

  if (rawValue.toUpperCase().startsWith("NO.")) {
    return rawValue.toUpperCase();
  }

  const onlyNumber = rawValue.replace(/[^\d]/g, "");

  if (!onlyNumber) return "NO.---";

  return `NO.${onlyNumber.padStart(3, "0")}`;
}

function SectionHeader({
  title,
  href,
  cta,
  pageLabel,
  prevHref,
  nextHref,
  canPrev,
  canNext,
}: {
  title: string;
  href?: string;
  cta?: string;
  pageLabel?: string;
  prevHref?: string;
  nextHref?: string;
  canPrev?: boolean;
  canNext?: boolean;
}) {
  return (
    <div className="mb-7 flex flex-col gap-5 md:mb-8 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-[28px] font-black uppercase leading-none tracking-[0.22em] text-white md:text-[40px]">
          {title}
        </h2>

        {pageLabel ? (
          <p className="mt-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/32">
            {pageLabel}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {prevHref && nextHref ? (
          <div className="flex items-center gap-2">
            <Link
              href={canPrev ? prevHref : "#"}
              className={`flex h-[42px] w-[42px] items-center justify-center rounded-full border text-[20px] font-black transition ${
                canPrev
                  ? "border-[#ff1493]/55 text-white hover:bg-[#ff1493] hover:text-black"
                  : "pointer-events-none border-white/10 text-white/18"
              }`}
              aria-label="Previous page"
            >
              ‹
            </Link>

            <Link
              href={canNext ? nextHref : "#"}
              className={`flex h-[42px] w-[42px] items-center justify-center rounded-full border text-[20px] font-black transition ${
                canNext
                  ? "border-[#ff1493]/55 text-white hover:bg-[#ff1493] hover:text-black"
                  : "pointer-events-none border-white/10 text-white/18"
              }`}
              aria-label="Next page"
            >
              ›
            </Link>
          </div>
        ) : null}

        {href && cta ? (
          <Link
            href={href}
            className="inline-flex h-[42px] items-center justify-center rounded-full border border-[#ff1493]/55 px-5 text-[10.5px] font-black uppercase tracking-[0.18em] text-white/90 transition hover:bg-[#ff1493] hover:text-black"
          >
            {cta}
          </Link>
        ) : null}
      </div>
    </div>
  );
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

function EmptyProfileCard({
  index,
  label,
}: {
  index: number;
  label: string;
}) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/8 bg-[#0a0a0f]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,20,147,0.20)_0%,rgba(255,20,147,0)_36%),linear-gradient(135deg,#09090d_0%,#180b19_52%,#050507_100%)]" />

        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[12%] top-[20%] h-[110px] w-[110px] rounded-full border border-white/14" />
          <div className="absolute right-[14%] top-[24%] h-[18px] w-[18px] rotate-45 rounded-[2px] bg-[#ff1493]/65" />
          <div className="absolute left-[20%] top-[58%] h-[2px] w-[42%] rounded-full bg-white/30" />
          <div className="absolute left-[20%] top-[65%] h-[2px] w-[28%] rounded-full bg-white/16" />
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

      <div className="border-t border-white/8 p-5">
        <p className="text-[20px] font-black uppercase leading-none tracking-[0.08em] text-white/24">
          NONE
        </p>

        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff1493]/36">
          {label}
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

function ProducerCard({ producer }: { producer: Producer }) {
  const image =
    producer.profile_image_url ||
    producer.cover_image_url ||
    "/source/producers-hero.png";

  return (
    <Link
      href={`/producers/${producer.slug || producer.id}`}
      className="group overflow-hidden rounded-[20px] border border-white/8 bg-[#0a0a0f] transition duration-300 hover:-translate-y-1 hover:border-[#ff1493]/60 hover:shadow-[0_16px_40px_rgba(255,20,147,0.16)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#111118]">
        <img
          src={image}
          alt={producer.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/24 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/82 backdrop-blur-sm">
          {producer.role || "Producer"}
        </div>

        <div className="absolute right-4 top-4 rounded-full border border-[#ff1493]/40 bg-black/35 px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#ff1493] backdrop-blur-sm">
          {formatProducerNumber(producer.producer_number)}
        </div>
      </div>

      <div className="border-t border-white/8 p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff1493]">
          {formatProducerNumber(producer.producer_number)}
        </p>

        <p className="mt-2 text-[22px] font-black uppercase leading-none tracking-[0.04em] text-white">
          {producer.name}
        </p>

        {producer.japanese_name ? (
          <p className="mt-2 text-[12px] font-black text-[#ff1493]">
            {producer.japanese_name}
          </p>
        ) : null}

        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">
          {producer.meaning || producer.role || "Producer"}
        </p>
      </div>
    </Link>
  );
}

function DirectorCard({ director }: { director: Director }) {
  const image =
    director.profile_image_url ||
    director.cover_image_url ||
    "/source/directors-hero.png";

  return (
    <Link
      href={`/directors/${director.slug || director.id}`}
      className="group overflow-hidden rounded-[20px] border border-white/8 bg-[#0a0a0f] transition duration-300 hover:-translate-y-1 hover:border-[#ff1493]/60 hover:shadow-[0_16px_40px_rgba(255,20,147,0.16)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#111118]">
        <img
          src={image}
          alt={director.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/24 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/82 backdrop-blur-sm">
          {director.position || director.role || "Director"}
        </div>
      </div>

      <div className="border-t border-white/8 p-5">
        <p className="text-[22px] font-black uppercase leading-none tracking-[0.04em] text-white">
          {director.name}
        </p>

        {director.japanese_name ? (
          <p className="mt-2 text-[12px] font-black text-[#ff1493]">
            {director.japanese_name}
          </p>
        ) : null}

        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">
          {director.position || director.role || "Visual Director"}
        </p>
      </div>
    </Link>
  );
}

async function getHomeData() {
  noStore();

  const [albumsResult, producersResult, directorsResult] = await Promise.all([
    supabaseAdmin
      .from("albums")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false }),

    supabaseAdmin
      .from("producers")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false }),

    supabaseAdmin
      .from("directors")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false }),
  ]);

  return {
    albums: ((albumsResult.data || []) as Album[]) || [],
    producers: ((producersResult.data || []) as Producer[]) || [],
    directors: ((directorsResult.data || []) as Director[]) || [],
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const { albums, producers, directors } = await getHomeData();

  const albumPages = chunkArray(albums, ALBUMS_PER_PAGE);
  const producerPages = chunkArray(producers, PROFILES_PER_PAGE);
  const directorPages = chunkArray(directors, PROFILES_PER_PAGE);

  const albumPage = clampPage(toPage(params.albumPage), albumPages.length);
  const producerPage = clampPage(
    toPage(params.producerPage),
    producerPages.length
  );
  const directorPage = clampPage(
    toPage(params.directorPage),
    directorPages.length
  );

  const currentAlbums = [...albumPages[albumPage - 1]];
  const currentProducers = [...producerPages[producerPage - 1]];
  const currentDirectors = [...directorPages[directorPage - 1]];

  while (currentAlbums.length < ALBUMS_PER_PAGE) {
    currentAlbums.push(null as unknown as Album);
  }

  while (currentProducers.length < PROFILES_PER_PAGE) {
    currentProducers.push(null as unknown as Producer);
  }

  while (currentDirectors.length < PROFILES_PER_PAGE) {
    currentDirectors.push(null as unknown as Director);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-t border-[#ff1493]/50 pt-[76px]">
        <div className="absolute inset-0">
          <img
            src="/source/home-hero.png"
            alt="NONEP"
            className="h-full w-full object-cover object-[70%_44%]"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.62)_45%,rgba(0,0,0,0.26)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.38)_58%,rgba(0,0,0,1)_100%)]" />

        <div className="relative mx-auto flex min-h-[500px] max-w-[1280px] items-end px-6 py-16 md:px-8 md:py-20">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-[#ff1493]">
              Produce by You, Directed by NONEP
            </p>

            <h1 className="max-w-[900px] text-[52px] font-black uppercase leading-[0.95] tracking-[0.08em] text-white md:text-[92px]">
              NONEP
              <br />
              VOCALOID P Label
            </h1>

            <p className="mt-7 max-w-[640px] text-[15px] font-semibold leading-[1.9] text-white/62 md:text-[16px]">
              Vocaloid, producer, director, and release archive connected from
              the NONEP admin database.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-8 md:py-16">
        <SectionHeader
          title="Albums"
          href="/albums"
          cta="View All Albums"
          pageLabel={`Page ${albumPage} / ${albumPages.length}`}
          canPrev={albumPage > 1}
          canNext={albumPage < albumPages.length}
          prevHref={createPageHref({
            albumPage: albumPage - 1,
            producerPage,
            directorPage,
          })}
          nextHref={createPageHref({
            albumPage: albumPage + 1,
            producerPage,
            directorPage,
          })}
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {currentAlbums.map((album, index) =>
            album ? (
              <AlbumCard key={album.id} album={album} />
            ) : (
              <EmptyAlbumCard key={`empty-album-${index}`} index={index} />
            )
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-14 md:px-8 md:pb-16">
        <SectionHeader
          title="Producers"
          href="/producers"
          cta="View All Producers"
          pageLabel={`Page ${producerPage} / ${producerPages.length}`}
          canPrev={producerPage > 1}
          canNext={producerPage < producerPages.length}
          prevHref={createPageHref({
            albumPage,
            producerPage: producerPage - 1,
            directorPage,
          })}
          nextHref={createPageHref({
            albumPage,
            producerPage: producerPage + 1,
            directorPage,
          })}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {currentProducers.map((producer, index) =>
            producer ? (
              <ProducerCard key={producer.id} producer={producer} />
            ) : (
              <EmptyProfileCard
                key={`empty-producer-${index}`}
                index={index}
                label="Producer Slot"
              />
            )
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-20 md:px-8 md:pb-24">
        <SectionHeader
          title="Directors"
          href="/directors"
          cta="View All Directors"
          pageLabel={`Page ${directorPage} / ${directorPages.length}`}
          canPrev={directorPage > 1}
          canNext={directorPage < directorPages.length}
          prevHref={createPageHref({
            albumPage,
            producerPage,
            directorPage: directorPage - 1,
          })}
          nextHref={createPageHref({
            albumPage,
            producerPage,
            directorPage: directorPage + 1,
          })}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {currentDirectors.map((director, index) =>
            director ? (
              <DirectorCard key={director.id} director={director} />
            ) : (
              <EmptyProfileCard
                key={`empty-director-${index}`}
                index={index}
                label="Director Slot"
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}