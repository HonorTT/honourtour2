import { ChevronDown } from "lucide-react";

export default function SeoContent() {
  return (
    <section className="px-3 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-[24px] font-bold leading-tight text-[#0F172A] sm:text-[30px]">
          Kashmir tour packages with Honor Tour &amp; Travels
        </h2>

        <div className="mt-6 space-y-4 text-[13px] leading-[1.8] text-[#4B5563]">
          <p>
            Kashmir is what we do best. Our Kashmir tour packages cover Srinagar and its
            houseboats on Dal Lake, the meadows of Gulmarg, the pine valleys of Pahalgam and
            the glacier road to Sonmarg — with shikara rides, gondola tickets and local
            sightseeing already built into the price. Whether you want a short five-day
            Kashmir trip, a seven-day family itinerary or a longer Jammu Kashmir tour that
            starts at Katra, every departure is run by our own team on the ground.
          </p>
          <p>
            Beyond the valley we also run Leh Ladakh tours over Nubra Valley, Pangong Lake and
            Kargil, plus Kashmir departures made for specific groups — women&apos;s special
            tours with women tour managers, and seniors&apos; special tours at an easier pace
            with fewer transfers. Honeymoon couples, families with young children and large
            group bookings are all handled as customised Kashmir itineraries.
          </p>
          <p>
            We continue to run selected India holidays — Himachal, Kerala,
            Rajasthan and Andaman — for travellers who book
            with us year after year. But Kashmir remains our home ground, and it is where our
            pricing, our transport and our local contacts are strongest.
          </p>
        </div>

        <button className="mt-6 flex items-center gap-2 text-[13px] font-semibold text-[#0F4C81]">
          Read More
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
