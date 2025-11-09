'use client'

import { Button } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import type { ReactNode } from 'react'

interface DownloadProps {
  children: ReactNode
  filename?: string
  label?: string
}

/**
 * Download component
 * Creates a downloadable file from content
 */
export function Download({ children, filename = 'file.txt', label = 'Download' }: DownloadProps) {
  const handleDownload = () => {
    // Extract text content from children
    const content = extractTextContent(children)

    // Create blob
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    // Create temporary link and click it
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      variant="outlined"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
      sx={{ my: 1 }}
    >
      {label}
    </Button>
  )
}

/**
 * Extract text content from React children
 */
function extractTextContent(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (!children) return ''
  if (Array.isArray(children)) return children.map(extractTextContent).join('')

  // For React elements, try to extract text
  if (typeof children === 'object' && 'props' in children) {
    return extractTextContent((children as any).props.children)
  }

  return String(children)
}
