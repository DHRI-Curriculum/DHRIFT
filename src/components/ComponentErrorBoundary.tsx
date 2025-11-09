'use client'

/**
 * Component Error Boundary
 *
 * Wraps individual components to catch rendering errors without
 * breaking the entire page. Used by rehype-wrapper plugin.
 */

import { Component, type ReactNode } from 'react'
import { Alert, AlertTitle, Box, Collapse, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

interface Props {
  children: ReactNode
  componentName?: string
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: any
  expanded: boolean
}

/**
 * Component-level error boundary
 * Catches errors in child components and displays user-friendly message
 */
export class ComponentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      expanded: false,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Component rendering error:', {
      component: this.props.componentName,
      error,
      errorInfo,
    })

    this.setState({
      error,
      errorInfo,
    })
  }

  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <Box sx={{ my: 2 }}>
          <Alert
            severity="error"
            action={
              <IconButton
                size="small"
                onClick={this.toggleExpanded}
                aria-label={this.state.expanded ? 'collapse' : 'expand'}
              >
                {this.state.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
          >
            <AlertTitle>
              {this.props.componentName
                ? `Error rendering ${this.props.componentName}`
                : 'Component rendering error'}
            </AlertTitle>
            This component could not be displayed. The workshop content may need adjustment.
            <Collapse in={this.state.expanded}>
              <Box sx={{ mt: 2, fontSize: '0.875rem', fontFamily: 'monospace' }}>
                <strong>Error:</strong> {this.state.error?.message}
                {this.state.errorInfo?.componentStack && (
                  <>
                    <br />
                    <strong>Component Stack:</strong>
                    <pre style={{ fontSize: '0.75rem', overflow: 'auto' }}>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </>
                )}
              </Box>
            </Collapse>
          </Alert>
        </Box>
      )
    }

    return this.props.children
  }
}

/**
 * ErrorFallback component for simple use cases
 */
export function ErrorFallback({
  componentName,
  error,
}: {
  componentName?: string
  error?: string
}) {
  return (
    <Alert severity="warning" sx={{ my: 2 }}>
      <AlertTitle>
        {componentName ? `${componentName} unavailable` : 'Content unavailable'}
      </AlertTitle>
      {error || 'This content could not be displayed.'}
    </Alert>
  )
}
