/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
const path = require('path');

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
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '138.2.119.188',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000',
        pathname: '/uploads/**',
      },
    ],
  },
  // async rewrites() {
  //   return [
 
  //     {
  //       source: "/:path*",
  //       destination: "http://138.2.119.188:4000/:path*",
  //     },
 
  //   ];
  // },
};
