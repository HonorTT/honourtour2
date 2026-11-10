import { notFound } from "next/navigation";
import Link from "@/components/common/SiteLink";
import { ChevronRight, MapPinned } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TransportResults from "@/components/transport/TransportResults";
import { db } from "@/lib/db";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  const routes = await db.transportRoute.findMany({ select: { slug: true } });
  return routes.map((route) => ({ route: route.slug }));
}

export async function generateMetadata({ params }) {
  const { route: slug } = await params;
  const route = await db.transportRoute.findUnique({ where: { slug } });

  if (!route) {
    return buildMetadata({
      title: "Transport Route Not Found",
      description: "The transport route you are looking for is not available.",
      path: `/transport/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${route.from} to ${route.to} Car & Bus Booking | Honor Tour & Travels`,
    description: route.description,
    path: `/transport/${route.slug}`,
  });
}

export default async function TransportRoutePage({ params }) {
  const { route: slug } = await params;
  const route = await db.transportRoute.findUnique({ where: { slug } });

  if (!route) {
    notFound();
  }

  const options = await db.transportOption.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Transport", href: "/transport" },
          { name: `${route.from} to ${route.to}`, href: `/transport/${route.slug}` },
        ])}
      />
      <Navbar />

      <main className="bg-white">
        {/* =====================================================
            ROUTE HERO
        ===================================================== */}
        <section
          className="relative overflow-hidden px-3 pb-8 pt-6 sm:px-6 lg:px-8"
          style={{ background: "linear-gradient(135deg, #0B3B63, #4DA8DA)" }}
        >
          <MapPinned className="pointer-events-none absolute right-6 top-6 h-20 w-20 text-white/10" />

          <div className="relative mx-auto w-full max-w-[1280px]">
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-300">
              <Link href="/" className="hover:text-[#5EEAD4]">Home</Link>
              <ChevronRight size={11} />
              <Link href="/transport" className="hover:text-[#5EEAD4]">Transport</Link>
              <ChevronRight size={11} />
              <span className="text-white">{route.from} to {route.to}</span>
            </div>

            <h1 className="mt-3 text-[28px] font-bold text-white sm:text-[36px]">
              {route.from} to {route.to} Car &amp; Bus Booking
            </h1>

            <div className="mt-2 flex items-center gap-3 text-[13px] font-semibold text-white">
              <span>{route.distanceKm} km</span>
              <span className="text-slate-400">|</span>
              <span>{route.duration}</span>
            </div>

            <p className="mt-2 max-w-[760px] text-[13px] leading-[1.7] text-slate-300">
              {route.description}
            </p>
          </div>
        </section>

        {/* =====================================================
            VEHICLES FOR THIS ROUTE
        ===================================================== */}
        <section className="px-3 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-[18px] font-bold text-[#0F172A] sm:text-[20px]">
              {options.length} Vehicle Options for {route.from} → {route.to}
            </h2>

            <div className="mt-6">
              <TransportResults options={options} route={route} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
