/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    eslint: {
        eslint: {
            ignoreDuringBuilds: ["components/ui/*.tsx"],
        },
    },
};

module.exports = nextConfig;
