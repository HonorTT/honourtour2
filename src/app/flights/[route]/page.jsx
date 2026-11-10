import { notFound } from "next/navigation";
import Link from "@/components/common/SiteLink";
import { ChevronRight, Plane } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FlightSearchForm from "@/components/flights/FlightSearchForm";
import FlightResults from "@/components/flights/FlightResults";
import FlightRouteContent from "@/components/flights/FlightRouteContent";
import FlightFAQ from "@/components/flights/FlightFAQ";
import { getRouteFaqs } from "@/data/flightRoutes";
import { getAirports, getFlightRoute, getFlightRouteSlugs } from "@/lib/flights";
import { db } from "@/lib/db";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return getFlightRouteSlugs();
}

export async function generateMetadata({ params }) {
  const { route: slug } = await params;
  const route = await getFlightRoute(slug);

  if (!route) {
    return buildMetadata({
      title: "Flight Route Not Found",
      description: "The flight route you are looking for is not available.",
      path: `/flights/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${route.from} to ${route.to} Flights | Flight Tickets & Booking`,
    description: route.description,
    path: `/flights/${route.slug}`,
  });
}

export default async function FlightRoutePage({ params }) {
  const { route: slug } = await params;
  const route = await getFlightRoute(slug);

  if (!route) {
    notFound();
  }

  const otherRouteObjects = (
    await Promise.all((route.otherRoutes || []).map((otherSlug) => getFlightRoute(otherSlug)))
  ).filter((item) => item && item.slug !== route.slug);

  const faqs = getRouteFaqs(route);
  const [airlines, airports] = await Promise.all([
    db.airline.findMany({ orderBy: { order: "asc" } }),
    getAirports(),
  ]);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Flights", href: "/flights" },
          { name: `${route.from} to ${route.to}`, href: `/flights/${route.slug}` },
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
          <Plane className="pointer-events-none absolute right-6 top-6 h-20 w-20 rotate-45 text-white/10" />

          <div className="relative mx-auto w-full max-w-[1280px]">
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-300">
              <Link href="/" className="hover:text-[#5EEAD4]">Home</Link>
              <ChevronRight size={11} />
              <Link href="/flights" className="hover:text-[#5EEAD4]">Flights</Link>
              <ChevronRight size={11} />
              <span className="text-white">{route.from} to {route.to}</span>
            </div>

            <h1 className="mt-3 text-[28px] font-bold text-white sm:text-[36px]">
              {route.from} to {route.to} Flights
            </h1>

            <div className="mt-2 flex items-center gap-3 text-[13px] font-semibold text-white">
              <span>{route.fromCode} → {route.toCode}</span>
              <span className="text-slate-400">|</span>
              <span>{route.from} to {route.to}</span>
            </div>

            <p className="mt-2 max-w-[760px] text-[12px] leading-[1.7] text-slate-300">
              {route.description}
            </p>

            <div className="mt-5">
              <FlightSearchForm initialFrom={route.from} initialTo={route.to} airports={airports} compact />
            </div>
          </div>
        </section>

        <FlightResults route={route} airlines={airlines} />

        <FlightRouteContent route={{ ...route, otherRouteObjects }} />

        <FlightFAQ
          faqs={faqs}
          subheading={`We help you prepare for your ${route.from} to ${route.to} flight and answer commonly asked questions.`}
        />
      </main>

      <Footer />
    </>
  );
}
