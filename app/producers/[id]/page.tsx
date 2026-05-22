import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProducerDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

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
  description: string | null;
  signature: string | null;
  display_order: number | null;
  is_published: boolean | null;
};

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

export default async function ProducerDetailPage({
  params,
}: ProducerDetailPageProps) {
  noStore();

  const { id } = await params;

  const isUuid =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );

const query = supabaseAdmin.from("producers").select("*");

const { data: producer, error } = isUuid
  ? await query.eq("id", id).maybeSingle()
  : await query.eq("slug", id).maybeSingle();

  if (error) {
    return (
      <main className="min-h-screen bg-black px-8 py-32 text-white">
        <div className="mx-auto max-w-[900px] rounded-[24px] border border-red-500/40 bg-red-500/10 p-8">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-red-300">
            Producer Detail Error
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
            href="/producers"
            className="mt-8 inline-flex rounded-full border border-[#ff1493]/60 px-5 py-3 text-[12px] font-black uppercase tracking-[0.18em] text-white"
          >
            Back to Producers
          </Link>
        </div>
      </main>
    );
  }

  if (!producer) {
    return (
      <main className="min-h-screen bg-black px-8 py-32 text-white">
        <div className="mx-auto max-w-[900px] rounded-[24px] border border-[#ff1493]/40 bg-[#ff1493]/10 p-8">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-[#ff1493]">
            Producer Not Found
          </p>

          <h1 className="mt-4 text-[42px] font-black text-white">
            프로듀서를 찾지 못했습니다
          </h1>

          <p className="mt-6 text-[16px] font-semibold text-white/62">
            현재 주소에서 찾으려는 slug 또는 id:
          </p>

          <p className="mt-3 rounded-[14px] border border-white/10 bg-black px-4 py-3 text-[16px] font-black text-[#ff1493]">
            {id}
          </p>

          <p className="mt-6 text-[14px] font-semibold leading-[1.8] text-white/48">
            Supabase producers 테이블에서 slug 값이 정확히{" "}
            <span className="text-white">akayuki</span>인지 확인해줘.
            <br />
            예를 들어 slug가 <span className="text-white">aka yuki</span>로
            저장되어 있으면 현재 주소와 매칭되지 않아.
          </p>

          <Link
            href="/producers"
            className="mt-8 inline-flex rounded-full border border-[#ff1493]/60 px-5 py-3 text-[12px] font-black uppercase tracking-[0.18em] text-white"
          >
            Back to Producers
          </Link>
        </div>
      </main>
    );
  }

  const currentProducer = producer as Producer;

  const profileImage =
    currentProducer.profile_image_url ||
    currentProducer.cover_image_url ||
    "/source/producers-hero.png";

  const heroImage =
    currentProducer.cover_image_url ||
    currentProducer.profile_image_url ||
    "/source/producers-hero.png";

  const producerNumber = formatProducerNumber(
    currentProducer.producer_number
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-t border-[#ff1493]/50 pt-[76px]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={currentProducer.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.64)_48%,rgba(0,0,0,0.3)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.45)_58%,rgba(0,0,0,1)_100%)]" />

        <div className="relative mx-auto flex min-h-[360px] max-w-[1280px] items-end px-6 py-16 md:min-h-[430px] md:px-8 md:py-20">
          <div>
            <p className="mb-4 text-[12px] font-black uppercase tracking-[0.34em] text-[#ff1493]">
              {producerNumber}
            </p>

            <h1 className="text-[52px] font-black uppercase leading-none tracking-[0.1em] text-white md:text-[86px]">
              {currentProducer.name}
            </h1>

            {currentProducer.japanese_name ? (
              <p className="mt-5 text-[22px] font-black text-[#ff1493]">
                {currentProducer.japanese_name}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
        <Link
          href="/producers"
          className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white/58 transition hover:text-[#ff1493]"
        >
          <span>←</span>
          <span>Back to Producers</span>
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[480px_1fr]">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#08080c] shadow-[0_0_42px_rgba(255,20,147,0.12)]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={profileImage}
                alt={currentProducer.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black">
                {currentProducer.role || "Producer"}
              </div>

              <div className="absolute right-5 top-5 rounded-full border border-[#ff1493]/40 bg-[#ff1493]/12 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#ff1493] backdrop-blur">
                {producerNumber}
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/76 to-transparent p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#ff1493]">
                  {currentProducer.meaning || currentProducer.role || "Producer"}
                </p>

                <h2 className="mt-3 text-[38px] font-black uppercase leading-none tracking-[0.08em] text-white">
                  {currentProducer.name}
                </h2>

                {currentProducer.japanese_name ? (
                  <p className="mt-3 text-[14px] font-black text-white/72">
                    {currentProducer.japanese_name}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.32em] text-[#ff1493]">
              {producerNumber}
            </p>

            <h2 className="mt-4 text-[52px] font-black uppercase leading-none tracking-[0.04em] text-white md:text-[74px]">
              {currentProducer.name}
            </h2>

            {currentProducer.japanese_name ? (
              <p className="mt-4 text-[20px] font-black text-[#ff1493]">
                {currentProducer.japanese_name}
              </p>
            ) : null}

            <p className="mt-8 max-w-[720px] text-[15px] font-semibold leading-[1.9] text-white/62">
              {currentProducer.description ||
                `${currentProducer.name} is a NONEP producer.`}
            </p>

            {currentProducer.signature ? (
              <div className="mt-9 rounded-[24px] border border-white/10 bg-white/[0.03] p-7">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#ff1493]">
                  Signature
                </p>

                <p className="mt-4 text-[28px] font-black leading-[1.3] tracking-[-0.04em] text-white md:text-[34px]">
                  {currentProducer.signature}
                </p>
              </div>
            ) : null}

            <div className="mt-9 grid max-w-[520px] gap-y-5">
              <div className="grid grid-cols-[120px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">Number</p>
                <p className="text-[15px] font-bold text-white">
                  {producerNumber}
                </p>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">Role</p>
                <p className="text-[15px] font-bold text-white">
                  {currentProducer.role || "Producer"}
                </p>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">Meaning</p>
                <p className="text-[15px] font-bold text-white">
                  {currentProducer.meaning || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 border-t border-white/8 pt-14">
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-[#ff1493]">
            Works
          </p>

          <h2 className="mt-3 text-[34px] font-black uppercase tracking-[0.14em] text-white md:text-[40px]">
            Related Albums
          </h2>

          <div className="mt-8 rounded-[24px] border border-dashed border-[#ff1493]/24 bg-white/[0.02] px-6 py-10">
            <p className="text-[24px] font-black uppercase tracking-[0.12em] text-white">
              No Albums Registered Yet
            </p>

            <p className="mt-4 max-w-[520px] text-[14px] font-semibold leading-[1.8] text-white/48">
              Albums connected to this producer will appear here automatically
              once they are registered.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}