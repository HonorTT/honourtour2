import { notFound, permanentRedirect } from "next/navigation";
import { resolveSlug } from "@/lib/slugHistory";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { findDestinationSlugByName, getDestination, getDestinationParams } from "@/data/destinations";
import { getCityPageTarget, getParentNamesFor, withRecordSlugs, indiaNavigation } from "@/data/navigationData";
import { isDraftedPlace } from "@/data/draftFilter";
import { getDraftDestinations } from "@/lib/destinationStatus";
import { getDestinationParamsFromDb, getDestinationRecords } from "@/lib/destinations";
import { getAllPackages } from "@/lib/packages";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  const fromDb = await getDestinationParamsFromDb("india");
  const params = fromDb.length ? fromDb : getDestinationParams("india");
  const drafts = await getDraftDestinations();
  return params.filter(
    ({ destination }) => !getCityPageTarget(destination) && !drafts.slugs.includes(destination),
  );
}

export async function generateMetadata({ params }) {
  const { destination } = await params;
  const drafts = await getDraftDestinations();
  const result = drafts.slugs.includes(destination)
    ? null
    : getDestination("india", destination, await getDestinationRecords(), await getAllPackages());

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

  // Drafted in the admin: no page until it is published again.
  const drafts = await getDraftDestinations();
  if (drafts.slugs.includes(destination)) notFound();

  const records = await getDestinationRecords();

  // Cities live inside their state's page now — unless the city or its state
  // is drafted, in which case there is nothing to send them to.
  const cityTarget = getCityPageTarget(destination);
  if (cityTarget) {
    const cityName = destination.replace(/-tour-packages$/, "").replace(/-/g, " ");
    const stateName = getParentNamesFor("india", cityName)[0];
    if (isDraftedPlace({ href: cityTarget, name: cityName }, drafts) || isDraftedPlace({ name: stateName }, drafts)) {
      notFound();
    }
    // The state's current address, in case the admin renamed its slug.
    const current = withRecordSlugs(indiaNavigation, records)
      .regions.flatMap((region) => region.columns)
      .flatMap((col) => col.items)
      .find((item) => `${item.name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-+|-+$)/g, "")}-tour-packages` === destination);
    permanentRedirect(current?.href ?? cityTarget);
  }

  // Checked first: an unknown slug is otherwise synthesized into a page, so a
  // retired address would quietly serve a thin duplicate instead of moving on.
  const renamed = await resolveSlug("destination", destination);
  if (renamed) permanentRedirect(`/india/${renamed}`);

  const ownPage = findDestinationSlugByName("india", destination, records);
  if (ownPage && drafts.slugs.includes(ownPage)) notFound();
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
