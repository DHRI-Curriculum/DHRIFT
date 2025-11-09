'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, Button, TextField, Paper, Typography, CircularProgress } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

/**
 * R REPL component
 * Interactive R interpreter using webR
 */
export function RREPL() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const webRRef = useRef<any>(null)
  const shelterRef = useRef<any>(null)

  useEffect(() => {
    loadWebR()
  }, [])

  async function loadWebR() {
    try {
      // @ts-ignore - webR loaded via CDN
      const { WebR } = await import('@r-wasm/webr')

      const webR = new WebR({
        baseUrl: 'https://webr.r-wasm.org/v0.4.2/',
      })

      await webR.init()

      // Create shelter for memory management
      const shelter = await new webR.Shelter()

      webRRef.current = webR
      shelterRef.current = shelter
      setIsLoading(false)
    } catch (error) {
      setOutput([`Error loading webR: ${error}`])
      setIsLoading(false)
    }
  }

  async function runCode() {
    if (!webRRef.current || !code.trim()) return

    setIsRunning(true)
    setOutput([]) // Clear previous output

    try {
      const result = await shelterRef.current.captureR(code, {
        withAutoprint: true,
        captureStreams: true,
        captureConditions: false,
      })

      const outputLines: string[] = []

      // Collect output
      for (const output of result.output) {
        if (output.type === 'stdout' || output.type === 'stderr') {
          outputLines.push(output.data)
        }
      }

      // Add result if available
      if (result.result) {
        const resultStr = await webRRef.current.evalRString(`capture.output(print(${result.result}))`)
        outputLines.push(resultStr)
      }

      setOutput(outputLines.length > 0 ? outputLines : ['(No output)'])
    } catch (error: any) {
      setOutput([`Error: ${error.message}`])
    }

    setIsRunning(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Run on Shift+Enter
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      runCode()
    }
  }

  return (
    <Box sx={{ my: 2 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          R REPL
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">
              Loading R interpreter...
            </Typography>
          </Box>
        ) : (
          <>
            <TextField
              multiline
              fullWidth
              minRows={3}
              maxRows={10}
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter R code here... (Shift+Enter to run)"
              sx={{
                fontFamily: 'monospace',
                '& textarea': {
                  fontFamily: 'monospace',
                },
              }}
            />

            <Button
              variant="contained"
              startIcon={isRunning ? <CircularProgress size={16} /> : <PlayArrowIcon />}
              onClick={runCode}
              disabled={isRunning || !code.trim()}
              sx={{ mt: 1 }}
            >
              {isRunning ? 'Running...' : 'Run'}
            </Button>

            {output.length > 0 && (
              <Paper
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'grey.900',
                  color: 'grey.100',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  maxHeight: '300px',
                  overflow: 'auto',
                }}
              >
                {output.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </Paper>
            )}
          </>
        )}
      </Paper>
    </Box>
  )
}
