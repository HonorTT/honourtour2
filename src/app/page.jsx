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

export async function generateMetadata() {
  const { settings } = await getHomeContent();
  return buildMetadata({ title: settings.metaTitle, description: settings.metaDescription, path: "/" });
}


export default async function Home() {
  const content = await getHomeContent();
  const s = content.settings;

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0F172A]">
      <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      <Navbar />
      <HeroSection cards={content.heroCards} destinations={content.destinations} settings={s} />

      <main className="mx-auto flex w-full max-w-[1280px] flex-col pb-16">
        <DestinationStrip destinations={content.destinations} settings={s} />
        <LiveTours cards={content.liveTourCards} trustReviews={content.trustReviews} settings={s} />
        <ChinaPromo promoPackages={content.chinaPromoPackages} settings={s} />
        <MostLovedTours
          promoSlides={content.promoSlides}
          promoDestinations={content.mostLovedPromoDestinations}
          destinations={content.mostLovedDestinations}
          settings={s}
        />
        <TrustReviews stats={content.trustStats} reviews={content.trustReviews} settings={s} />
        <FeaturedTour slides={content.featuredTours} settings={s} />
        <ContinueTravel tours={content.continueTravelTours} settings={s} />
        <DepartureCities cities={content.departureCities} settings={s} />
        <TourInclusions features={content.tourInclusionFeatures} settings={s} />
        <SeoContent settings={s} />
        <FAQ content={content.faq} settings={s} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
