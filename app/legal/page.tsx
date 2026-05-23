export const metadata = {
  title: "Legal Notice | NONEP",
  description: "Legal Notice for the NONEP website.",
};

const sections = [
  {
    title: "1. Website Operator",
    body: [
      "This website is operated as the official website for NONEP, a creative music and visual label platform presenting albums, producers, directors, releases, credits, visual works, and related creative projects.",
      "The website may include information related to NONEP, Animal Lounge, FirstClass, affiliated artists, producers, directors, collaborators, and related creative works.",
    ],
  },
  {
    title: "2. Business Information",
    body: [
      "Operator: NONEP / Animal Lounge / FirstClass",
      "CEO: Minyoung Lee",
      "Business Registration No.: 570-22-01285",
      "Business Inquiry: contact@animallounge.co.kr",
      "Address: 105-7 Magokjungang-ro, Gangseo-gu, Seoul, Republic of Korea, K-Square Tower 1, 2F, Room 202",
    ],
  },
  {
    title: "3. Purpose of the Website",
    body: [
      "The NONEP website is provided for promotional, informational, archival, and communication purposes.",
      "The website may display albums, release information, artwork, producer profiles, director profiles, project descriptions, credits, YouTube view information, external platform links, and related creative materials.",
      "The information provided on this website does not constitute a legally binding offer, contract, partnership, employment relationship, management agreement, distribution agreement, publishing agreement, or production agreement unless separately confirmed in a written agreement.",
    ],
  },
  {
    title: "4. Intellectual Property Rights",
    body: [
      "All content displayed on this website, including but not limited to logos, names, text, graphics, illustrations, images, album artwork, music-related materials, layouts, videos, visual assets, UI designs, and source content, is protected by intellectual property laws.",
      "Unless otherwise stated, the rights to the website content belong to NONEP, Animal Lounge, FirstClass, affiliated creators, artists, producers, directors, licensors, or other respective rights holders.",
      "Unauthorized reproduction, distribution, public transmission, modification, commercial use, scraping, data extraction, or secondary use of any website content is prohibited without prior written permission from the relevant rights holder.",
    ],
  },
  {
    title: "5. Music, Video, and Creative Works",
    body: [
      "Music, videos, lyrics, compositions, arrangements, sound recordings, artwork, visual designs, character assets, and other creative works shown or linked on this website may be owned by their respective creators, labels, distributors, publishers, or rights holders.",
      "Any use of such creative works outside the normal viewing of this website may require separate permission from the applicable rights holder.",
      "Credits, roles, release information, and related metadata are provided for informational purposes and may be updated, corrected, removed, or reorganized at any time.",
    ],
  },
  {
    title: "6. External Links",
    body: [
      "This website may contain links to third-party websites or platforms, including but not limited to YouTube, music streaming platforms, social media platforms, distribution platforms, and external portfolio or promotional pages.",
      "NONEP does not control and is not responsible for the content, security, accuracy, availability, privacy practices, or policies of third-party websites.",
      "Use of third-party websites or services is subject to the terms and policies of those respective platforms.",
    ],
  },
  {
    title: "7. YouTube and Platform Data",
    body: [
      "Some pages may display YouTube-related data, such as publicly available video links, view counts, or other metadata obtained through API integration or manual entry.",
      "Such information may not always reflect real-time data and may be delayed, cached, unavailable, or changed according to the policies and technical conditions of the relevant platform.",
      "NONEP is not responsible for errors, interruptions, limitations, or changes caused by external platforms or third-party services.",
    ],
  },
  {
    title: "8. Submitted Materials",
    body: [
      "Users may submit inquiries, demos, files, proposals, messages, or other materials through the contact form or other communication channels.",
      "By submitting materials, the sender confirms that they have the necessary rights, permissions, and authority to submit such materials and that the submission does not infringe any third-party rights.",
      "Submission of materials does not obligate NONEP to review, respond, accept, return, store, protect, use, or compensate the submitted materials unless a separate written agreement is made.",
      "NONEP may delete, ignore, or decline any submission at its discretion.",
    ],
  },
  {
    title: "9. No Warranty",
    body: [
      "The website is provided on an as-is and as-available basis.",
      "NONEP makes reasonable efforts to provide accurate and stable information but does not guarantee that the website will always be uninterrupted, error-free, secure, complete, current, or free from technical issues.",
      "Website content may be modified, removed, suspended, or discontinued without prior notice.",
    ],
  },
  {
    title: "10. Limitation of Liability",
    body: [
      "To the maximum extent permitted by applicable law, NONEP shall not be liable for any damages arising from or related to the use of, inability to use, or reliance on this website.",
      "This includes damages related to inaccurate information, unavailable pages, broken links, third-party platform issues, data errors, submitted materials, technical failures, unauthorized access, or service interruptions.",
    ],
  },
  {
    title: "11. Prohibited Use",
    body: [
      "Users may not use this website for unlawful, harmful, abusive, defamatory, infringing, fraudulent, misleading, or disruptive purposes.",
      "Users may not attempt to gain unauthorized access to administrator pages, servers, databases, storage systems, APIs, internal tools, or other restricted areas.",
      "Automated scraping, mass data extraction, reverse engineering, security testing without permission, spam submission, or interference with website operation is prohibited.",
    ],
  },
  {
    title: "12. Privacy and Personal Information",
    body: [
      "The handling of personal information collected through this website is governed by the Privacy Policy.",
      "Users who submit information through the contact form or other communication channels should review the Privacy Policy before submitting personal information or materials.",
    ],
  },
  {
    title: "13. Changes to This Legal Notice",
    body: [
      "NONEP may update or modify this Legal Notice at any time.",
      "Changes become effective when posted on this page. Continued use of the website after changes are posted constitutes acknowledgment of the updated Legal Notice.",
    ],
  },
  {
    title: "14. Governing Law",
    body: [
      "This Legal Notice shall be governed by and interpreted in accordance with the laws of the Republic of Korea, unless otherwise required by applicable law.",
      "Any disputes related to this website, its content, or this Legal Notice shall be handled by the competent courts of the Republic of Korea.",
    ],
  },
  {
    title: "15. Contact",
    body: [
      "For questions regarding this Legal Notice, intellectual property rights, website content, or business inquiries, please contact NONEP through the official contact information below.",
      "Business Inquiry: contact@animallounge.co.kr",
    ],
  },
];

export default function LegalPage() {
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

            <h1 className="text-[44px] font-black uppercase leading-none tracking-[0.1em] text-white md:text-[78px]">
              Legal Notice
            </h1>

            <p className="mt-6 max-w-[760px] text-[15px] font-semibold leading-[1.9] text-white/58">
              This Legal Notice provides information regarding the operator,
              ownership, permitted use, intellectual property, external links,
              submitted materials, and liability related to the NONEP website.
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
              This page serves as the official Legal Notice for the NONEP
              website. It should be read together with the Terms of Use and
              Privacy Policy.
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
            Legal Information
          </p>

          <p className="mt-4 text-[14px] font-semibold leading-[1.9] text-white/54">
            This Legal Notice applies to the NONEP website and related online
            pages operated for creative, promotional, archival, and inquiry
            purposes. Additional contractual terms may apply separately to
            artists, producers, directors, clients, collaborators, or business
            partners.
          </p>
        </div>
      </section>
    </main>
  );
}