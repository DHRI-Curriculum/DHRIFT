import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@/lib/theme'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'DHRIFT - Digital Humanities Research Infrastructure for Teaching',
  description:
    'Interactive digital humanities workshops and educational resources',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Load Pyodide from CDN */}
        <Script
          src="https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
