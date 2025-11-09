'use client'

import { useState, useRef, useEffect } from 'react'
import { Box, Paper, Typography } from '@mui/material'

/**
 * Terminal emulator component
 * Simulates a basic command line interface in the browser
 */
export function Terminal() {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [currentDir, setCurrentDir] = useState('~')
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Virtual file system (simple simulation)
  const [fileSystem] = useState({
    '~': ['Documents', 'Downloads', 'Desktop', 'file.txt'],
    '~/Documents': ['project', 'notes.txt'],
    '~/Documents/project': ['README.md', 'main.py'],
    '~/Downloads': [],
    '~/Desktop': [],
  })

  useEffect(() => {
    // Scroll to bottom on new output
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/)
    const command = parts[0]
    const args = parts.slice(1)

    let output = ''

    switch (command) {
      case 'ls':
        const dir = args[0] ? args[0] : currentDir
        const files = fileSystem[dir as keyof typeof fileSystem]
        output = files ? files.join('\n') : `ls: cannot access '${dir}': No such file or directory`
        break

      case 'pwd':
        output = currentDir
        break

      case 'cd':
        const target = args[0]
        if (!target || target === '~') {
          setCurrentDir('~')
          output = ''
        } else if (target === '..') {
          const parts = currentDir.split('/')
          parts.pop()
          setCurrentDir(parts.join('/') || '~')
          output = ''
        } else {
          const newDir = currentDir === '~' ? `~/${target}` : `${currentDir}/${target}`
          if (fileSystem[newDir as keyof typeof fileSystem]) {
            setCurrentDir(newDir)
            output = ''
          } else {
            output = `cd: ${target}: No such file or directory`
          }
        }
        break

      case 'echo':
        output = args.join(' ')
        break

      case 'cat':
        if (!args[0]) {
          output = 'cat: missing file operand'
        } else {
          output = `Contents of ${args[0]} would appear here`
        }
        break

      case 'mkdir':
        if (!args[0]) {
          output = 'mkdir: missing operand'
        } else {
          output = `Directory ${args[0]} created (simulated)`
        }
        break

      case 'touch':
        if (!args[0]) {
          output = 'touch: missing file operand'
        } else {
          output = `File ${args[0]} created (simulated)`
        }
        break

      case 'clear':
        setHistory([])
        setCurrentCommand('')
        return

      case 'help':
        output = `Available commands:
ls      - list directory contents
pwd     - print working directory
cd      - change directory
echo    - display text
cat     - display file contents
mkdir   - create directory
touch   - create file
clear   - clear terminal
help    - show this help message

This is a simulated terminal for educational purposes.`
        break

      case '':
        output = ''
        break

      default:
        output = `${command}: command not found

Try 'help' for available commands.`
    }

    setHistory([...history, { command: cmd, output }])
    setCurrentCommand('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand)
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <Box sx={{ my: 2 }}>
      <Paper
        sx={{
          bgcolor: 'grey.900',
          color: 'green.400',
          p: 2,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          minHeight: '300px',
          maxHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'text',
        }}
        onClick={focusInput}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'grey.500',
            mb: 1,
            fontFamily: 'monospace',
          }}
        >
          Simulated Terminal - Type &quot;help&quot; for available commands
        </Typography>

        <Box
          ref={outputRef}
          sx={{
            flex: 1,
            overflow: 'auto',
            mb: 1,
          }}
        >
          {history.map((entry, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Box sx={{ color: 'cyan.400' }}>
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
          <Box component="span" sx={{ color: '#22d3ee' }}>
            user@dhrift
          </Box>
          <Box component="span" sx={{ color: '#fff' }}>
            :
          </Box>
          <Box component="span" sx={{ color: '#3b82f6' }}>
            {currentDir}
          </Box>
          <Box component="span" sx={{ color: '#fff' }}>
            ${' '}
          </Box>
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
