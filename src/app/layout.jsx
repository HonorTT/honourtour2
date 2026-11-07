import { Geist } from "next/font/google";
import "./globals.css";
import EnquiryModal from "@/components/common/EnquiryModal";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, DEFAULT_KEYWORDS } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const DEFAULT_TITLE = "Kashmir Tour Packages | Srinagar, Gulmarg, Pahalgam — Honor Tour & Travels";
const DEFAULT_DESCRIPTION =
  "Kashmir tour packages from Honor Tour & Travels — Srinagar houseboats, Gulmarg gondola, Pahalgam and Sonmarg, with stays, transport and sightseeing in one price. Ladakh, Himachal and more of India too.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
     data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        {children}
        <EnquiryModal />
      </body>
    </html>
  );
}
