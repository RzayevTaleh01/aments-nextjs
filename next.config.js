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
    ],
  },
};

module.exports = nextConfig;
