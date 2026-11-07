"use client";

import Image from "@/components/common/SiteImage";
import { useState } from "react";
import { Camera, X } from "lucide-react";

export default function HotelGallery({ name, image }) {
  const [open, setOpen] = useState(false);

  // Only one real photo exists per hotel in the data — the tiles below
  // reuse it with different crops rather than inventing new image URLs.
  const tiles = [
    { alt: `${name} — view 1`, className: "scale-125 object-center" },
    { alt: `${name} — view 2`, className: "scale-110 object-left" },
  ];

  return (
    <>
      <div className="grid h-[280px] gap-2 overflow-hidden rounded-[16px] sm:h-[380px] md:grid-cols-[1.7fr_1fr]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative overflow-hidden"
        >
          <Image
            src={image}
            alt={name}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </button>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:grid-rows-2">
          {tiles.map((tile, index) => (
            <button
              key={tile.alt}
              type="button"
              onClick={() => setOpen(true)}
              className="group relative overflow-hidden"
            >
              <Image
                src={image}
                alt={tile.alt}
                className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${tile.className}`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              {index === tiles.length - 1 && (
                <>
                  <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-white">
                    <Camera className="h-5 w-5" />
                    <span className="text-[13px] font-semibold">View all photos</span>
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative h-full w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={image}
              alt={name}
              className="rounded-[12px] object-contain"
              fill
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
