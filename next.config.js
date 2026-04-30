/** @type {import('next').NextConfig} */
const backendUrl = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL;

let backendRemotePatterns = [];
try {
  if (backendUrl) {
    const url = new URL(backendUrl);
    backendRemotePatterns = [
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        ...(url.port ? { port: url.port } : {}),
      },
    ];
  }
} catch {}

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: backendRemotePatterns,
  },
};

module.exports = nextConfig;
