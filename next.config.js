const basePath = process.env.NODE_ENV === 'production' ? '/singLanguageTranscriber' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: "/nextjs-github-pages",
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
