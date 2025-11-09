import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Script from 'next/script'
import { Box } from '@mui/material'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load Pyodide from CDN */}
        <Script
          src="https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js"
          strategy="beforeInteractive"
        />
        {/* Prevent FOUC */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            try {
              const theme = localStorage.getItem('theme') || 'light';
              document.documentElement.classList.add(theme);
            } catch (e) {}
          `}
        </Script>
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <CssBaseline />
            <ErrorBoundary>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                }}
              >
                <Header />
                <Box component="main" sx={{ flex: 1 }}>
                  {children}
                </Box>
                <Footer />
              </Box>
            </ErrorBoundary>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
