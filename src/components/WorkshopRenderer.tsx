'use client'

import { Box, Container, Typography, Pagination, Grid2 as Grid } from '@mui/material'
import { useState, useMemo } from 'react'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import {
  Info,
  Secret,
  Quiz,
  Keywords,
  PythonREPL,
  RREPL,
  CodeEditor,
  Terminal,
  CommandLine,
  JSTerminal,
  WebVM,
  Jupyter,
  Download,
  Link,
  img,
} from './mdx'
import { Frontmatter } from './Frontmatter'
import { TableOfContents } from './TableOfContents'
import { ProgressBar } from './ProgressBar'
import type { WorkshopFrontmatter } from '@/types/workshop'
import { splitIntoPages, extractToC } from '@/lib/mdx'

interface WorkshopRendererProps {
  content: string
  frontmatter: WorkshopFrontmatter
}

/**
 * Client-side workshop renderer
 * Converts MDX content to React components and handles pagination
 */
export function WorkshopRenderer({
  content,
  frontmatter,
}: WorkshopRendererProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Split content into pages
  const pages = useMemo(() => splitIntoPages(content), [content])

  // Extract table of contents
  const toc = useMemo(() => extractToC(content), [content])

  // MDX components mapping
  const components = {
    // Custom components
    Info,
    Secret,
    Quiz,
    Keywords,
    PythonREPL,
    RREPL,
    CodeEditor,
    Terminal,
    CommandLine,
    JSTerminal,
    WebVM,
    Jupyter,
    Download,
    Link,
    // Override default img with zoom
    img,
    // Kebab-case variants for backward compatibility
    'dhrift-info': Info,
    'dhrift-secret': Secret,
    'dhrift-quiz': Quiz,
    'dhrift-keywords': Keywords,
    'dhrift-codeeditor': CodeEditor,
    'dhrift-terminal': Terminal,
    'dhrift-commandline': CommandLine,
    'dhrift-jsterminal': JSTerminal,
    'dhrift-webvm': WebVM,
    'dhrift-jupyter': Jupyter,
    'dhrift-download': Download,
  }

  // Render current page MDX
  const [MDXContent, setMDXContent] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Compile and render MDX
  useMemo(() => {
    const compileMDX = async () => {
      try {
        const pageContent = pages[currentPage - 1]

        const result = await evaluate(pageContent, {
          ...runtime,
          development: false,
          useMDXComponents: () => components,
        } as any)

        setMDXContent(() => result.default)
        setError(null)
      } catch (err: any) {
        console.error('MDX compilation error:', err)
        setError(err.message)
      }
    }

    compileMDX()
  }, [currentPage, pages])

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Frontmatter header */}
        <Frontmatter frontmatter={frontmatter} />

        {/* Progress bar */}
        {pages.length > 1 && (
          <ProgressBar current={currentPage} total={pages.length} />
        )}

        {/* Main content with sidebar */}
        <Grid container spacing={3}>
          {/* Table of Contents (desktop only) */}
          {toc.length > 0 && (
            <Grid
              size={{ xs: 12, md: 3 }}
              sx={{
                display: { xs: 'none', md: 'block' },
              }}
            >
              <TableOfContents items={toc} />
            </Grid>
          )}

          {/* Main content */}
          <Grid size={{ xs: 12, md: toc.length > 0 ? 9 : 12 }}>
            <Box>
              {/* MDX Content */}
              <Box
                sx={{
                  '& h1': { fontSize: '2rem', fontWeight: 600, mt: 4, mb: 2 },
                  '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 3, mb: 2 },
                  '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1 },
                  '& p': { mb: 2, lineHeight: 1.7 },
                  '& ul, & ol': { mb: 2, pl: 4 },
                  '& li': { mb: 0.5 },
                  '& code': {
                    bgcolor: 'grey.100',
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 0.5,
                    fontSize: '0.875em',
                    fontFamily: 'monospace',
                  },
                  '& pre': {
                    bgcolor: 'grey.900',
                    color: 'grey.100',
                    p: 2,
                    borderRadius: 1,
                    overflow: 'auto',
                    mb: 2,
                    '& code': {
                      bgcolor: 'transparent',
                      p: 0,
                    },
                  },
                  '& kbd': {
                    bgcolor: 'grey.200',
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 0.5,
                    fontSize: '0.875em',
                    fontFamily: 'monospace',
                    border: '1px solid',
                    borderColor: 'grey.400',
                  },
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 1,
                  },
                }}
              >
                {error ? (
                  <Typography color="error">
                    Error rendering content: {error}
                  </Typography>
                ) : MDXContent ? (
                  <MDXContent />
                ) : (
                  <Typography>Loading...</Typography>
                )}
              </Box>

              {/* Pagination */}
              {pages.length > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={pages.length}
                    page={currentPage}
                    onChange={(_, page) => setCurrentPage(page)}
                    color="primary"
                    size="large"
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
