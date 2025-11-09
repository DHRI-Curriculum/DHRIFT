import { Container, Typography, Box, Card, CardContent, Grid2 as Grid, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import { fetchInstituteConfig, listWorkshopFiles } from '@/lib/github'
import { notFound } from 'next/navigation'

interface PageProps {
  searchParams: Promise<{
    instUser?: string
    instRepo?: string
  }>
}

/**
 * Institute landing page
 * Displays event info and workshop listing
 * Route: /inst?instUser=X&instRepo=Y
 */
export default async function InstitutePage({ searchParams }: PageProps) {
  const params = await searchParams
  const { instUser, instRepo } = params

  // Default to DHRI curriculum if not specified
  const user = instUser || 'dhri-curriculum'
  const repo = instRepo || 'dhrift-site-template'

  try {
    // Fetch institute configuration
    const config = await fetchInstituteConfig(user, repo)

    // Fetch workshop list
    const workshopFiles = await listWorkshopFiles(
      config.workshopsuser,
      config.workshopsrepo
    )

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

          <Grid container spacing={3}>
            {workshopFiles.map(file => {
              const slug = file.replace('.md', '')
              const title = slug
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={file}>
                  <Card
                    component={Link}
                    href={`/workshop/${config.workshopsuser}/${config.workshopsrepo}/${slug}`}
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

          {/* Organizers */}
          {config.organizers && config.organizers.length > 0 && (
            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Organizers
              </Typography>
              <Typography variant="body1">
                {config.organizers.join(', ')}
              </Typography>
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
                    {sponsor.logo ? (
                      <Box
                        component="img"
                        src={sponsor.logo}
                        alt={sponsor.name || `Sponsor ${index + 1}`}
                        sx={{ width: '100%', height: 'auto' }}
                      />
                    ) : (
                      <Typography>{sponsor.name || sponsor}</Typography>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    )
  } catch (error) {
    console.error('Error loading institute:', error)
    notFound()
  }
}

export async function generateMetadata({ searchParams }: PageProps) {
  const params = await searchParams
  const user = params.instUser || 'dhri-curriculum'
  const repo = params.instRepo || 'dhrift-site-template'

  try {
    const config = await fetchInstituteConfig(user, repo)
    return {
      title: `${config.event || 'Institute'} | DHRIFT`,
      description: config.organization,
    }
  } catch {
    return {
      title: 'Institute | DHRIFT',
    }
  }
}
