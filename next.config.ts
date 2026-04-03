import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/groups",
        destination: "/community",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
