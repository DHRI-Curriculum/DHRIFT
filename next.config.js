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
    webpack(config, { isServer }) {
        // Fix asset modules for fonts/images in CSS
        config.module.rules.forEach((rule) => {
            if (rule.oneOf) {
                rule.oneOf.forEach((oneOfRule) => {
                    if (oneOfRule.type === 'asset/resource') {
                        // Remove filename property that causes issues
                        if (oneOfRule.generator && oneOfRule.generator.filename) {
                            delete oneOfRule.generator.filename;
                        }
                    }
                });
            }
        });
        return config;
    }
}

console.log(nextConfig);

module.exports = nextConfig;