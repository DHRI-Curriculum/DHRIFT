import NextLink from 'next/link'
import { Link as MuiLink } from '@mui/material'
import type { ReactNode } from 'react'

interface LinkProps {
  children: ReactNode
  href: string
  workshop?: string // For internal workshop links
}

/**
 * Link component
 * Handles both internal workshop links and external URLs
 */
export function Link({ children, href, workshop }: LinkProps) {
  // If workshop prop is provided, create internal link
  if (workshop) {
    // Assuming workshop format: user/repo/file
    const [user, repo, file] = workshop.split('/')
    const internalHref = `/workshop/${user}/${repo}/${file}`

    return (
      <MuiLink component={NextLink} href={internalHref}>
        {children}
      </MuiLink>
    )
  }

  // External link
  if (href.startsWith('http')) {
    return (
      <MuiLink href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </MuiLink>
    )
  }

  // Internal Next.js link
  return (
    <MuiLink component={NextLink} href={href}>
      {children}
    </MuiLink>
  )
}
