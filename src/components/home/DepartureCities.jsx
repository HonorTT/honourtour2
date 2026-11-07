import CardRail from "@/components/common/CardRail";
import Image from "next/image";
import Link from "next/link";
import { homeData } from "@/data/homeData";
import { getDestinationImage } from "@/data/destinationImages";

export default function DepartureCities({ cities }) {
  const departureCities = {
    ...homeData.departureCities,
    cities: cities?.length ? cities : homeData.departureCities.cities,
  };

  return (
    <section className="px-3 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-[24px] font-bold leading-tight text-[#0F172A] sm:text-[30px]">
          Kashmir Tours, Starting From{" "}
          <span className="text-[#0F4C81]">Your City</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-[15px] leading-relaxed text-[#60646C] md:mt-3 md:text-[13px] md:leading-[1.6]">
          Flights, stays, sightseeing and meals in one price — our Kashmir departures leave from these cities, along with the rest of our India tours. Pick yours below.
        </p>

        <CardRail className="mt-6 flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:mt-8 md:gap-4 sm:grid sm:overflow-visible sm:grid-cols-2 lg:grid-cols-4">
          {departureCities.cities.map((city) => {
            const image = getDestinationImage(city.name);
            return (
              <Link
                key={city.name}
                href={`/tour-packages-from-${city.slug}`}
                className="group flex w-full min-w-full flex-shrink-0 snap-start transform-gpu cursor-pointer flex-col overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white no-underline shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-[3px] hover:border-[#17BEBB] hover:shadow-[0_10px_24px_rgba(0,0,0,0.1)] sm:w-auto sm:min-w-0"
              >
                <div className="relative h-[110px] w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={city.name}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 100vw, 260px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-3.5 bottom-2.5">
                    <h4 className="text-[17px] font-bold leading-tight text-white md:text-[15px]">{city.name}</h4>
                    <p className="mt-0.5 text-[12px] text-white/85">{city.departures}</p>
                  </div>
                </div>
                <div className="bg-[#F7FAFC] p-3.5">
                  <p className="text-[12px] text-[#60646C]">Starting from</p>
                  <p className="mt-1 text-[17px] font-bold text-[#0F172A] md:text-[16px]">{city.startingPrice}</p>
                  <span className="mt-2 flex h-[42px] w-full items-center justify-center rounded-[10px] border border-[#0F172A] text-center text-[14px] font-bold text-[#0F172A] transition group-hover:bg-[#0B3B63] group-hover:text-white group-hover:border-[#0B3B63] md:mt-3 md:h-auto md:rounded-xl md:py-2 md:text-[12px]">
                    View Tours
                  </span>
                </div>
              </Link>
            );
          })}
        </CardRail>

        <div className="mt-6 rounded-[14px] border border-[#0F4C81]/20 bg-[#F7FAFC] p-4 md:mt-8 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
            <div>
              <p className="text-[14px] leading-relaxed text-[#0F172A] md:text-[13px] md:leading-normal">
                Your City Not Listed? Choose our
                <span className="ml-1 font-bold text-[#0F4C81]">Joining & Leaving Option</span>
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#60646C] md:text-[13px] md:leading-normal">
                Book your own flights, we take care of the rest.
              </p>
              <button className="mt-3 flex h-[44px] items-center rounded-full bg-[#FF7A1A] px-5 text-[15px] font-bold text-white shadow-md shadow-orange-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E56A0F] hover:shadow-lg md:mt-4 md:h-auto md:py-2 md:text-[12px]">
                Request a callback
              </button>
            </div>
            <div className="text-[14px] leading-relaxed text-[#0F172A] md:text-[13px] md:leading-normal">
              <p className="font-semibold">
                Join the group directly at first destination &
              </p>
              <p className="mt-1 font-semibold">
                Leave the group at the last destination
              </p>
              <button className="mt-3 text-[13px] font-bold text-[#0F4C81] md:mt-4 md:text-[12px]">
                What&apos;s included in J/L option? View Inclusions →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
