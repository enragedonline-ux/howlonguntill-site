import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No trailingSlash: canonicals and sitemap use the same
  // non-trailing-slash URLs (homepage root excepted).
  // Apex -> www: the apex host must 308-redirect to the same www
  // path instead of serving duplicate content (canonical already
  // points to www, this makes the redirect match it).
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "howlonguntill.site" }],
        destination: "https://www.howlonguntill.site/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "howlonguntill.site" }],
        destination: "https://www.howlonguntill.site/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
