'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid2 as Grid,
  CircularProgress,
  Alert,
} from '@mui/material'
import Link from 'next/link'
import { fetchGitHubFileCached } from '@/lib/github-client'
import yaml from 'js-yaml'

interface InstituteConfig {
  event?: string
  organization?: string
  datestart?: string
  enddate?: string
  workshopsuser: string
  workshopsrepo: string
  organizers?: string[]
  sponsors?: Array<{ name?: string; logo?: string } | string>
}

type InstituteState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; config: InstituteConfig; workshops: string[] }

/**
 * Inner component that uses searchParams
 */
function InstituteContent() {
  const searchParams = useSearchParams()
  const instUser = searchParams.get('instUser') || 'dhri-curriculum'
  const instRepo = searchParams.get('instRepo') || 'dhrift-site-template'

  const [state, setState] = useState<InstituteState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    async function loadInstitute() {
      try {
        setState({ status: 'loading' })

        // Fetch institute config
        const configContent = await fetchGitHubFileCached(instUser, instRepo, 'config.yml')
        const config = yaml.load(configContent) as InstituteConfig

        if (cancelled) return

        // Fetch workshop directory listing
        const workshopsUser = config.workshopsuser || instUser
        const workshopsRepo = config.workshopsrepo || 'workshops'

        // For now, use a basic list - could enhance with GitHub API directory listing
        const workshops: string[] = []

        setState({
          status: 'success',
          config,
          workshops,
        })
      } catch (error) {
        if (cancelled) return

        console.error('Error loading institute:', error)
        setState({
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    loadInstitute()

    return () => {
      cancelled = true
    }
  }, [instUser, instRepo])

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
            Loading institute...
            <br />
            <Box component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              {instUser}/{instRepo}
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
          <Alert severity="error">
            <strong>Failed to load institute</strong>
            <br />
            {state.error}
            <br />
            <br />
            <Box component="span" sx={{ fontSize: '0.875rem' }}>
              Institute: {instUser}/{instRepo}
            </Box>
          </Alert>
        </Box>
      </Container>
    )
  }

  // Success state
  const { config, workshops } = state

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            {config.event || 'DHRIFT Workshops'}
          </Typography>
          {config.organization && (
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {config.organization}
            </Typography>
          )}
          {config.datestart && (
            <Typography variant="body1" color="text.secondary">
              {config.datestart}
              {config.enddate && ` - ${config.enddate}`}
            </Typography>
          )}
        </Box>

        {/* Workshops Grid */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          Available Workshops
        </Typography>

        {workshops.length > 0 ? (
          <Grid container spacing={3}>
            {workshops.map(file => {
              const slug = file.replace('.md', '')
              const title = slug
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={file}>
                  <Card
                    component={Link}
                    href={`/workshop?user=${config.workshopsuser}&repo=${config.workshopsrepo}&file=${slug}`}
                    sx={{
                      textDecoration: 'none',
                      height: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Click to view workshop
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        ) : (
          <Alert severity="info">
            No workshops found. Workshops will be displayed here when available.
          </Alert>
        )}

        {/* Organizers */}
        {config.organizers && config.organizers.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Organizers
            </Typography>
            <Typography variant="body1">{config.organizers.join(', ')}</Typography>
          </Box>
        )}

        {/* Sponsors */}
        {config.sponsors && config.sponsors.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Sponsors
            </Typography>
            <Grid container spacing={2}>
              {config.sponsors.map((sponsor: any, index: number) => (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                  {typeof sponsor === 'object' && sponsor.logo ? (
                    <Box
                      component="img"
                      src={sponsor.logo}
                      alt={sponsor.name || `Sponsor ${index + 1}`}
                      sx={{ width: '100%', height: 'auto' }}
                    />
                  ) : (
                    <Typography>
                      {typeof sponsor === 'string' ? sponsor : sponsor.name || `Sponsor ${index + 1}`}
                    </Typography>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  )
}

/**
 * Institute landing page (client-side)
 * Displays event info and workshop listing
 * Route: /inst?instUser=X&instRepo=Y
 */
export default function InstitutePage() {
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
      <InstituteContent />
    </Suspense>
  )
}
