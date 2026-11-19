import { Bed, Utensils, Bus, Users, Map, Plane, Check } from "lucide-react";
import { homeData } from "@/data/homeData";
import { HOME_DEFAULTS } from "@/data/homeDefaults";

/* =========================================================
   WHAT EVERY TOUR INCLUDES
   Cards on a tinted band rather than bare centred text: the
   icon sits in a tinted tile at the top-left with a small
   tick beside it, so each item reads as something you get
   rather than as a paragraph floating on white.
========================================================= */

const iconMap = { Bed, Utensils, Bus, Users, Map, Plane };

export default function TourInclusions({ features, settings = HOME_DEFAULTS }) {
  const tourInclusions = {
    ...homeData.tourInclusions,
    features: features?.length ? features : homeData.tourInclusions.features,
  };

  return (
    <section className="bg-[#F7FAFC] px-3 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto max-w-[620px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E6F7F5] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
            <Check className="h-3.5 w-3.5" />
            {settings.inclusionsBadge}
          </span>

          <h2 className="mt-4 text-[24px] font-bold leading-tight text-[#0F172A] sm:text-[30px]">
            {settings.inclusionsHeading}
          </h2>

          <p className="mt-3 text-[14px] font-light leading-relaxed text-[#60646C]">
            {settings.inclusionsSubtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tourInclusions.features.map((feature) => {
            const Icon = iconMap[feature.icon] || Users;

            return (
              <div
                key={feature.title}
                className="group rounded-[16px] bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#E6F7F5] text-[#0F4C81] transition-colors group-hover:bg-[#17BEBB] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="text-[15px] font-semibold leading-tight text-[#0F172A]">
                    {feature.title}
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-light leading-relaxed text-[#60646C]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
