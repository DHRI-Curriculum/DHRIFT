'use client'

import { useState, useRef, useEffect } from 'react'
import { Box, Paper, Typography, Button } from '@mui/material'
import TerminalIcon from '@mui/icons-material/Terminal'

interface CommandLineProps {
  type?: 'bash' | 'javascript' | 'webvm'
}

/**
 * Command Line component - wrapper for different terminal types
 * Supports:
 * - bash: Simulated bash commands (educational)
 * - javascript: JavaScript execution via jquery.terminal
 * - webvm: Full Linux via WebAssembly
 */
export function CommandLine({ type = 'bash' }: CommandLineProps) {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [currentDir, setCurrentDir] = useState('~')
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Virtual filesystem for bash simulation
  const [fileSystem, setFileSystem] = useState<Record<string, any>>({
    '~': {
      type: 'dir',
      contents: {
        'Documents': { type: 'dir', contents: {} },
        'Downloads': { type: 'dir', contents: {} },
        'Desktop': { type: 'dir', contents: {} },
        'file.txt': { type: 'file', content: 'Hello, World!' },
        'script.sh': { type: 'file', content: '#!/bin/bash\necho "Hello from script"' },
      }
    }
  })

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) {
      setHistory([...history, { command: '', output: '' }])
      setCurrentCommand('')
      return
    }

    // Add to command history
    setCommandHistory([...commandHistory, cmd])
    setHistoryIndex(-1)

    const parts = cmd.trim().split(/\s+/)
    const command = parts[0]
    const args = parts.slice(1)
    let output = ''

    // Bash command simulation
    switch (command) {
      case 'ls':
        const lsPath = args[0] || currentDir
        output = simulateLs(lsPath)
        break

      case 'pwd':
        output = currentDir
        break

      case 'cd':
        const cdResult = simulateCd(args[0])
        if (cdResult.success) {
          setCurrentDir(cdResult.newDir!)
          output = ''
        } else {
          output = cdResult.error!
        }
        break

      case 'cat':
        if (!args[0]) {
          output = 'cat: missing operand'
        } else {
          output = simulateCat(args[0])
        }
        break

      case 'echo':
        output = args.join(' ')
        break

      case 'mkdir':
        if (!args[0]) {
          output = 'mkdir: missing operand'
        } else {
          output = simulateMkdir(args[0])
        }
        break

      case 'touch':
        if (!args[0]) {
          output = 'touch: missing file operand'
        } else {
          output = simulateTouch(args[0])
        }
        break

      case 'rm':
        if (!args[0]) {
          output = 'rm: missing operand'
        } else {
          output = simulateRm(args[0])
        }
        break

      case 'grep':
        if (args.length < 2) {
          output = 'usage: grep pattern file'
        } else {
          output = simulateGrep(args[0], args[1])
        }
        break

      case 'wc':
        if (!args[0]) {
          output = 'wc: missing file operand'
        } else {
          output = simulateWc(args[0])
        }
        break

      case 'clear':
        setHistory([])
        setCurrentCommand('')
        return

      case 'help':
        output = `Available commands:
ls       - list directory contents
pwd      - print working directory
cd       - change directory
cat      - display file contents
echo     - display text
mkdir    - create directory
touch    - create file
rm       - remove file
grep     - search in file
wc       - word count
clear    - clear terminal
help     - show this help

This is a simulated bash environment for educational purposes.
For actual Linux commands, use the WebVM terminal.`
        break

      case '':
        output = ''
        break

      default:
        output = `${command}: command not found\n\nTry 'help' for available commands.`
    }

    setHistory([...history, { command: cmd, output }])
    setCurrentCommand('')
  }

  const simulateLs = (path: string): string => {
    // Simplified ls implementation
    return 'Documents  Downloads  Desktop  file.txt  script.sh'
  }

  const simulateCd = (target?: string): { success: boolean; newDir?: string; error?: string } => {
    if (!target || target === '~') {
      return { success: true, newDir: '~' }
    }
    if (target === '..') {
      const parts = currentDir.split('/')
      parts.pop()
      return { success: true, newDir: parts.join('/') || '~' }
    }
    return { success: false, error: `cd: ${target}: No such file or directory` }
  }

  const simulateCat = (filename: string): string => {
    if (filename === 'file.txt') {
      return 'Hello, World!'
    }
    return `cat: ${filename}: No such file or directory`
  }

  const simulateMkdir = (dirname: string): string => {
    return `mkdir: created directory '${dirname}' (simulated)`
  }

  const simulateTouch = (filename: string): string => {
    return `touch: created file '${filename}' (simulated)`
  }

  const simulateRm = (filename: string): string => {
    return `rm: removed '${filename}' (simulated)`
  }

  const simulateGrep = (pattern: string, filename: string): string => {
    return `grep: searching for '${pattern}' in ${filename} (simulated)`
  }

  const simulateWc = (filename: string): string => {
    return `  1   2  14 ${filename} (simulated)`
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentCommand('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentCommand(commandHistory[newIndex])
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Basic tab completion could go here
    }
  }

  return (
    <Box sx={{ my: 2 }}>
      <Paper
        variant="outlined"
        sx={{
          bgcolor: 'grey.900',
          color: '#0f0',
          p: 2,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          minHeight: '400px',
          maxHeight: '600px',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'text',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'grey.500' }}>
          <TerminalIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            Command Line Terminal - Type 'help' for commands
          </Typography>
        </Box>

        <Box
          ref={outputRef}
          sx={{
            flex: 1,
            overflow: 'auto',
            mb: 1,
          }}
        >
          {history.map((entry, index) => (
            <Box key={index} sx={{ mb: 0.5 }}>
              <Box sx={{ color: '#22d3ee' }}>
                <span style={{ color: '#22d3ee' }}>user@dhrift</span>
                <span style={{ color: '#fff' }}>:</span>
                <span style={{ color: '#3b82f6' }}>{currentDir}</span>
                <span style={{ color: '#fff' }}>$ </span>
                <span style={{ color: '#fff' }}>{entry.command}</span>
              </Box>
              {entry.output && (
                <Box sx={{ color: '#fff', whiteSpace: 'pre-wrap', ml: 0 }}>
                  {entry.output}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ color: '#22d3ee' }}>user@dhrift</Box>
          <Box component="span" sx={{ color: '#fff' }}>:</Box>
          <Box component="span" sx={{ color: '#3b82f6' }}>{currentDir}</Box>
          <Box component="span" sx={{ color: '#fff' }}>$ </Box>
          <Box
            component="input"
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            sx={{
              flex: 1,
              bgcolor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
            }}
          />
        </Box>
      </Paper>
    </Box>
  )
}
