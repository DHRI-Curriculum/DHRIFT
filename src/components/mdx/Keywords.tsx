'use client'

import { Box, Typography, Chip } from '@mui/material'
import { type ReactNode, Children, isValidElement } from 'react'

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
 * Parse keywords from React children
 * Handles both <ul>/<ol> lists and plain text
 */
function parseKeywords(children: ReactNode): Array<{
  term: string
  definition: string
}> {
  const terms: Array<{ term: string; definition: string }> = []

  // Helper to extract text from nested children
  const extractText = (node: ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return String(node)
    if (!node) return ''
    if (Array.isArray(node)) return node.map(extractText).join('')
    if (isValidElement(node) && node.props.children) {
      return extractText(node.props.children)
    }
    return ''
  }

  // Try to find a ul or ol element
  let foundList = false
  Children.forEach(children, (child) => {
    if (isValidElement(child) && (child.type === 'ul' || child.type === 'ol')) {
      foundList = true
      // Extract li elements
      Children.forEach(child.props.children, (li) => {
        if (isValidElement(li) && li.type === 'li') {
          const text = extractText(li.props.children)
          const [term, ...defParts] = text.split(':')
          if (term && defParts.length > 0) {
            terms.push({
              term: term.trim(),
              definition: defParts.join(':').trim(),
            })
          }
        }
      })
    }
  })

  // Fallback: parse as plain text with lines starting with -
  if (!foundList) {
    const text = extractText(children)
    const lines = text.split('\n').filter(line => line.trim().startsWith('-'))
    lines.forEach(line => {
      const content = line.trim().substring(1).trim()
      const [term, ...defParts] = content.split(':')
      if (term && defParts.length > 0) {
        terms.push({
          term: term.trim(),
          definition: defParts.join(':').trim(),
        })
      }
    })
  }

  return terms
}
