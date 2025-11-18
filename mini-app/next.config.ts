import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/metadata/:project",
      destination:
        "https://:project.miniapp-factory.marketplace.openxai.network/.well-known/erc721.json",
    },
  ],
};

export default nextConfig;
