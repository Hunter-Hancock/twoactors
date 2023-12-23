/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themoviedb.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.wondershare.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
