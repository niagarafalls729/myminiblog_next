/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
const path = require('path')

module.exports = {

    compiler: {
        styledComponents: {
            displayName: false,
        },
    },
    reactStrictMode: true,
    swcMinify: true,

} 