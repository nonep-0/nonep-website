import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type DirectorDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Director = {
  id: string;
  slug: string;
  name: string;
  japanese_name: string | null;
  role: string | null;
  position: string | null;
  meaning: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  description: string | null;
  signature: string | null;
  display_order: number | null;
  is_published: boolean | null;
};

type Album = {
  id: string;
  slug: string | null;
  title: string;
  subtitle: string | null;
  thumbnail_url: string | null;
  cover_image_url: string | null;
  release_label: string | null;
  release_date: string | null;
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

function RelatedAlbumCard({ album }: { album: Album }) {
  const image =
    album.thumbnail_url ||
    album.cover_image_url ||
    "/source/albums-hero.png";

  return (
    <Link
      href={`/albums/${album.slug || album.id}`}
      className="group overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#ff1493]/60 hover:shadow-[0_0_32px_rgba(255,20,147,0.18)]"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={album.title}
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-4">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff1493]">
          {album.subtitle || "Release"}
        </p>

        <h3 className="mt-2 text-[20px] font-black uppercase tracking-[-0.04em] text-white">
          {album.title}
        </h3>

        <p className="mt-2 text-[12px] font-semibold text-white/48">
          {album.release_label || album.release_date || ""}
        </p>
      </div>
    </Link>
  );
}

export default async function DirectorDetailPage({
  params,
}: DirectorDetailPageProps) {
  noStore();

  const { id } = await params;

  const query = supabaseAdmin.from("directors").select("*");

  const { data: director, error } = isUuid(id)
    ? await query.eq("id", id).maybeSingle()
    : await query.eq("slug", id).maybeSingle();

  if (error) {
    return (
      <main className="min-h-screen bg-black px-8 py-32 text-white">
        <div className="mx-auto max-w-[900px] rounded-[24px] border border-red-500/40 bg-red-500/10 p-8">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-red-300">
            Director Detail Error
          </p>

          <h1 className="mt-4 text-[42px] font-black text-white">
            Supabase Query Error
          </h1>

          <p className="mt-6 text-[16px] font-semibold text-red-200">
            {error.message}
          </p>

          <p className="mt-6 text-[14px] font-semibold text-white/60">
            요청한 주소값: {id}
          </p>

          <Link
            href="/directors"
            className="mt-8 inline-flex rounded-full border border-[#ff1493]/60 px-5 py-3 text-[12px] font-black uppercase tracking-[0.18em] text-white"
          >
            Back to Directors
          </Link>
        </div>
      </main>
    );
  }

  if (!director) {
    return (
      <main className="min-h-screen bg-black px-8 py-32 text-white">
        <div className="mx-auto max-w-[900px] rounded-[24px] border border-[#ff1493]/40 bg-[#ff1493]/10 p-8">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-[#ff1493]">
            Director Not Found
          </p>

          <h1 className="mt-4 text-[42px] font-black text-white">
            디렉터를 찾지 못했습니다
          </h1>

          <p className="mt-6 text-[16px] font-semibold text-white/62">
            현재 주소에서 찾으려는 slug 또는 id:
          </p>

          <p className="mt-3 rounded-[14px] border border-white/10 bg-black px-4 py-3 text-[16px] font-black text-[#ff1493]">
            {id}
          </p>

          <Link
            href="/directors"
            className="mt-8 inline-flex rounded-full border border-[#ff1493]/60 px-5 py-3 text-[12px] font-black uppercase tracking-[0.18em] text-white"
          >
            Back to Directors
          </Link>
        </div>
      </main>
    );
  }

  const currentDirector = director as Director;

  const profileImage =
    currentDirector.profile_image_url ||
    currentDirector.cover_image_url ||
    "/source/directors-hero.png";

  const heroImage =
    currentDirector.cover_image_url ||
    currentDirector.profile_image_url ||
    "/source/directors-hero.png";

  const { data: directorAlbums } = await supabaseAdmin
    .from("albums")
    .select(
      "id, slug, title, subtitle, thumbnail_url, cover_image_url, release_label, release_date"
    )
    .eq("director_id", currentDirector.id)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  const albums = (directorAlbums || []) as Album[];

  const directorRole =
    currentDirector.position || currentDirector.role || "Visual Director";

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-t border-[#ff1493]/50 pt-[76px]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={currentDirector.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.64)_48%,rgba(0,0,0,0.3)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.45)_58%,rgba(0,0,0,1)_100%)]" />

        <div className="relative mx-auto flex min-h-[360px] max-w-[1280px] items-end px-6 py-16 md:min-h-[430px] md:px-8 md:py-20">
          <div>
            <p className="mb-4 text-[12px] font-black uppercase tracking-[0.34em] text-[#ff1493]">
              NONEP Visual Team
            </p>

            <h1 className="text-[52px] font-black uppercase leading-none tracking-[0.1em] text-white md:text-[86px]">
              {currentDirector.name}
            </h1>

            {currentDirector.japanese_name ? (
              <p className="mt-5 text-[22px] font-black text-[#ff1493]">
                {currentDirector.japanese_name}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
        <Link
          href="/directors"
          className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white/58 transition hover:text-[#ff1493]"
        >
          <span>←</span>
          <span>Back to Directors</span>
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[480px_1fr]">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#08080c] shadow-[0_0_42px_rgba(255,20,147,0.12)]">
            <div className="relative bg-white">
              <img
                src={profileImage}
                alt={currentDirector.name}
                className="block h-auto w-full object-contain"
              />

              <div className="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black">
                {directorRole}
              </div>
            </div>

            <div className="border-t border-white/10 bg-[#08080c] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#ff1493]">
                {currentDirector.meaning || directorRole}
              </p>

              <h2 className="mt-3 text-[38px] font-black uppercase leading-none tracking-[0.08em] text-white">
                {currentDirector.name}
              </h2>

              {currentDirector.japanese_name ? (
                <p className="mt-3 text-[14px] font-black text-white/72">
                  {currentDirector.japanese_name}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.32em] text-[#ff1493]">
              Director
            </p>

            <h2 className="mt-4 text-[52px] font-black uppercase leading-none tracking-[0.04em] text-white md:text-[74px]">
              {currentDirector.name}
            </h2>

            {currentDirector.japanese_name ? (
              <p className="mt-4 text-[20px] font-black text-[#ff1493]">
                {currentDirector.japanese_name}
              </p>
            ) : null}

            <p className="mt-8 max-w-[720px] text-[15px] font-semibold leading-[1.9] text-white/62">
              {currentDirector.description ||
                `${currentDirector.name} is a NONEP director.`}
            </p>

            {currentDirector.signature ? (
              <div className="mt-9 rounded-[24px] border border-white/10 bg-white/[0.03] p-7">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#ff1493]">
                  Signature
                </p>

                <p className="mt-4 text-[28px] font-black leading-[1.3] tracking-[-0.04em] text-white md:text-[34px]">
                  {currentDirector.signature}
                </p>
              </div>
            ) : null}

            <div className="mt-9 grid max-w-[520px] gap-y-5">
              <div className="grid grid-cols-[120px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">Role</p>
                <p className="text-[15px] font-bold text-white">
                  {directorRole}
                </p>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">
                  Meaning
                </p>
                <p className="text-[15px] font-bold text-white">
                  {currentDirector.meaning || "-"}
                </p>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">Works</p>
                <p className="text-[15px] font-bold text-white">
                  {albums.length} releases
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 border-t border-white/8 pt-14">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-[12px] font-black uppercase tracking-[0.28em] text-[#ff1493]">
                Works
              </p>

              <h2 className="mt-3 text-[34px] font-black uppercase tracking-[0.14em] text-white md:text-[40px]">
                Related Albums
              </h2>
            </div>

            <Link
              href="/albums"
              className="hidden rounded-full border border-[#ff1493]/70 px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white transition hover:bg-[#ff1493] hover:text-black md:inline-flex"
            >
              View All Albums
            </Link>
          </div>

          {albums.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {albums.map((album) => (
                <RelatedAlbumCard key={album.id} album={album} />
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-[#ff1493]/24 bg-white/[0.02] px-6 py-10">
              <p className="text-[24px] font-black uppercase tracking-[0.12em] text-white">
                No Albums Registered Yet
              </p>

              <p className="mt-4 max-w-[520px] text-[14px] font-semibold leading-[1.8] text-white/48">
                Albums connected to this director will appear here automatically
                once they are registered.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}