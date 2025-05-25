import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/djohggce0/**", // Restrict to your Cloudinary cloud name
      },
    ],
  },
};

export default nextConfig;
