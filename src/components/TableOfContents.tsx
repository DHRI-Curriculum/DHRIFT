'use client'

import { Box, List, ListItemButton, ListItemText, Typography, Paper } from '@mui/material'
import type { ToCItem } from '@/lib/mdx'

interface TableOfContentsProps {
  items: ToCItem[]
  onItemClick?: (slug: string) => void
}

/**
 * Table of Contents component
 * Displays hierarchical navigation for workshop sections
 */
export function TableOfContents({ items, onItemClick }: TableOfContentsProps) {
  if (items.length === 0) return null

  const handleClick = (slug: string) => {
    if (onItemClick) {
      onItemClick(slug)
    } else {
      // Scroll to element
      const element = document.getElementById(slug)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        position: 'sticky',
        top: 16,
        maxHeight: 'calc(100vh - 32px)',
        overflow: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Contents
      </Typography>
      <List component="nav" dense>
        {items.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() => handleClick(item.slug)}
            sx={{
              pl: item.level * 2,
              py: 0.5,
            }}
          >
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                variant: item.level === 1 ? 'subtitle2' : 'body2',
                fontWeight: item.level === 1 ? 600 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  )
}
