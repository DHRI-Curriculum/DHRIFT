const { default: next } = require('next');
const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/,
})

const isGitHub = process.env.GITHUB_ACTIONS === "true";
console.log(`Running in ${isGitHub ? "GitHub Actions" : "local"} mode`);

process.env.NEXT_PUBLIC_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS || false;
process.env.NEXT_PUBLIC_GITHUBSECRET = process.env.GITHUBSECRET || false;
process.env.NEXT_PUBLIC_ASSET_PREFIX = process.env.PAGES_PATH || '';

const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    // Add CSS optimization
    experimental: {
        optimizeCss: true, // Enable CSS optimization
    },
    webpack(config) {
        // CSS handling
        config.module.rules.push({
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        });
        return config;
    }
}

console.log(nextConfig);

module.exports = nextConfig;