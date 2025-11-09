'use client'

import { useState, type ReactNode } from 'react'
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
 * Parse quiz options from children
 * Expected format: lines starting with - for options
 * Asterisk (*) at end indicates correct answer
 */
function parseQuizOptions(children: ReactNode): Array<{
  text: string
  isCorrect: boolean
}> {
  // Convert children to string
  const content = String(children)

  // Split into lines and parse
  const lines = content.split('\n').filter(line => line.trim().startsWith('-'))

  return lines.map(line => {
    const text = line.trim().substring(1).trim()
    const isCorrect = text.endsWith('*')
    return {
      text: isCorrect ? text.slice(0, -1).trim() : text,
      isCorrect,
    }
  })
}
