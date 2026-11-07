/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray package-lock.json in the user's home folder made Next pick that
  // directory as the workspace root, so Tailwind scanned the wrong tree and
  // dev builds silently dropped newly added utility classes. Pin the root.
  turbopack: {
    root: import.meta.dirname,
  },

  images: {
    // AVIF first, WebP for browsers without it; the original jpeg is the
    // last resort. Ordered by preference — the first Accept match wins.
    formats: ["image/avif", "image/webp"],

    // Cards render around 230-300px wide, so the default jump from 384 to 640
    // made the browser fetch roughly a third more than it needed. 512 lands
    // between them.
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],

    // 75 stays the default; 60 is for the full-bleed hero photo, which sits
    // behind a dark scrim where the difference is invisible but worth ~90 KB.
    qualities: [60, 75],

    // Airline logos and vehicle photos are served from Wikimedia. The
    // Special:FilePath URLs redirect to upload.wikimedia.org, so both
    // hosts have to be allowed for the optimizer to fetch them.
    remotePatterns: [
      { protocol: "https", hostname: "commons.wikimedia.org", pathname: "/wiki/Special:FilePath/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
    ],
  },

  // Keeps the public URL as the single hyphenated segment
  // /tour-packages-from-mumbai while the actual route lives at
  // the dynamic folder src/app/tour-packages-from/[city]/page.jsx
  // (App Router folder names can't mix literal text with [param]
  // inside one path segment, so a rewrite bridges the two).
  // The site sells India tours only now. Old World links and Google results
  // land on the India page instead of a dead end.
  async redirects() {
    return [
      { source: "/world", destination: "/india", permanent: true },
      { source: "/world/:path*", destination: "/india", permanent: true },
      // Flights are India-only too; old links to the foreign routes go to the search page.
      {
        source: "/flights/:route(.*(?:dubai|singapore|bangkok|london|paris|new-york|kuala-lumpur|bali).*)",
        destination: "/flights",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/tour-packages-from-:city",
        destination: "/tour-packages-from/:city",
      },
    ];
  },
};

export default nextConfig;
