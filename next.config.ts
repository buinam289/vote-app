import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'], // Add GitHub's image domain here
  },
};

export default nextConfig;
