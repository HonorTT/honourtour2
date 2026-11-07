import Image from "@/components/common/SiteImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HotelCityCard({ city }) {
  return (
    <Link
      href={`/hotels/${city.citySlug}`}
      className="group block overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white no-underline shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_10px_24px_rgba(0,0,0,0.1)]"
    >
      <div className="relative h-[150px] w-full overflow-hidden">
        <Image
          src={city.image}
          alt={city.name}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-[#17BEBB] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          {city.count} Hotel{city.count > 1 ? "s" : ""}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="text-[16px] font-bold text-white">{city.name}</p>
          <div className="mt-1 flex items-center gap-1 text-[12px] font-semibold text-white/90 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
            View hotels
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
