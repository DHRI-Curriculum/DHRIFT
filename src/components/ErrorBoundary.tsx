'use client'

import { Component, ReactNode } from 'react'
import { Box, Button, Container, Typography, Paper } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import RefreshIcon from '@mui/icons-material/Refresh'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

/**
 * Error boundary component
 * Catches errors in child components and displays a fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '50vh',
              py: 4,
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 4,
                textAlign: 'center',
                borderTop: '4px solid',
                borderColor: 'error.main',
              }}
            >
              <ErrorOutlineIcon
                sx={{ fontSize: 64, color: 'error.main', mb: 2 }}
              />
              <Typography variant="h4" gutterBottom>
                Oops! Something went wrong
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                We encountered an error while rendering this page.
              </Typography>
              {this.state.error && (
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    my: 2,
                    bgcolor: 'grey.100',
                    textAlign: 'left',
                    maxWidth: '100%',
                    overflow: 'auto',
                  }}
                >
                  <Typography
                    variant="caption"
                    component="pre"
                    sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                  >
                    {this.state.error.message}
                  </Typography>
                </Paper>
              )}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={this.handleReset}
                >
                  Try Again
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => window.location.href = '/inst'}
                >
                  Go Home
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
      )
    }

    return this.props.children
  }
}
