import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PRODUCERS_PER_PAGE = 6;

type Producer = {
  id: string;
  slug: string;
  name: string;
  japanese_name: string | null;
  producer_number: string | null;
  role: string | null;
  meaning: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  is_published: boolean | null;
  display_order: number | null;
};

function formatProducerNumber(value?: string | null) {
  if (!value) return "NO.---";

  const onlyNumber = String(value).replace(/[^\d]/g, "");

  if (!onlyNumber) return "NO.---";

  return `NO.${onlyNumber.padStart(3, "0")}`;
}

function EmptyProducerCard({ index }: { index: number }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/8 bg-[#0a0a0f]">
      <div className="relative aspect-[16/10] bg-[linear-gradient(135deg,#120817,#230721,#07070a)]">
        <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/30 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/38">
          Empty
        </div>

        <div className="absolute right-4 top-4 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#ff1493]/24 bg-black/30 text-[9px] font-black text-[#ff1493]/58">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[28px] font-black uppercase tracking-[0.18em] text-white/10">
            NONE
          </p>
        </div>
      </div>

      <div className="border-t border-white/8 bg-[#08080c] p-5">
        <p className="text-[22px] font-black uppercase tracking-[-0.04em] text-white/16">
          NONE
        </p>
        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/18">
          Producer Slot
        </p>
      </div>
    </div>
  );
}

function ProducerCard({ producer }: { producer: Producer }) {
  const image =
    producer.profile_image_url ||
    producer.cover_image_url ||
    "/source/producers-hero.png";

  return (
    <Link
      href={`/producers/${producer.slug}`}
      className="group overflow-hidden rounded-[22px] border border-white/10 bg-[#0a0a0f] transition duration-300 hover:-translate-y-1 hover:border-[#ff1493]/60 hover:shadow-[0_18px_46px_rgba(255,20,147,0.16)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#111118]">
        <img
          src={image}
          alt={producer.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/82 backdrop-blur-sm">
          {producer.role || "Producer"}
        </div>

        <div className="absolute right-4 top-4 rounded-full border border-[#ff1493]/42 bg-black/36 px-3 py-1 text-[9px] font-black text-[#ff1493] backdrop-blur-sm">
          {formatProducerNumber(producer.producer_number)}
        </div>
      </div>

      <div className="border-t border-white/8 bg-[#08080c] p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ff1493]">
          {formatProducerNumber(producer.producer_number)}
        </p>

        <p className="mt-2 text-[24px] font-black uppercase leading-none tracking-[-0.04em] text-white">
          {producer.name}
        </p>

        {producer.japanese_name ? (
          <p className="mt-2 text-[12px] font-black text-[#ff1493]">
            {producer.japanese_name}
          </p>
        ) : null}

        <p className="mt-3 text-[11px] font-black uppercase tracking-[0.18em] text-white/42">
          {producer.meaning || producer.role || "Producer"}
        </p>
      </div>
    </Link>
  );
}

export default async function ProducersPage() {
  noStore();

  const { data } = await supabaseAdmin
    .from("producers")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  const producers = (data || []) as Producer[];
  const currentItems: Array<Producer | null> = [...producers];

  while (currentItems.length < PRODUCERS_PER_PAGE) {
    currentItems.push(null);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-t border-[#ff1493]/50 pt-[76px]">
        <div className="absolute inset-0">
          <img
            src="/source/producers-hero.png"
            alt="NONEP Producers"
            className="h-full w-full object-cover object-[70%_42%]"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.58)_44%,rgba(0,0,0,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.34)_54%,rgba(0,0,0,1)_100%)]" />

        <div className="relative mx-auto flex min-h-[360px] max-w-[1280px] items-end px-6 py-16 md:min-h-[430px] md:px-8 md:py-20">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-[#ff1493]">
              NONEP Creators
            </p>

            <h1 className="text-[52px] font-black uppercase leading-none tracking-[0.16em] text-white md:text-[84px]">
              Producers
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-8 md:py-16">
        <div className="mb-7 flex items-center justify-between gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/34">
            Registered Producers
          </p>

          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/34">
            Page 1 / 1
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {currentItems.slice(0, PRODUCERS_PER_PAGE).map((producer, index) =>
            producer ? (
              <ProducerCard key={producer.id} producer={producer} />
            ) : (
              <EmptyProducerCard
                key={`empty-producer-${index}`}
                index={index}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}