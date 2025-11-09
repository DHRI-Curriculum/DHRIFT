'use client'

import { Card, CardContent, Typography, Chip, Box } from '@mui/material'
import Link from 'next/link'
import CodeIcon from '@mui/icons-material/Code'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

interface WorkshopCardProps {
  title: string
  slug: string
  description?: string
  language?: string
  estimatedTime?: string
  href: string
}

/**
 * Workshop card component
 * Displays a workshop with metadata
 */
export function WorkshopCard({
  title,
  slug,
  description,
  language,
  estimatedTime,
  href,
}: WorkshopCardProps) {
  return (
    <Card
      component={Link}
      href={href}
      sx={{
        textDecoration: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
          {language && (
            <Chip
              icon={<CodeIcon fontSize="small" />}
              label={language}
              size="small"
              variant="outlined"
            />
          )}
          {estimatedTime && (
            <Chip
              icon={<AccessTimeIcon fontSize="small" />}
              label={estimatedTime}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
