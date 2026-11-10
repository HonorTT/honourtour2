import Link from "@/components/common/SiteLink";
import { ArrowRight, MapPinned } from "lucide-react";

const gradients = [
  "from-[#0B3B63] via-[#4DA8DA] to-[#A9D8F0]",
  "from-[#5B2A86] via-[#8B5FBF] to-[#A9D8F0]",
  "from-[#082C4B] via-[#0F4C81] to-[#17BEBB]",
  "from-[#4DA8DA] via-[#0B3B63] to-[#17BEBB]",
  "from-[#0B3B63] via-[#0F9AA8] to-[#A9D8F0]",
  "from-[#8B5FBF] via-[#5B2A86] to-[#0B3B63]",
];

export default function PopularTransportRoutes({ routes }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {routes.map((route, index) => (
        <Link
          key={route.slug}
          href={`/transport/${route.slug}`}
          className="group block min-w-0 overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white no-underline shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
        >
          <div
            className={`relative flex h-[100px] items-center justify-center bg-gradient-to-br sm:h-[120px] ${gradients[index % gradients.length]}`}
          >
            <MapPinned className="h-8 w-8 text-white/80 sm:h-9 sm:w-9" />
          </div>

          <div className="p-3 sm:p-3.5">
            <p className="truncate text-[14px] font-semibold leading-tight text-[#0F172A] group-hover:text-[#0F4C81]">
              {route.from} to {route.to}
            </p>
            <p className="mt-1 flex items-center gap-1 text-[12px] font-medium text-[#6B7280]">
              {route.distanceKm} km · {route.duration}
              <ArrowRight size={11} className="opacity-60" />
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
