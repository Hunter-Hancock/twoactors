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
    ],
  },
  env: {
    api_key: "952db57fea8e7f7fec91d08d73973661",
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
