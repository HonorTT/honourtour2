import Link from "@/components/common/SiteLink";
import { ArrowRight, Plane } from "lucide-react";

const gradients = [
  "from-[#0B3B63] via-[#4DA8DA] to-[#A9D8F0]",
  "from-[#082C4B] via-[#0F4C81] to-[#17BEBB]",
  "from-[#4DA8DA] via-[#0B3B63] to-[#17BEBB]",
  "from-[#0B3B63] via-[#0F9AA8] to-[#A9D8F0]",
];

export default function PopularFlightRoutes({ routes }) {
  return (
    <section className="px-3 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="text-center">
          <h2 className="text-[26px] font-bold text-[#0F172A] sm:text-[30px]">
            Discover the Most Popular Flight Routes
          </h2>
          <p className="mx-auto mt-2 max-w-[620px] text-[13px] text-[#60646C]">
            Choose from popular domestic flight routes booked frequently by
            our travellers, and check indicative fares in a couple of clicks.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {routes.map((route, index) => (
            <Link
              key={route.slug}
              href={`/flights/${route.slug}`}
              className="group block min-w-0 overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white no-underline shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
            >
              <div
                className={`relative flex h-[90px] items-center justify-center bg-gradient-to-br sm:h-[110px] ${gradients[index % gradients.length]}`}
              >
                <Plane className="h-7 w-7 text-white/80 sm:h-8 sm:w-8" />
              </div>

              <div className="p-2.5 sm:p-3">
                <p className="truncate text-[13px] font-semibold leading-tight text-[#0F172A] group-hover:text-[#0F4C81]">
                  {route.from} to {route.to}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[12px] font-medium text-[#6B7280]">
                  {route.fromCode}-{route.toCode}
                  <ArrowRight size={11} className="opacity-60" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
