const withYAML = require('next-yaml')
const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/,
})

const isGitHub = process.env.GITHUB_ACTIONS === "true";
console.log(`Running in ${isGitHub ? "GitHub Actions" : "local"} mode`);
var repoName;
if (isGitHub) {
    repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
}else{
    repoName = 'dhrift';
}
console.log(`Repo name: ${repoName}`);
const build = process.env.NODE_ENV === "production";
console.log(`Running in ${process.env.NODE_ENV} mode`);
process.env.NEXT_PUBLIC_REPO_NAME = repoName
process.env.NEXT_PUBLIC_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS || false;

// const imagesConfig = function(build, isGitHub) {
//     if (isGitHub) {
//         return {
//             unoptimized: true,
//             // path: '../..',
//         }
//     } 
//     else if (build) {
//         return {
//             unoptimized: true,
//             // path: '../..',
//         }
//     }
// }

const nextConfig = {
    output: "export",
    trailingSlash: true,
    basePath: isGitHub ? '/' + repoName : '',
    assetPrefix: isGitHub ? '/' + repoName + '/' : '',
    images: {
        unoptimized: true,
    }
    // async headers() {
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: [
    //                 {
    //                     key: 'Cross-Origin-Opener-Policy',
    //                     value: 'same-origin',
    //                 },
    //                 {
    //                     key: 'Cross-Origin-Embedder-Policy',
    //                     value: 'require-corp',
    //                 },
    //             ],
    //         },
    //     ]
    // }
}

console.log(nextConfig);

module.exports = withPlugins([
    [withYAML],
    [withMDX],
], nextConfig);