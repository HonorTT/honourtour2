import NextLink from "next/link";

/* =========================================================
   SITE LINK
   next/link with prefetching off by default.

   By default Next downloads the data of every link on screen
   ahead of time. With the menu and the tour cards that was
   36-107 extra requests per page view, mostly for pages the
   visitor never opened, and hosting is billed on exactly
   that traffic. Pass prefetch explicitly to opt a link back in.
========================================================= */

export default function SiteLink({ prefetch = false, ...props }) {
  return <NextLink prefetch={prefetch} {...props} />;
}
