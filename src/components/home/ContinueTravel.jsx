import CardRail from "@/components/common/CardRail";
import Image from "@/components/common/SiteImage";
import Link from "@/components/common/SiteLink";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/homeData";
import { getDestinationImage } from "@/data/destinationImages";

export default function ContinueTravel({ tours }) {
  const continueTravel = {
    ...homeData.continueTravel,
    tours: tours?.length ? tours : homeData.continueTravel.tours,
  };

  return (
    <section className="bg-[#F7FAFC] px-3 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-[24px] font-bold leading-tight text-[#0F172A] sm:text-[30px]">
          {continueTravel.heading}
        </h2>
        <p className="mt-1.5 text-[14px] font-light text-[#60646C]">
          Pick up where you left off — these tours are still open for your dates.
        </p>

        <CardRail className="mt-6 flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:mt-6 md:gap-4 sm:grid sm:overflow-visible sm:grid-cols-2 lg:grid-cols-4">
          {continueTravel.tours.map((tour) => (
            <Link
              key={tour.name}
              href={`/package/${tour.slug}`}
              className="group w-full min-w-full flex-shrink-0 snap-start transform-gpu overflow-hidden rounded-[16px] bg-white no-underline shadow-[0_2px_12px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.13)] sm:w-auto sm:min-w-0"
            >
              <div className="flex flex-col">
                <div className="relative h-[120px] w-full overflow-hidden">
                  <Image
                    src={getDestinationImage(tour.name)}
                    alt={tour.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-3.5">
                  <h4 className="text-[14px] font-semibold leading-tight text-[#0F172A]">{tour.name}</h4>
                  <p className="mt-1 text-[12px] font-light text-[#6B7280]">{tour.duration}</p>

                  <p className="mt-2 text-[15px] font-bold text-[#0F172A]">{tour.price}</p>
                  <p className="text-[11px] font-light text-[#6B7280]">twin sharing</p>

                  <span className="mt-3 flex items-center gap-1.5 text-[12px] font-bold text-[#0F4C81] transition-colors group-hover:text-[#17BEBB]">
                    {tour.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </CardRail>
      </div>
    </section>
  );
}
