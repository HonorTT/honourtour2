import Image from "@/components/common/SiteImage";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

export default function HotelCard({ hotel }) {
  return (
    <article className="grid grid-cols-1 gap-4 rounded-[16px] border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#17BEBB] hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] sm:grid-cols-[220px_1fr_auto] sm:items-center sm:gap-5">
      {/* PHOTO */}
      <div className="relative h-[150px] w-full shrink-0 overflow-hidden rounded-[12px] sm:h-[130px] sm:w-[220px]">
        <Image
          src={hotel.image}
          alt={hotel.name}
          className="object-cover"
          fill
          sizes="(max-width: 640px) 100vw, 220px"
        />
        <span className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full bg-black/60 px-2 py-1 text-[11px] font-bold text-white">
          <Star className="h-3 w-3 fill-[#FFD400] text-[#FFD400]" />
          {hotel.starRating}
        </span>
      </div>

      {/* DETAILS */}
      <div className="min-w-0">
        <h3 className="text-[17px] font-bold text-[#0F172A]">{hotel.name}</h3>

        <div className="mt-1.5 flex items-center gap-1 text-[13px] text-[#64748B]">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0F4C81]" />
          <span className="truncate">{hotel.address}</span>
        </div>

        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-[#64748B] sm:line-clamp-1">
          {hotel.description}
        </p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="rounded-full border border-[#E5E7EB] bg-[#F7FAFC] px-2.5 py-1 text-[11px] font-medium text-[#475569]"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* PRICE / CTA */}
      <div className="flex items-center justify-between gap-3 border-t border-[#F0F0F0] pt-3 sm:flex-col sm:items-end sm:gap-2 sm:border-t-0 sm:border-l sm:border-[#F0F0F0] sm:pt-0 sm:pl-5">
        <div className="shrink-0 sm:text-right">
          <p className="text-[19px] font-bold leading-tight text-[#0F172A]">
            ₹{hotel.pricePerNight.toLocaleString("en-IN")}
          </p>
          <p className="text-[12px] text-[#6B7280]">per night, onwards</p>
        </div>

        <Link
          href={`/hotels/${hotel.citySlug}/${hotel.slug}`}
          className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-[#FF7A1A] px-5 text-[13px] font-bold text-white no-underline shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:-translate-y-0.5 hover:bg-[#E56A0F] sm:w-auto sm:flex-none sm:shrink-0"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
