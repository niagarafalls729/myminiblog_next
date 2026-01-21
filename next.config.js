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
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY || 'http://localhost:4000',
  },
  reactStrictMode: true,
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
        hostname: 'localhost',
        port: '4000',
        pathname: '/crawled_images/**',
      },
      {
        protocol: 'http',
        hostname: '158.180.78.245',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '158.180.78.245',
        port: '4000',
        pathname: '/crawled_images/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000',
        pathname: '/crawled_images/**',
      },
    ],
  },
  // async rewrites() {
  //   return [

  //     {
  //       source: "/:path*",
  //       destination: "http://158.180.78.245:4000/:path*",
  //     },

  //   ];
  // },
};
