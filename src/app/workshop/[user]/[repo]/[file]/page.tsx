import { fetchGitHubFile } from '@/lib/github'
import { parseWorkshopMarkdown } from '@/lib/mdx'
import { WorkshopRenderer } from '@/components/WorkshopRenderer'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    user: string
    repo: string
    file: string
  }>
}

/**
 * Workshop page - fetches and displays workshop content from GitHub
 * Route: /workshop/[user]/[repo]/[file]
 */
export default async function WorkshopPage({ params }: PageProps) {
  const { user, repo, file } = await params

  try {
    // Fetch workshop markdown from GitHub
    const markdown = await fetchGitHubFile(user, repo, `${file}.md`)

    // Parse frontmatter and content
    const { frontmatter, content } = parseWorkshopMarkdown(markdown)

    return <WorkshopRenderer content={content} frontmatter={frontmatter} />
  } catch (error) {
    console.error('Error loading workshop:', error)
    notFound()
  }
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: PageProps) {
  const { user, repo, file } = await params

  try {
    const markdown = await fetchGitHubFile(user, repo, `${file}.md`)
    const { frontmatter } = parseWorkshopMarkdown(markdown)

    return {
      title: `${frontmatter.title} | DHRIFT`,
      description: frontmatter.description,
    }
  } catch {
    return {
      title: 'Workshop | DHRIFT',
    }
  }
}
