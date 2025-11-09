'use client'

import { useState, useRef, useEffect } from 'react'
import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Monaco Editor (SSR: false)
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <CircularProgress />
    </Box>
  ),
})

interface CodeEditorProps {
  children?: ReactNode
  language?: string
  height?: string
}

/**
 * Code Editor component with execution capability
 * Supports Python, JavaScript, R
 */
export function CodeEditor({
  children,
  language = 'python',
  height = '200px',
}: CodeEditorProps) {
  // Extract initial code from children
  const initialCode = children ? String(children).trim() : ''

  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const executorRef = useRef<any>(null)

  useEffect(() => {
    // Load appropriate executor based on language
    if (language === 'python') {
      loadPyodide()
    } else if (language === 'javascript') {
      setIsReady(true) // JS is always ready
    }
  }, [language])

  async function loadPyodide() {
    try {
      // @ts-ignore
      const pyodide = await globalThis.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
      })

      pyodide.setStdout({
        batched: (text: string) => {
          setOutput(prev => [...prev, text])
        },
      })

      executorRef.current = pyodide
      setIsReady(true)
    } catch (error) {
      setOutput([`Error loading Python: ${error}`])
    }
  }

  async function runCode() {
    setIsRunning(true)
    setOutput([])

    try {
      if (language === 'python') {
        if (!executorRef.current) {
          setOutput(['Python interpreter not loaded'])
          return
        }

        const result = await executorRef.current.runPythonAsync(code)
        if (result !== undefined && result !== null) {
          setOutput(prev => [...prev, String(result)])
        }
      } else if (language === 'javascript') {
        // Capture console.log
        const logs: string[] = []
        const originalLog = console.log

        console.log = (...args: any[]) => {
          logs.push(args.map(String).join(' '))
          originalLog(...args)
        }

        try {
          // eslint-disable-next-line no-eval
          const result = eval(code)
          if (result !== undefined) {
            logs.push(String(result))
          }
        } finally {
          console.log = originalLog
        }

        setOutput(logs)
      }
    } catch (error: any) {
      setOutput(prev => [...prev, `Error: ${error.message}`])
    }

    setIsRunning(false)
  }

  const getLanguage = () => {
    const langMap: Record<string, string> = {
      python: 'python',
      javascript: 'javascript',
      js: 'javascript',
      r: 'r',
    }
    return langMap[language.toLowerCase()] || 'plaintext'
  }

  return (
    <Box sx={{ my: 2 }}>
      <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'grey.100', px: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2">
            Code Editor ({language})
          </Typography>
        </Box>

        <MonacoEditor
          height={height}
          language={getLanguage()}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />

        <Box sx={{ p: 2, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            variant="contained"
            size="small"
            startIcon={isRunning ? <CircularProgress size={16} /> : <PlayArrowIcon />}
            onClick={runCode}
            disabled={!isReady || isRunning || !code.trim()}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>

          {!isReady && language === 'python' && (
            <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
              Loading Python interpreter...
            </Typography>
          )}
        </Box>

        {output.length > 0 && (
          <Paper
            square
            sx={{
              p: 2,
              bgcolor: 'grey.900',
              color: 'grey.100',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              maxHeight: '200px',
              overflow: 'auto',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="caption" sx={{ color: 'grey.400', display: 'block', mb: 1 }}>
              Output:
            </Typography>
            {output.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </Paper>
        )}
      </Paper>
    </Box>
  )
}
