"use client";

import { homeData } from "@/data/homeData";
import FAQAccordion from "@/components/common/FAQAccordion";
import { HOME_DEFAULTS } from "@/data/homeDefaults";

export default function FAQ({ content, settings = HOME_DEFAULTS }) {
  const s = settings;
  const faq = { ...homeData.faq, ...(content ?? {}) };

  return (
    <section className="px-3 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="text-center">
          <h2 className="text-[24px] font-bold leading-tight text-[#0F172A] sm:text-[30px]">
            {s.faqHeading}
          </h2>
          <p className="mt-2 text-[13px] text-[#60646C]">
            {s.faqSubtitle}
          </p>
        </div>

        <div className="mt-10">
          <FAQAccordion items={faq.questions} />
        </div>

        <div className="mt-10 text-center">
          <p className="text-[13px] text-[#2B2B2B]">
            {s.faqCategoriesLabel}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {faq.categories.map((cat) => (
              <button
                key={cat}
                className="rounded-full border border-[#0F4C81] px-4 py-2 text-[12px] font-semibold text-[#0F4C81] transition hover:bg-[#0B3B63] hover:text-white hover:border-[#0B3B63]"
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-[#4B5563]">
            {s.faqFooter}
          </p>
          <button className="mt-4 rounded-full bg-[#FF7A1A] shadow-md shadow-orange-900/20 transition-all duration-200 hover:bg-[#E56A0F] hover:shadow-lg hover:-translate-y-0.5 px-6 py-2 text-[13px] font-bold text-white">
            {s.faqButton}
          </button>
        </div>
      </div>
    </section>
  );
}
