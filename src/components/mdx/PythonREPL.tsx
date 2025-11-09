'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, Button, TextField, Paper, Typography, CircularProgress } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

/**
 * Python REPL component
 * Interactive Python interpreter using Pyodide
 */
export function PythonREPL() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const pyodideRef = useRef<any>(null)

  useEffect(() => {
    loadPyodide()
  }, [])

  async function loadPyodide() {
    try {
      // @ts-ignore - Pyodide is loaded via CDN
      const pyodide = await globalThis.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
      })

      // Capture stdout
      pyodide.setStdout({
        batched: (text: string) => {
          setOutput(prev => [...prev, text])
        },
      })

      pyodideRef.current = pyodide
      setIsLoading(false)
    } catch (error) {
      setOutput([`Error loading Pyodide: ${error}`])
      setIsLoading(false)
    }
  }

  async function runCode() {
    if (!pyodideRef.current || !code.trim()) return

    setIsRunning(true)
    setOutput([]) // Clear previous output

    try {
      const result = await pyodideRef.current.runPythonAsync(code)

      // If there's a return value, show it
      if (result !== undefined && result !== null) {
        setOutput(prev => [...prev, String(result)])
      }
    } catch (error: any) {
      setOutput(prev => [...prev, `Error: ${error.message}`])
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
          Python REPL
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">
              Loading Python interpreter...
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
              placeholder="Enter Python code here... (Shift+Enter to run)"
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
