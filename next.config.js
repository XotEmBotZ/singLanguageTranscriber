const basePath = process.env.NODE_ENV === 'production' ? '/nextjs-github-pages' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: `${basePath}`,
    env: {
        basePath
    }
    // assetPrefix: `${basePath}`,
    // images: {
    //     unoptimized: true,
    // },
}

module.exports = nextConfig
