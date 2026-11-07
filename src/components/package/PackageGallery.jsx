"use client";

import Image from "@/components/common/SiteImage";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";

export default function PackageGallery({ title, location, images }) {
  const photos = (images?.length ? images : []).map((photo) =>
    typeof photo === "string" ? { src: photo, alt: "", title: "" } : photo,
  );

  // Falls back to the tour name so no image is ever shipped without an alt.
  const altFor = (photo, index) => photo?.alt?.trim() || `${title} — photo ${index + 1}`;
  const [index, setIndex] = useState(-1);
  const open = index >= 0;

  const show = useCallback((next) => setIndex((next + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setIndex(-1);
      if (event.key === "ArrowRight") show(index + 1);
      if (event.key === "ArrowLeft") show(index - 1);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, index, show]);

  return (
    <>
      <div className="grid h-[230px] gap-2 overflow-hidden rounded-[14px] sm:h-[340px] sm:gap-3 md:grid-cols-[1.8fr_1fr]">

        {/* MAIN IMAGE */}
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="group relative overflow-hidden rounded-[14px] text-left"
          aria-label={`Open photo gallery for ${title}`}
        >
          <Image
            src={photos[0].src}
            alt={altFor(photos[0], 0)}
            title={photos[0].title || undefined}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white sm:p-5">
            <p className="flex items-center gap-1 text-[11px] font-medium sm:text-[12px]">
              <MapPin size={12} />
              {location}
            </p>
          </div>
        </button>

        {/* SMALL IMAGES */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-1 md:grid-rows-2">
          <button
            type="button"
            onClick={() => setIndex(1 % photos.length)}
            className="group relative overflow-hidden rounded-[12px]"
            aria-label="Open photo gallery"
          >
            <Image
              src={(photos[1] || photos[0]).src}
              alt={altFor(photos[1] || photos[0], 1)}
              title={(photos[1] || photos[0]).title || undefined}
              className="object-cover transition duration-500 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/20" />
          </button>

          <button
            type="button"
            onClick={() => setIndex(2 % photos.length)}
            className="group relative overflow-hidden rounded-[12px]"
            aria-label="Open photo gallery"
          >
            <Image
              src={(photos[2] || photos[0]).src}
              alt={altFor(photos[2] || photos[0], 2)}
              title={(photos[2] || photos[0]).title || undefined}
              className="object-cover transition duration-500 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/45">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-center text-[10px] font-semibold text-[#0F4C81] shadow-md sm:px-4 sm:text-[12px]">
                View all {photos.length} photos
              </span>
            </div>
          </button>
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
          onClick={() => setIndex(-1)}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <p className="text-[12px] font-semibold sm:text-[14px]">
              {title}
              <span className="ml-2 font-normal text-white/60">
                {index + 1} / {photos.length}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setIndex(-1)}
              className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
              aria-label="Close gallery"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative flex-1" onClick={(event) => event.stopPropagation()}>
            <Image
              key={photos[index].src}
              src={photos[index].src}
              alt={altFor(photos[index], index)}
              title={photos[index].title || undefined}
              className="object-contain"
              fill
              sizes="100vw"
            />

            <button
              type="button"
              onClick={() => show(index - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white transition hover:bg-white/30 sm:left-5"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => show(index + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white transition hover:bg-white/30 sm:right-5"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            className="flex gap-2 overflow-x-auto px-4 py-4 sm:justify-center sm:px-6"
            onClick={(event) => event.stopPropagation()}
          >
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-[8px] transition ${
                  i === index ? "ring-2 ring-white" : "opacity-55 hover:opacity-100"
                }`}
                aria-label={`Show photo ${i + 1}`}
              >
                  <Image src={photo.src} alt={altFor(photo, i)} className="object-cover" fill sizes="80px" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
