export const metadata = {
  title: "Terms of Use | NONEP",
  description: "Terms of Use for the NONEP website.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using the NONEP website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please discontinue use of the website.",
      "These Terms apply to all visitors, users, artists, creators, collaborators, and any other parties who access the website.",
    ],
  },
  {
    title: "2. About NONEP",
    body: [
      "NONEP is a creative music and visual label platform operated for the purpose of presenting artists, producers, directors, albums, releases, credits, visual works, and related creative content.",
      "The website may include information about music releases, producer profiles, director profiles, project archives, promotional materials, contact forms, and related media.",
    ],
  },
  {
    title: "3. Use of the Website",
    body: [
      "You may use this website for personal, informational, promotional, and inquiry purposes only.",
      "You agree not to misuse the website, interfere with its normal operation, attempt unauthorized access to restricted areas, or use the website for unlawful, harmful, misleading, or abusive purposes.",
      "You may not copy, scrape, reproduce, redistribute, sell, modify, or exploit any part of the website or its content without prior written permission from NONEP or the relevant rights holder.",
    ],
  },
  {
    title: "4. Intellectual Property",
    body: [
      "All content displayed on this website, including but not limited to names, logos, images, illustrations, music-related materials, album artwork, videos, text, layouts, designs, graphics, and visual assets, is protected by intellectual property laws.",
      "Unless otherwise stated, all website content is owned by NONEP, Animal Lounge, FirstClass, affiliated creators, artists, producers, directors, or licensed third parties.",
      "No ownership rights are transferred to users by accessing or using this website.",
    ],
  },
  {
    title: "5. Music, Album, Producer, and Director Information",
    body: [
      "Information displayed on album, producer, and director pages is provided for promotional and archival purposes.",
      "NONEP may update, edit, remove, or reorganize release information, credits, descriptions, images, links, statistics, and profile details at any time without prior notice.",
      "Streaming numbers, YouTube views, release dates, external links, credits, and other metadata may be updated automatically or manually and may not always reflect real-time data.",
    ],
  },
  {
    title: "6. External Links and Third-Party Services",
    body: [
      "This website may contain links to third-party platforms, including but not limited to YouTube, music streaming services, social media platforms, distribution platforms, and external websites.",
      "NONEP is not responsible for the content, policies, availability, accuracy, or practices of third-party services.",
      "Use of third-party services is subject to the terms and policies of those respective platforms.",
    ],
  },
  {
    title: "7. Contact Form and Submitted Materials",
    body: [
      "Users may submit inquiries, demos, files, collaboration proposals, or project-related messages through the contact form.",
      "By submitting materials, you confirm that you have the right to share those materials and that your submission does not infringe upon the rights of any third party.",
      "Submission of materials does not create any employment, agency, partnership, management, distribution, publishing, production, or contractual relationship with NONEP unless a separate written agreement is made.",
      "NONEP is not obligated to review, respond to, accept, store, return, or compensate any submitted materials.",
    ],
  },
  {
    title: "8. Prohibited Conduct",
    body: [
      "You agree not to upload, submit, transmit, or distribute any content that is unlawful, defamatory, threatening, obscene, abusive, discriminatory, infringing, misleading, or harmful.",
      "You may not attempt to reverse engineer, disrupt, overload, damage, or gain unauthorized access to the website, server, database, administrator pages, or related systems.",
      "You may not impersonate another person, organization, artist, producer, director, company, or representative when using the website.",
    ],
  },
  {
    title: "9. Admin and Restricted Areas",
    body: [
      "Certain parts of the website may be restricted to authorized administrators only.",
      "Unauthorized access or attempted access to administrator pages, databases, upload systems, storage areas, or internal management tools is strictly prohibited.",
      "NONEP may monitor, restrict, suspend, or block access to protect the security and integrity of the website.",
    ],
  },
  {
    title: "10. Accuracy and Availability",
    body: [
      "NONEP makes reasonable efforts to keep website information accurate and available, but does not guarantee that all content will always be complete, current, error-free, uninterrupted, or secure.",
      "The website may be modified, suspended, discontinued, updated, or restricted at any time without prior notice.",
    ],
  },
  {
    title: "11. Limitation of Liability",
    body: [
      "To the maximum extent permitted by applicable law, NONEP shall not be liable for any direct, indirect, incidental, consequential, special, punitive, or other damages arising from your use of, inability to use, or reliance on the website.",
      "This includes, but is not limited to, damages related to errors, delays, interruptions, data loss, unauthorized access, third-party links, submitted materials, or external platform issues.",
    ],
  },
  {
    title: "12. Privacy",
    body: [
      "The collection and handling of personal information through the website is governed by the Privacy Policy.",
      "By using the website or submitting information through the contact form, you acknowledge that your information may be processed for inquiry handling, communication, project review, and website operation purposes.",
    ],
  },
  {
    title: "13. Changes to These Terms",
    body: [
      "NONEP may update or modify these Terms of Use at any time.",
      "Changes become effective when posted on this page. Continued use of the website after changes are posted constitutes acceptance of the updated Terms.",
    ],
  },
  {
    title: "14. Governing Law",
    body: [
      "These Terms of Use shall be governed by and interpreted in accordance with the laws of the Republic of Korea, unless otherwise required by applicable law.",
      "Any disputes arising from or related to these Terms or the use of the website shall be handled by the competent courts of the Republic of Korea.",
    ],
  },
  {
    title: "15. Contact",
    body: [
      "For questions regarding these Terms of Use, please contact us through the official contact information provided on the website.",
      "Business Inquiry: contact@animallounge.co.kr",
    ],
  },
];

export default function TermsPage() {
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

            <h1 className="text-[48px] font-black uppercase leading-none tracking-[0.12em] text-white md:text-[82px]">
              Terms of Use
            </h1>

            <p className="mt-6 max-w-[720px] text-[15px] font-semibold leading-[1.9] text-white/58">
              These Terms of Use govern your access to and use of the NONEP
              website, services, content, and related pages.
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
              Please read these Terms carefully before using the NONEP website.
              The website is operated as a creative archive, promotional
              platform, and contact channel for NONEP-related projects.
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
            NONEP
          </p>

          <p className="mt-4 text-[14px] font-semibold leading-[1.9] text-white/54">
            This page is provided as the official Terms of Use for the NONEP
            website. Related policies may be provided separately through the
            Privacy Policy, Legal Notice, or other policy pages.
          </p>
        </div>
      </section>
    </main>
  );
}