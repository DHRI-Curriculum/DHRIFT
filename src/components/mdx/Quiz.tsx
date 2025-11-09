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
import { parseComponentContent, validateParsedContent } from '@/lib/component-parser'
import { ComponentErrorBoundary } from '@/components/ComponentErrorBoundary'

interface QuizProps {
  children: ReactNode
  correct?: number | number[] // Optional: explicitly specify correct answer(s)
}

/**
 * Quiz component with robust parsing and error handling
 *
 * Supports multiple formats:
 * - <ul>/<ol> with <li> elements
 * - Markdown list (- item or * item)
 * - Plain text lines
 *
 * Correct answers can be marked with:
 * - Asterisk at end: "Answer *"
 * - Via correct prop: correct={0} or correct={[0, 2]}
 */
export function Quiz({ children, correct }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(
    new Set()
  )
  const [showResult, setShowResult] = useState(false)

  // Parse children using flexible multi-strategy parser
  const parsedItems = parseComponentContent(children)
  const validation = validateParsedContent(parsedItems)

  // Handle parsing errors gracefully
  if (!validation.valid) {
    return (
      <Alert severity="warning" sx={{ my: 2 }}>
        Quiz could not be displayed: {validation.error}
      </Alert>
    )
  }

  // Extract options and determine which are correct
  const options = parsedItems.map((item, index) => {
    const text = item.text
    const isCorrect = determineCorrectness(text, index, correct)

    return {
      text: text.endsWith('*') ? text.slice(0, -1).trim() : text,
      isCorrect,
    }
  })

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
 * Determine if an option is correct
 *
 * Priority:
 * 1. Explicit correct prop
 * 2. Asterisk marker at end of text
 */
function determineCorrectness(
  text: string,
  index: number,
  correctProp?: number | number[]
): boolean {
  // Check explicit correct prop
  if (correctProp !== undefined) {
    if (Array.isArray(correctProp)) {
      return correctProp.includes(index)
    }
    return correctProp === index
  }

  // Check asterisk marker
  return text.trim().endsWith('*')
}

/**
 * Wrap Quiz with error boundary for production use
 */
export function QuizWithErrorBoundary(props: QuizProps) {
  return (
    <ComponentErrorBoundary componentName="Quiz">
      <Quiz {...props} />
    </ComponentErrorBoundary>
  )
}
