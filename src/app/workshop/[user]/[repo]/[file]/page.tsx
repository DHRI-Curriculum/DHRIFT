import { fetchGitHubFile } from '@/lib/github'
import { parseWorkshopMarkdown, extractToC } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { Frontmatter } from '@/components/Frontmatter'
import { TableOfContents } from '@/components/TableOfContents'
import { Box, Container } from '@mui/material'
import { mdxOptions } from '@/lib/mdx-config'
import * as mdxComponents from '@/components/mdx'

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
 *
 * This is a React Server Component that runs at BUILD TIME for static sites.
 * All MDX compilation happens during build, not in the browser.
 *
 * Uses next-mdx-remote/rsc which compiles MDX on the server with our custom plugins.
 */
export default async function WorkshopPage({ params }: PageProps) {
  const { user, repo, file } = await params

  try {
    // ⏰ BUILD TIME: Fetch workshop markdown from GitHub
    const markdown = await fetchGitHubFile(user, repo, `${file}.md`)

    // ⏰ BUILD TIME: Parse frontmatter and preprocess content
    const { frontmatter, content } = parseWorkshopMarkdown(markdown)

    // Extract table of contents
    const toc = extractToC(content)

    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', gap: 3, py: 4 }}>
          {/* Main content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Workshop metadata */}
            <Frontmatter data={frontmatter} />

            {/* MDX content - compiled at build time with our plugin pipeline */}
            <Box sx={{ mt: 3 }}>
              <MDXRemote
                source={content}
                options={{
                  mdxOptions,
                  scope: { frontmatter },
                }}
                components={mdxComponents}
              />
            </Box>
          </Box>

          {/* Table of contents sidebar */}
          <Box
            sx={{
              width: 240,
              display: { xs: 'none', md: 'block' },
            }}
          >
            <TableOfContents items={toc} />
          </Box>
        </Box>
      </Container>
    )
  } catch (error) {
    console.error('Error loading workshop:', error)
    notFound()
  }
}

/**
 * Generate metadata for the page (BUILD TIME)
 */
export async function generateMetadata({ params }: PageProps) {
  const { user, repo, file } = await params

  try {
    const markdown = await fetchGitHubFile(user, repo, `${file}.md`)
    const { frontmatter } = parseWorkshopMarkdown(markdown)

    return {
      title: `${frontmatter.title} | DHRIFT`,
      description: frontmatter.description,
      keywords: frontmatter.keywords?.join(', '),
    }
  } catch {
    return {
      title: 'Workshop | DHRIFT',
    }
  }
}

/**
 * Generate static params for all workshops (BUILD TIME)
 *
 * For static export, uncomment and implement this to pre-generate all workshop pages.
 * This tells Next.js which dynamic routes to build at compile time.
 *
 * export async function generateStaticParams() {
 *   const instUser = process.env.NEXT_PUBLIC_INSTITUTE_USER || 'DHRI-Curriculum'
 *   const instRepo = process.env.NEXT_PUBLIC_INSTITUTE_REPO || 'dhrift-site-template'
 *
 *   const config = await fetchInstituteConfig(instUser, instRepo)
 *
 *   return config.workshops.map(workshop => ({
 *     user: workshop.user || instUser,
 *     repo: workshop.repository,
 *     file: workshop.file,
 *   }))
 * }
 */
