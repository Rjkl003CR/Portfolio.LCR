import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@sanity/workbench",
    "@sanity/sdk-react",
    "sanity",
    "next-sanity",
    "@sanity/vision",
  ],
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

export default withSerwist(nextConfig);
