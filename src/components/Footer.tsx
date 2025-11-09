'use client'

import { Box, Container, Typography, Link as MuiLink, Divider } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'

/**
 * Footer component with credits and links
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
          {/* Left side - Credits */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              DHRIFT
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Digital Humanities Research Infrastructure for Teaching
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              © {currentYear} DHRI Curriculum. Licensed under MIT.
            </Typography>
          </Box>

          {/* Right side - Links */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GitHubIcon fontSize="small" />
              <MuiLink
                href="https://github.com/DHRI-Curriculum/DHRIFT"
                target="_blank"
                rel="noopener noreferrer"
                color="text.secondary"
              >
                GitHub Repository
              </MuiLink>
            </Box>
            <MuiLink
              href="https://github.com/DHRI-Curriculum/workshops"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
            >
              Workshop Content
            </MuiLink>
            <MuiLink
              href="https://www.dhinstitutes.org/"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
            >
              DHRI Website
            </MuiLink>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block' }}>
          Funded by the National Endowment for the Humanities
        </Typography>
      </Container>
    </Box>
  )
}
