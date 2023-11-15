/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "yt3.googleusercontent.com" },
      { hostname: "i.ytimg.com" },
    ],
  },
};

module.exports = nextConfig;
