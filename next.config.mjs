/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.metmuseum.org", "upload.wikimedia.org"], // Allow multiple external domains
  },
};

export default nextConfig;
