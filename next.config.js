/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
const path = require("path");

module.exports = {
  compiler: {
    styledComponents: {
      displayName: false,
    },
  },
  reactStrictMode: true,
  swcMinify: true,
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
