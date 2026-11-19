import NavbarClient from "./NavbarClient";
import { indiaNavigation, withoutDrafted, withRecordSlugs } from "@/data/navigationData";
import { CUSTOMIZED_HOLIDAYS_MENU } from "@/data/customizedHolidays";
import { isDraftedPlace, withoutDraftedPlaces } from "@/data/draftFilter";
import { getDraftDestinations } from "@/lib/destinationStatus";
import { db } from "@/lib/db";

/* =========================================================
   NAVBAR
   Server side: takes destinations set to Draft in the admin
   out of the India menu, the Popular bar and Customized
   Holidays, then hands the menus to the interactive bar.
========================================================= */

export default async function Navbar() {
  const [drafts, records] = await Promise.all([
    getDraftDestinations(),
    db.destination.findMany({ select: { slug: true, name: true, parent: true } }).catch(() => []),
  ]);
  const nav = withRecordSlugs(indiaNavigation, records);

  return (
    <NavbarClient
      indiaNavigation={withoutDrafted(nav, (item) => isDraftedPlace(item, drafts))}
      indiaHolidays={{
        ...CUSTOMIZED_HOLIDAYS_MENU.indiaHolidays,
        items: withoutDraftedPlaces(CUSTOMIZED_HOLIDAYS_MENU.indiaHolidays.items, drafts),
      }}
    />
  );
}
