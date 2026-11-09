import { notFound, permanentRedirect } from "next/navigation";
import { resolveSlug } from "@/lib/slugHistory";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { findDestinationSlugByName, getDestination, getDestinationParams } from "@/data/destinations";
import { getCityPageTarget } from "@/data/navigationData";
import { getDestinationParamsFromDb, getDestinationRecords } from "@/lib/destinations";
import { getAllPackages } from "@/lib/packages";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  const fromDb = await getDestinationParamsFromDb("india");
  const params = fromDb.length ? fromDb : getDestinationParams("india");
  return params.filter(({ destination }) => !getCityPageTarget(destination));
}

export async function generateMetadata({ params }) {
  const { destination } = await params;
  const result = getDestination("india", destination, await getDestinationRecords(), await getAllPackages());

  if (!result) {
    return buildMetadata({
      title: "India Destination Not Found",
      description: "The destination you are looking for is not available.",
      path: `/india/${destination}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: result.raw.metaTitle,
    description: result.raw.metaDescription,
    path: `/india/${destination}`,
  });
}

export default async function IndiaDestinationPage({ params }) {
  const { destination } = await params;

  // Cities live inside their state's page now.
  const cityTarget = getCityPageTarget(destination);
  if (cityTarget) permanentRedirect(cityTarget);

  // Checked first: an unknown slug is otherwise synthesized into a page, so a
  // retired address would quietly serve a thin duplicate instead of moving on.
  const renamed = await resolveSlug("destination", destination);
  if (renamed) permanentRedirect(`/india/${renamed}`);

  const records = await getDestinationRecords();

  const ownPage = findDestinationSlugByName("india", destination, records);
  if (ownPage) permanentRedirect(`/india/${ownPage}`);

  const result = getDestination("india", destination, records, await getAllPackages());

  if (!result) {
    notFound();
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "India", href: "/india" },
          { name: result.raw.name, href: `/india/${destination}` },
        ])}
      />
      <Navbar />

      <main>
        <TourCategoryPage config={result.config} />
      </main>

      <Footer />
    </>
  );
}
