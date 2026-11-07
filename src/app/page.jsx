import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import DestinationStrip from "@/components/home/DestinationStrip";
import LiveTours from "@/components/home/LiveTours";
import ChinaPromo from "@/components/home/ChinaPromo";
import MostLovedTours from "@/components/home/MostLovedTours";
import TrustReviews from "@/components/home/TrustReviews";
import FeaturedTour from "@/components/home/FeaturedTour";
import ContinueTravel from "@/components/home/ContinueTravel";
import DepartureCities from "@/components/home/DepartureCities";
import TourInclusions from "@/components/home/TourInclusions";
import SeoContent from "@/components/home/SeoContent";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, organizationSchema, websiteSchema } from "@/lib/seo";
import { getHomeContent } from "@/lib/homeContent";

export const metadata = buildMetadata({
  title: "Kashmir Tour Packages | Srinagar, Gulmarg, Pahalgam — Honor Tour & Travels",
  description:
    "Kashmir tour packages from Honor Tour & Travels — Srinagar houseboats, Gulmarg gondola, Pahalgam and Sonmarg, with stays, transport and sightseeing in one price. Ladakh, Himachal and more of India too.",
  path: "/",
});

export default async function Home() {
  const content = await getHomeContent();

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0F172A]">
      <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      <Navbar />
      <HeroSection cards={content.heroCards} destinations={content.destinations} />

      <main className="mx-auto flex w-full max-w-[1280px] flex-col pb-16">
        <DestinationStrip destinations={content.destinations} />
        <LiveTours cards={content.liveTourCards} trustReviews={content.trustReviews} />
        <ChinaPromo promoPackages={content.chinaPromoPackages} />
        <MostLovedTours
          promoSlides={content.promoSlides}
          promoDestinations={content.mostLovedPromoDestinations}
          destinations={content.mostLovedDestinations}
        />
        <TrustReviews stats={content.trustStats} reviews={content.trustReviews} />
        <FeaturedTour slides={content.featuredTours} />
        <ContinueTravel tours={content.continueTravelTours} />
        <DepartureCities cities={content.departureCities} />
        <TourInclusions features={content.tourInclusionFeatures} />
        <SeoContent />
        <FAQ content={content.faq} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
