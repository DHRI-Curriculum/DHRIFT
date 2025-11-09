import { WorkshopClientRenderer } from '@/components/WorkshopClientRenderer'

interface PageProps {
  params: Promise<{
    user: string
    repo: string
    file: string
  }>
}

/**
 * Workshop page - static shell for client-side rendering
 * Route: /workshop/[user]/[repo]/[file]
 *
 * DHRIFT Architecture:
 * - Static HTML exported (app shell only)
 * - Workshops fetched dynamically at RUNTIME in browser
 * - Users provide their own workshop repos via URL params
 * - MDX compiled client-side with full plugin pipeline
 * - GitHub API accessed via serverless proxy (hides owner's token)
 * - IndexedDB caching for performance and rate limit management
 */
export default async function WorkshopPage({ params }: PageProps) {
  const { user, repo, file } = await params

  // Just render the client component
  // All fetching/compilation happens in browser
  return <WorkshopClientRenderer user={user} repo={repo} file={file} />
}

/**
 * Generate metadata for the page
 *
 * For client-side rendering, we can't fetch workshop data at build time,
 * so use generic metadata. Actual title will be set by client component.
 */
export async function generateMetadata({ params }: PageProps) {
  const { user, repo, file } = await params

  return {
    title: `${file} | DHRIFT Workshop`,
    description: `Workshop from ${user}/${repo}`,
  }
}
