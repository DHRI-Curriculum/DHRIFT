'use client'

import { useRef, useEffect } from 'react'
import { Box, Paper, Typography } from '@mui/material'

// Extend Window interface for jQuery
declare global {
  interface Window {
    jQuery?: any
  }
}

/**
 * JavaScript Terminal using jquery.terminal
 * Allows executing JavaScript code in a terminal interface
 */
export function JSTerminal() {
  const idRef = useRef<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  if (!idRef.current) {
    idRef.current = 'js-term-' + Math.random().toString(36).slice(2)
  }

  useEffect(() => {
    // Dynamically load jquery.terminal
    const loadTerminal = async () => {
      if (typeof window === 'undefined') return

      // Load jQuery if not present
      if (!window.jQuery) {
        const jqueryScript = document.createElement('script')
        jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
        jqueryScript.async = true
        document.head.appendChild(jqueryScript)

        await new Promise((resolve) => {
          jqueryScript.onload = resolve
        })
      }

      // Load jquery.terminal
      if (!window.jQuery?.terminal) {
        const termScript = document.createElement('script')
        termScript.src = 'https://cdn.jsdelivr.net/npm/jquery.terminal@2.31.1/js/jquery.terminal.min.js'
        termScript.async = true
        document.head.appendChild(termScript)

        const termCSS = document.createElement('link')
        termCSS.rel = 'stylesheet'
        termCSS.href = 'https://cdn.jsdelivr.net/npm/jquery.terminal@2.31.1/css/jquery.terminal.min.css'
        document.head.appendChild(termCSS)

        await new Promise((resolve) => {
          termScript.onload = resolve
        })
      }

      // Initialize terminal
      const $ = window.jQuery
      const $el = $(`#${idRef.current}`)

      if ($el.length > 0 && !$el.data('terminal')) {
        // Safe eval function
        const safeEval = (s: string) => {
          try {
            return eval(`void (safeEval = ${safeEval.toString()}); ${s}`)
          } catch (e: any) {
            throw e
          }
        }

        $el.terminal(
          function (this: any, command: string) {
            if (command !== '') {
              try {
                const result = safeEval(command)
                if (result !== undefined) {
                  this.echo(String(result))
                }
              } catch (e: any) {
                this.error(String(e))
              }
            }
          },
          {
            greetings: 'JavaScript Terminal - Type JavaScript code to execute',
            prompt: '> ',
            name: 'js_terminal',
            height: 400,
          }
        )
      }
    }

    loadTerminal()

    return () => {
      if (typeof window !== 'undefined' && window.jQuery) {
        const $ = window.jQuery
        const $el = $(`#${idRef.current}`)
        const inst = $el.data('terminal')
        if (inst && typeof inst.destroy === 'function') {
          try {
            inst.destroy()
          } catch (e) {
            // Ignore cleanup errors
          }
        }
      }
    }
  }, [])

  return (
    <Box sx={{ my: 2 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          JavaScript Terminal
        </Typography>
        <div
          id={idRef.current}
          ref={containerRef}
          style={{
            minHeight: '300px',
            backgroundColor: '#000',
            color: '#0f0',
          }}
        />
      </Paper>
    </Box>
  )
}
