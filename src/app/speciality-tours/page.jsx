import Link from "@/components/common/SiteLink";
import { Sparkles } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SPECIALTY_FEATURED, SPECIALTY_MORE } from "@/data/specialityTours";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Speciality Tours | Women's, Seniors', Honeymoon & Adventure Tours",
  description:
    "Explore Honor Tour & Travels's speciality tour categories — Women's Special, Seniors' Special, Honeymoon, Family, Adventure and more.",
  path: "/speciality-tours",
});

const gradients = [
  "from-[#0B3B63] via-[#4DA8DA] to-[#17BEBB]",
  "from-[#5B2A86] via-[#8B5FBF] to-[#A9D8F0]",
  "from-[#082C4B] via-[#0F4C81] to-[#17BEBB]",
  "from-[#4DA8DA] via-[#0B3B63] to-[#17BEBB]",
];

function CategoryCard({ name, href, index }) {
  return (
    <Link
      href={href}
      className={`group relative flex h-[110px] items-center justify-center overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-gradient-to-br px-4 text-center no-underline shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] ${gradients[index % gradients.length]}`}
    >
      <span className="text-[15px] font-bold text-white">{name}</span>
    </Link>
  );
}

export default function SpecialityToursIndexPage() {
  const allCategories = [...SPECIALTY_FEATURED, ...SPECIALTY_MORE];

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Speciality Tours", href: "/speciality-tours" },
        ])}
      />
      <Navbar />

      <main className="bg-white">
        <section
          className="relative overflow-hidden px-3 py-14 sm:px-6 lg:px-8"
          style={{ background: "linear-gradient(135deg, #0B3B63, #4DA8DA)" }}
        >
          <Sparkles className="pointer-events-none absolute right-6 top-8 h-24 w-24 text-white/10 sm:h-32 sm:w-32" />
          <div className="relative mx-auto w-full max-w-[1280px] text-center text-white">
            <h1 className="text-[30px] font-bold sm:text-[38px]">Speciality Tours</h1>
            <p className="mx-auto mt-2 max-w-[560px] text-[15px] text-white/80">
              Holidays curated around your travel style — from Women&apos;s Special and Honeymoon
              tours to Adventure treks and Weekend getaways.
            </p>
          </div>
        </section>

        <section className="px-3 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {allCategories.map((category, index) => (
                <CategoryCard key={category.href} {...category} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
