const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/,
})

process.env.NEXT_PUBLIC_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS || false;
// DHRIFT is a static site, so this public read-only credential is embedded in the client bundle.
process.env.NEXT_PUBLIC_GITHUB_READ_TOKEN = process.env.GITHUB_READ_TOKEN || false;
process.env.NEXT_PUBLIC_ASSET_PREFIX = process.env.PAGES_PATH || '';

const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    // Add CSS optimization
    experimental: {
        optimizeCss: true, // Enable CSS optimization
        largePageDataBytes: 192 * 1024,
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

module.exports = nextConfig;
