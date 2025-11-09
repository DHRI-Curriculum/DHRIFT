'use client'

import { Box, Typography, Chip } from '@mui/material'
import type { ReactNode } from 'react'

interface KeywordsProps {
  children: ReactNode
}

/**
 * Keywords/Glossary component
 * Displays key terms and their definitions
 */
export function Keywords({ children }: KeywordsProps) {
  const terms = parseKeywords(children)

  return (
    <Box
      sx={{
        my: 2,
        p: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Key Terms
      </Typography>
      <Box component="dl" sx={{ m: 0 }}>
        {terms.map((term, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box component="dt" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Chip
                label={term.term}
                size="small"
                color="primary"
                sx={{ mr: 1, fontWeight: 'bold' }}
              />
            </Box>
            <Typography component="dd" sx={{ ml: 0, color: 'text.secondary' }}>
              {term.definition}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

/**
 * Parse keywords from children
 * Expected format: "- Term: Definition"
 */
function parseKeywords(children: ReactNode): Array<{
  term: string
  definition: string
}> {
  const content = String(children)
  const lines = content.split('\n').filter(line => line.trim().startsWith('-'))

  return lines.map(line => {
    const [term, ...defParts] = line.trim().substring(1).split(':')
    return {
      term: term.trim(),
      definition: defParts.join(':').trim(),
    }
  })
}
