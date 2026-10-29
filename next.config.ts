import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No trailingSlash: canonicals and sitemap use the same
  // non-trailing-slash URLs (homepage root excepted).
};

export default nextConfig;
