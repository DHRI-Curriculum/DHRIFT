'use client'

import { useState, type ReactNode, Children, isValidElement } from 'react'
import {
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Alert,
} from '@mui/material'

interface QuizProps {
  children: ReactNode
}

/**
 * Quiz component
 * Parses children to extract options (lines starting with -)
 * Correct answers are marked with * at the end
 */
export function Quiz({ children }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(
    new Set()
  )
  const [showResult, setShowResult] = useState(false)

  // Parse children to extract quiz options
  const options = parseQuizOptions(children)

  const handleToggle = (index: number) => {
    const newSelected = new Set(selectedAnswers)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedAnswers(newSelected)
    setShowResult(false)
  }

  const checkAnswers = () => {
    setShowResult(true)
  }

  const isCorrect = () => {
    const correctIndices = options
      .map((opt, idx) => (opt.isCorrect ? idx : -1))
      .filter(idx => idx !== -1)

    return (
      correctIndices.length === selectedAnswers.size &&
      correctIndices.every(idx => selectedAnswers.has(idx))
    )
  }

  return (
    <Box sx={{ my: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <FormControl component="fieldset" fullWidth>
        <FormGroup>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedAnswers.has(index)}
                  onChange={() => handleToggle(index)}
                />
              }
              label={option.text}
            />
          ))}
        </FormGroup>
      </FormControl>

      <Button
        variant="contained"
        onClick={checkAnswers}
        sx={{ mt: 2 }}
        disabled={selectedAnswers.size === 0}
      >
        Check Answer
      </Button>

      {showResult && (
        <Alert severity={isCorrect() ? 'success' : 'error'} sx={{ mt: 2 }}>
          {isCorrect()
            ? 'Correct! Well done!'
            : 'Not quite. Try again!'}
        </Alert>
      )}
    </Box>
  )
}

/**
 * Parse quiz options from React children
 * Handles both <ul>/<ol> lists and plain text
 */
function parseQuizOptions(children: ReactNode): Array<{
  text: string
  isCorrect: boolean
}> {
  const options: Array<{ text: string; isCorrect: boolean }> = []

  // Helper to extract text from nested children
  const extractText = (node: ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return String(node)
    if (!node) return ''
    if (Array.isArray(node)) return node.map(extractText).join('')
    if (isValidElement(node) && node.props.children) {
      return extractText(node.props.children)
    }
    return ''
  }

  // Try to find a ul or ol element
  let foundList = false
  Children.forEach(children, (child) => {
    if (isValidElement(child) && (child.type === 'ul' || child.type === 'ol')) {
      foundList = true
      // Extract li elements
      Children.forEach(child.props.children, (li) => {
        if (isValidElement(li) && li.type === 'li') {
          const text = extractText(li.props.children)
          const isCorrect = text.trim().endsWith('*')
          options.push({
            text: isCorrect ? text.trim().slice(0, -1).trim() : text.trim(),
            isCorrect,
          })
        }
      })
    }
  })

  // Fallback: parse as plain text with lines starting with -
  if (!foundList) {
    const text = extractText(children)
    const lines = text.split('\n').filter(line => line.trim().startsWith('-'))
    lines.forEach(line => {
      const content = line.trim().substring(1).trim()
      const isCorrect = content.endsWith('*')
      options.push({
        text: isCorrect ? content.slice(0, -1).trim() : content,
        isCorrect,
      })
    })
  }

  return options
}
