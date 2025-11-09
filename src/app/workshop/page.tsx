'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { WorkshopClientRenderer } from '@/components/WorkshopClientRenderer'
import { Container, Box, Alert, CircularProgress } from '@mui/material'

/**
 * Inner component that uses searchParams
 */
function WorkshopContent() {
  const searchParams = useSearchParams()
  const user = searchParams.get('user')
  const repo = searchParams.get('repo')
  const file = searchParams.get('file')

  // Validate required parameters
  if (!user || !repo || !file) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="error">
            <strong>Missing required parameters</strong>
            <br />
            Please provide user, repo, and file parameters in the URL:
            <br />
            <code>/workshop?user=USER&repo=REPO&file=FILE</code>
          </Alert>
        </Box>
      </Container>
    )
  }

  // Render the workshop
  return <WorkshopClientRenderer user={user} repo={repo} file={file} />
}

/**
 * Workshop page - static shell for client-side rendering
 * Route: /workshop?user=X&repo=Y&file=Z
 *
 * DHRIFT Architecture:
 * - Static HTML exported (app shell only)
 * - Workshops fetched dynamically at RUNTIME in browser
 * - Users provide their own workshop repos via URL query params
 * - MDX compiled client-side with full plugin pipeline
 * - GitHub API accessed directly with owner's token (visible in bundle)
 * - IndexedDB caching for performance and rate limit management
 */
export default function WorkshopPage() {
  return (
    <Suspense
      fallback={
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '50vh',
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      }
    >
      <WorkshopContent />
    </Suspense>
  )
}
