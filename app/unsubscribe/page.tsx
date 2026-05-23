export const metadata = {
  title: "Email Collection Refusal | NONEP",
  description: "Email Collection Refusal notice for the NONEP website.",
};

const sections = [
  {
    title: "1. Prohibition of Unauthorized Email Collection",
    body: [
      "Email addresses posted on the NONEP website must not be collected without permission by using email collection programs, automated tools, bots, scraping methods, or any other technical means.",
      "Any unauthorized collection, storage, distribution, sale, or use of email addresses published on this website is strictly prohibited.",
    ],
  },
  {
    title: "2. Purpose of This Notice",
    body: [
      "This notice is provided to protect the email addresses displayed on the NONEP website from spam, unauthorized commercial messages, phishing attempts, bulk mailing, and other misuse.",
      "Email addresses provided on this website are made available only for legitimate business inquiries, project communication, collaboration proposals, production requests, and official contact purposes.",
    ],
  },
  {
    title: "3. Prohibited Actions",
    body: [
      "Users may not collect email addresses from this website through automated scraping, crawling, data mining, extraction tools, bots, scripts, software, or manual bulk collection.",
      "Users may not use collected email addresses for spam, unauthorized advertisements, promotional messages, phishing, impersonation, malicious contact, or any activity unrelated to legitimate communication with NONEP.",
      "Users may not sell, transfer, disclose, share, or distribute email addresses found on this website to third parties without prior written permission.",
    ],
  },
  {
    title: "4. Legal Responsibility",
    body: [
      "Any person or organization that violates this notice may be subject to restrictions, claims, legal responsibility, or other measures under applicable laws and regulations.",
      "NONEP reserves the right to take appropriate action against unauthorized email collection, misuse of contact information, spam activity, phishing attempts, or any conduct that harms the operation, reputation, or security of the website.",
    ],
  },
  {
    title: "5. Permitted Contact Use",
    body: [
      "You may use the official contact email address or contact form only for legitimate purposes, including business inquiries, demo submissions, collaboration proposals, project requests, production inquiries, or other relevant communication.",
      "Messages that are abusive, misleading, fraudulent, automated, irrelevant, malicious, or promotional without permission may be ignored, blocked, deleted, or reported.",
    ],
  },
  {
    title: "6. Contact",
    body: [
      "For legitimate inquiries, please use the official contact page or the contact information provided on the NONEP website.",
      "Business Inquiry: contact@animallounge.co.kr",
    ],
  },
];

export default function EmailCollectionRefusalPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-t border-[#ff1493]/50 pt-[76px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(255,20,147,0.22),transparent_30%),linear-gradient(180deg,#080008_0%,#000000_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.58)_60%,rgba(0,0,0,1)_100%)]" />

        <div className="relative mx-auto flex min-h-[330px] max-w-[1280px] items-end px-6 py-16 md:min-h-[400px] md:px-8 md:py-20">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-[#ff1493]">
              NONEP Legal
            </p>

            <h1 className="text-[38px] font-black uppercase leading-[1.05] tracking-[0.08em] text-white md:text-[72px]">
              Email Collection Refusal
            </h1>

            <p className="mt-6 max-w-[760px] text-[15px] font-semibold leading-[1.9] text-white/58">
              This notice prohibits the unauthorized collection, storage,
              distribution, sale, or misuse of email addresses displayed on the
              NONEP website.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1040px] px-6 py-14 md:px-8 md:py-16">
        <div className="rounded-[28px] border border-white/10 bg-[#08080c] p-6 shadow-[0_0_42px_rgba(255,20,147,0.08)] md:p-9">
          <div className="border-b border-white/10 pb-8">
            <p className="text-[12px] font-black uppercase tracking-[0.24em] text-[#ff1493]">
              Effective Date
            </p>

            <p className="mt-3 text-[18px] font-bold text-white">
              2026.05.23
            </p>

            <p className="mt-5 max-w-[780px] text-[14px] font-semibold leading-[1.9] text-white/52">
              Email addresses published on this website are provided only for
              legitimate communication with NONEP. Unauthorized collection or
              misuse of these email addresses is prohibited.
            </p>
          </div>

          <div className="mt-10 space-y-11">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-[24px] font-black uppercase leading-[1.2] tracking-[0.04em] text-white md:text-[28px]">
                  {section.title}
                </h2>

                <div className="mt-5 space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[14px] font-semibold leading-[1.9] text-white/58 md:text-[15px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[24px] border border-[#ff1493]/24 bg-[#ff1493]/[0.04] p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#ff1493]">
            Email Protection Notice
          </p>

          <p className="mt-4 text-[14px] font-semibold leading-[1.9] text-white/54">
            NONEP does not permit the unauthorized collection of email addresses
            displayed on this website. Please use the official contact form or
            business inquiry email only for legitimate communication.
          </p>
        </div>
      </section>
    </main>
  );
}