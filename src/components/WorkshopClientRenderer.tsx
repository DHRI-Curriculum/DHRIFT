/**
 * Client-Side Workshop Renderer
 *
 * Fetches and renders workshops dynamically in the browser.
 * Uses:
 * - GitHub API proxy for secure token usage
 * - IndexedDB caching for performance
 * - Client-side MDX compilation with full plugin pipeline
 */

'use client'

import { useEffect, useState, type ComponentType } from 'react'
import { Box, Container, CircularProgress, Alert, Button } from '@mui/material'
import { fetchGitHubFileCached } from '@/lib/github-client'
import { parseWorkshopMarkdown, extractToC } from '@/lib/mdx'
import { evaluateMDXCached } from '@/lib/mdx-client'
import { Frontmatter } from '@/components/Frontmatter'
import { TableOfContents } from '@/components/TableOfContents'
import * as mdxComponents from '@/components/mdx'
import type { WorkshopFrontmatter } from '@/types/workshop'
import type { ToCItem } from '@/lib/mdx'

interface WorkshopClientRendererProps {
  user: string
  repo: string
  file: string
}

type WorkshopState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | {
      status: 'success'
      frontmatter: WorkshopFrontmatter
      toc: ToCItem[]
      MDXContent: ComponentType
    }

export function WorkshopClientRenderer({
  user,
  repo,
  file,
}: WorkshopClientRendererProps) {
  const [state, setState] = useState<WorkshopState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    async function loadWorkshop() {
      try {
        setState({ status: 'loading' })

        console.log(`Loading workshop: ${user}/${repo}/${file}`)

        // Step 1: Fetch markdown from GitHub (via proxy, with IndexedDB cache)
        const markdown = await fetchGitHubFileCached(user, repo, `${file}.md`)

        if (cancelled) return

        // Step 2: Parse frontmatter and preprocess content
        const { frontmatter, content } = parseWorkshopMarkdown(markdown)

        if (cancelled) return

        // Step 3: Extract table of contents
        const toc = extractToC(content)

        // Step 4: Compile MDX in browser (with in-memory cache)
        const cacheKey = `${user}/${repo}/${file}`
        const mdxModule = await evaluateMDXCached(content, {
          cacheKey,
          scope: { frontmatter },
        })

        if (cancelled) return

        // Step 5: Set state with compiled component
        setState({
          status: 'success',
          frontmatter,
          toc,
          MDXContent: mdxModule.default,
        })

        console.log(`✓ Workshop loaded: ${frontmatter.title}`)
      } catch (error) {
        if (cancelled) return

        console.error('Workshop loading error:', error)
        setState({
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    loadWorkshop()

    return () => {
      cancelled = true
    }
  }, [user, repo, file])

  // Loading state
  if (state.status === 'loading') {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            gap: 2,
          }}
        >
          <CircularProgress />
          <Box sx={{ textAlign: 'center' }}>
            Loading workshop...
            <br />
            <Box component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              {user}/{repo}/{file}
            </Box>
          </Box>
        </Box>
      </Container>
    )
  }

  // Error state
  if (state.status === 'error') {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => window.location.reload()}>
                Retry
              </Button>
            }
          >
            <strong>Failed to load workshop</strong>
            <br />
            {state.error}
            <br />
            <br />
            <Box component="span" sx={{ fontSize: '0.875rem' }}>
              Workshop: {user}/{repo}/{file}
            </Box>
          </Alert>
        </Box>
      </Container>
    )
  }

  // Success state
  const { frontmatter, toc, MDXContent } = state

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', gap: 3, py: 4 }}>
        {/* Main content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Workshop metadata */}
          <Frontmatter data={frontmatter} />

          {/* MDX content - compiled in browser */}
          <Box sx={{ mt: 3 }}>
            <MDXContent components={mdxComponents} />
          </Box>
        </Box>

        {/* Table of contents sidebar */}
        {toc.length > 0 && (
          <Box
            sx={{
              width: 240,
              display: { xs: 'none', md: 'block' },
            }}
          >
            <TableOfContents items={toc} />
          </Box>
        )}
      </Box>
    </Container>
  )
}
