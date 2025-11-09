import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
 // 
  async rewrites() {
    return [
      {
        source: "/api/:path*", 
        destination: "http://localhost:4000/:path*", 
      },
    ];
  },

};

export default nextConfig;
