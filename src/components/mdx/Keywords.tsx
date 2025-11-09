'use client'

import { Box, Typography, Chip, Alert } from '@mui/material'
import { type ReactNode } from 'react'
import { parseKeywordsContent, validateParsedContent, parseComponentContent } from '@/lib/component-parser'
import { ComponentErrorBoundary } from '@/components/ComponentErrorBoundary'

interface KeywordsProps {
  children: ReactNode
}

/**
 * Keywords/Glossary component with robust parsing
 *
 * Supports multiple formats:
 * - "term: definition" format
 * - "term - definition" format
 * - Plain list of terms (no definitions)
 */
export function Keywords({ children }: KeywordsProps) {
  // Parse using flexible parser
  const parsedItems = parseComponentContent(children)
  const validation = validateParsedContent(parsedItems)

  // Handle parsing errors gracefully
  if (!validation.valid) {
    return (
      <Alert severity="warning" sx={{ my: 2 }}>
        Keywords could not be displayed: {validation.error}
      </Alert>
    )
  }

  // Extract terms and definitions
  const terms = parseKeywordsContent(children)

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
            {term.definition && (
              <Typography component="dd" sx={{ ml: 0, color: 'text.secondary' }}>
                {term.definition}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

/**
 * Wrap Keywords with error boundary for production use
 */
export function KeywordsWithErrorBoundary(props: KeywordsProps) {
  return (
    <ComponentErrorBoundary componentName="Keywords">
      <Keywords {...props} />
    </ComponentErrorBoundary>
  )
}
