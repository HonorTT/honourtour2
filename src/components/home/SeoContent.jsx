import { ChevronDown } from "lucide-react";
import { HOME_DEFAULTS } from "@/data/homeDefaults";

// Admin: Home Page -> Text & Photos -> About text. An empty line starts a new paragraph.
export default function SeoContent({ settings = HOME_DEFAULTS }) {
  const paragraphs = String(settings.seoText)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section className="px-3 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-[24px] font-bold leading-tight text-[#0F172A] sm:text-[30px]">{settings.seoHeading}</h2>

        <div className="mt-6 space-y-4 text-[13px] leading-[1.8] text-[#4B5563]">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <button className="mt-6 flex items-center gap-2 text-[13px] font-semibold text-[#0F4C81]">
          Read More
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
