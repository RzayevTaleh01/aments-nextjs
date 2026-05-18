/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.76",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "178.105.135.28",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "178.105.135.28",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
