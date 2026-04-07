import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/page", // Redirect to the correct landing page
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
