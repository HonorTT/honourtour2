import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { BUILT_BY, CONTACT } from "@/lib/contact";

/* =========================================================
   FOOTER
   Three compact bands: brand + contact, three columns of
   links, then the legal bar with the build credit centred
   under it. Every link here points at a page that exists —
   the old footer was mostly href="#".
========================================================= */

const COLUMNS = [
  {
    heading: "Tours",
    links: [
      { label: "India Tours", href: "/india" },
      { label: "Speciality Tours", href: "/speciality-tours" },
      { label: "Customized Holidays", href: "/customized-holidays" },
    ],
  },
  {
    heading: "Book",
    links: [
      { label: "Flights", href: "/flights" },
      { label: "Hotels", href: "/hotels" },
      { label: "Transport", href: "/transport" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Women's Special", href: "/womens-special" },
      { label: "Seniors' Special", href: "/seniors-special" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#082C4B] text-white">

      {/* BRAND + LINKS */}
      <div className="mx-auto w-full max-w-[1280px] px-4 py-9 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.3fr_2fr] md:gap-10">

          <div>
            <Link href="/" className="inline-flex no-underline">
              <Image
                src="/uploads/brand/logo.png"
                alt="Honor Tour &amp; Travels"
                width={929}
                height={269}
                sizes="140px"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="mt-3 max-w-[320px] text-[13px] leading-relaxed text-[#94A3B8]">
              Handpicked group departures across India — flights, stays,
              sightseeing and a tour manager, all in one price.
            </p>

            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2.5 text-[14.5px] font-bold text-white no-underline transition hover:text-[#5EEAD4]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17BEBB]">
                  <Phone className="h-4 w-4" />
                </span>
                {CONTACT.phone}
              </a>

              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-2.5 text-[13.5px] font-medium text-[#CBD5E1] no-underline transition hover:text-[#5EEAD4]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#5EEAD4]">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="break-all">{CONTACT.email}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.heading}>
                <h4 className="text-[12px] font-bold uppercase tracking-[0.16em] text-white">
                  {column.heading}
                </h4>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-[#CBD5E1] no-underline transition hover:text-[#5EEAD4]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEGAL + BUILD CREDIT */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-center text-[12px] text-[#94A3B8]/80">
            © {new Date().getFullYear()}{" "}
            Honor Tour &amp; Travels. All rights reserved.
          </p>

          <p className="mt-2.5 text-center text-[14px] text-[#94A3B8]">
            Created by{" "}
            <a
              href={BUILT_BY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#5EEAD4] no-underline underline-offset-4 transition hover:text-white hover:underline"
            >
              {BUILT_BY.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
