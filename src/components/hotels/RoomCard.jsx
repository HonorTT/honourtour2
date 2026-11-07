"use client";

import Image from "@/components/common/SiteImage";
import { Users } from "lucide-react";
import { getAmenityIcon } from "./amenityIcons";

export default function RoomCard({ room, hotelImage, onBookNow }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#17BEBB] hover:shadow-[0_10px_24px_rgba(0,0,0,0.1)] sm:flex-row">
      <div className="relative h-[160px] w-full shrink-0 sm:h-auto sm:w-[220px]">
        <Image
          src={room.image || hotelImage}
          alt={room.type}
          className="object-cover"
          fill
          sizes="(max-width: 640px) 100vw, 220px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <div className="min-w-0">
          <h3 className="text-[17px] font-bold text-[#0F172A]">{room.type}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#64748B]">
            <Users className="h-4 w-4 shrink-0 text-[#0F4C81]" />
            Up to {room.capacity} Guests
          </p>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {room.amenities.map((amenity) => {
              const Icon = getAmenityIcon(amenity);
              return (
                <span
                  key={amenity}
                  className="flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-[#F7FAFC] px-2.5 py-1 text-[12px] font-medium text-[#475569]"
                >
                  <Icon className="h-3.5 w-3.5 text-[#0F4C81]" />
                  {amenity}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#F0F0F0] pt-3 sm:flex-col sm:items-end sm:gap-2 sm:border-t-0 sm:pt-0">
          <div className="sm:text-right">
            <p className="text-[20px] font-bold leading-tight text-[#0F172A]">
              ₹{room.price.toLocaleString("en-IN")}
            </p>
            <p className="text-[12px] text-[#6B7280]">per night</p>
          </div>

          <button
            type="button"
            onClick={() => onBookNow(room)}
            className="h-[44px] shrink-0 rounded-[10px] bg-[#FF7A1A] px-6 text-[14px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E56A0F]"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
