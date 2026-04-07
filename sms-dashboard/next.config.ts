import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/app", // Redirect to the landing page
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
