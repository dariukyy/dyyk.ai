/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "https",
        hostname: "wordpress-1323233-4838399.cloudwaysapps.com",
      },
    ],
  },
};

export default nextConfig;
