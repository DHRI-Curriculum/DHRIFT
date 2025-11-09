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
  const instUser = searchParams.get('instUser')
  const instRepo = searchParams.get('instRepo')
  const file = searchParams.get('file')

  // Validate required parameters
  if (!instUser || !instRepo || !file) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="error">
            <strong>Missing required parameters</strong>
            <br />
            Please provide instUser, instRepo, and file parameters in the URL:
            <br />
            <code>/dynamic?instUser=USER&instRepo=REPO&file=FILE</code>
          </Alert>
        </Box>
      </Container>
    )
  }

  // Render the workshop
  return <WorkshopClientRenderer user={instUser} repo={instRepo} file={file} />
}

/**
 * Workshop page - static shell for client-side rendering
 * Route: /dynamic?instUser=X&instRepo=Y&file=Z
 *
 * DHRIFT Architecture:
 * - Static HTML exported (app shell only)
 * - Workshops fetched dynamically at RUNTIME in browser
 * - Users provide their own workshop repos via URL query params
 * - MDX compiled client-side with full plugin pipeline
 * - GitHub API accessed directly with owner's token (visible in bundle)
 * - IndexedDB caching for performance and rate limit management
 */
export default function DynamicWorkshopPage() {
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
