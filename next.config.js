const withYAML = require('next-yaml')
const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/,
})

const repoName = 'javascripting-masters-student'
const build = process.env.NODE_ENV === "production";
console.log(`Running in ${process.env.NODE_ENV} mode`);
process.env.NEXT_PUBLIC_REPO_NAME = repoName
process.env.NEXT_PUBLIC_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS || false;
const isGitHub = process.env.GITHUB_ACTIONS === "true";
console.log(`Running in ${isGitHub ? "GitHub Actions" : "local"} mode`);

const imagesConfig = function(build, isGitHub) {
    if (isGitHub) {
        return {
            loader: 'akamai',
            path: '/' + repoName,
        }
    } 
    else if (build) {
        return {
            loader: 'akamai',
            path: '../..',
        }
    }
}

const nextConfig = {
    // reactStrictMode: true,
    trailingSlash: true,
    basePath: isGitHub ? '/' + repoName : '',
    assetPrefix: isGitHub ? '/' + repoName + '/' : '',
    images: imagesConfig(build, isGitHub),
}

console.log(nextConfig);
module.exports = withPlugins([
    [withMDX],
    [withYAML],
],
    nextConfig)
