'use client'

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { useTheme } from 'next-themes'
import { lightTheme, darkTheme } from '@/lib/theme'
import { useEffect, useState, ReactNode } from 'react'

/**
 * Inner theme provider that applies MUI theme based on next-themes
 */
function MuiThemeApplier({ children }: { children: ReactNode }) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid hydration mismatch
  if (!mounted) {
    return <MuiThemeProvider theme={lightTheme}>{children}</MuiThemeProvider>
  }

  const currentTheme = theme === 'system' ? systemTheme : theme
  const muiTheme = currentTheme === 'dark' ? darkTheme : lightTheme

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
}

/**
 * Combined theme provider
 * Wraps app with both next-themes and MUI theme providers
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light">
      <MuiThemeApplier>{children}</MuiThemeApplier>
    </NextThemeProvider>
  )
}
