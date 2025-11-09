'use client'

import { Alert, AlertTitle } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import type { ReactNode } from 'react'

interface InfoProps {
  children: ReactNode
  title?: string
}

/**
 * Info callout component
 * Displays informational content in a highlighted box
 */
export function Info({ children, title }: InfoProps) {
  return (
    <Alert
      severity="info"
      icon={<InfoIcon />}
      sx={{
        my: 2,
        '& .MuiAlert-message': {
          width: '100%',
        },
      }}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  )
}
