/** @type {import('next').NextConfig} */
function buildRemotePattern(urlStr) {
  const raw = String(urlStr || "").trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return {
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
      pathname: "/**",
    };
  } catch {
    return null;
  }
}

const envImageBases = [
  process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL,
  process.env.NEXT_PUBLIC_REQUEST_STORAGE_URL,
  process.env.NEXT_PUBLIC_REQUEST_BASE_URL,
];

const backendRemotePatterns = [];
const seen = new Set();

for (const base of envImageBases) {
  const pattern = buildRemotePattern(base);
  if (!pattern) continue;
  const key = `${pattern.protocol}://${pattern.hostname}${pattern.port ? `:${pattern.port}` : ""}`;
  if (seen.has(key)) continue;
  seen.add(key);
  backendRemotePatterns.push(pattern);
}

const nextConfig = {
  allowedDevOrigins: ["192.168.1.76:3001"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: backendRemotePatterns,
  },
};

module.exports = nextConfig;
