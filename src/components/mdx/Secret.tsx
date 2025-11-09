'use client'

import { useState, type ReactNode } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface SecretProps {
  children: ReactNode
  title?: string
}

/**
 * Secret/collapsible component
 * Hides content until user expands it (for solutions, hints, etc.)
 */
export function Secret({ children, title = 'Show Solution' }: SecretProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{ my: 2 }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}
