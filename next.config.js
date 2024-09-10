const withYAML = require('next-yaml')
const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/,
})

const isGitHub = process.env.GITHUB_ACTIONS === "true";
console.log(`Running in ${isGitHub ? "GitHub Actions" : "local"} mode`);
var repoName = "dhrift";

const build = process.env.NODE_ENV === "production";
console.log(`Running in ${process.env.NODE_ENV} mode`);
process.env.NEXT_PUBLIC_REPO_NAME = repoName
process.env.NEXT_PUBLIC_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS || false;
process.env.NEXT_PUBLIC_GITHUBSECRET = process.env.GITHUBSECRET || false;

const basePath = isGitHub ? `/${repoName}` : '';
const assetPrefix = isGitHub ? `/${repoName}` : '';

const nextConfig = {
    basePath: basePath,
    assetPrefix: assetPrefix,
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    experimental: {
        optimizeCss: true,
    },
};

console.log(nextConfig);

module.exports = withPlugins([
    [withYAML],
    // [withMDX],
], nextConfig);
