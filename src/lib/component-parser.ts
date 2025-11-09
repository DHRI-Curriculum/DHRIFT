/**
 * Component Parser - Flexible multi-strategy parsing
 *
 * This module provides utilities for parsing component content from various
 * formats without requiring specific edge-case handling. Each parser tries
 * multiple strategies and falls back gracefully.
 *
 * Philosophy: Try multiple approaches, return best result, never fail.
 */

import { Children, isValidElement, type ReactNode } from 'react'

/**
 * Parsed list item with text and optional attributes
 */
export interface ParsedItem {
  text: string
  attributes?: Record<string, any>
  raw?: string
}

/**
 * Main content parser - tries multiple strategies
 *
 * Attempts (in order):
 * 1. React children as list elements
 * 2. Markdown list in string
 * 3. Plain text lines
 * 4. Raw content fallback
 */
export function parseComponentContent(children: ReactNode): ParsedItem[] {
  // Strategy 1: React list elements (ul/ol with li)
  const reactList = tryParseReactList(children)
  if (reactList.length > 0) return reactList

  // Strategy 2: Markdown list in string content
  const markdownList = tryParseMarkdownList(children)
  if (markdownList.length > 0) return markdownList

  // Strategy 3: Plain text lines (newline-separated)
  const plainLines = tryParsePlainText(children)
  if (plainLines.length > 0) return plainLines

  // Strategy 4: Fallback - raw content
  return fallbackToRawContent(children)
}

/**
 * Strategy 1: Parse React list elements (ul/ol with li children)
 *
 * Handles:
 * - <ul><li>item 1</li><li>item 2</li></ul>
 * - <ol><li>item 1</li><li>item 2</li></ol>
 */
export function tryParseReactList(children: ReactNode): ParsedItem[] {
  const items: ParsedItem[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return

    // Check for ul or ol
    if (child.type === 'ul' || child.type === 'ol') {
      // Extract li elements
      Children.forEach(child.props.children, (li) => {
        if (isValidElement(li) && li.type === 'li') {
          const text = extractText((li as any).props.children)
          if (text.trim()) {
            items.push({
              text: text.trim(),
              raw: text,
            })
          }
        }
      })
    }

    // Check for direct li elements (sometimes happens)
    if (child.type === 'li') {
      const text = extractText(child.props.children)
      if (text.trim()) {
        items.push({
          text: text.trim(),
          raw: text,
        })
      }
    }
  })

  return items
}

/**
 * Strategy 2: Parse markdown list from string content
 *
 * Handles:
 * - "- item 1\n- item 2"
 * - "* item 1\n* item 2"
 * - "1. item 1\n2. item 2"
 */
export function tryParseMarkdownList(children: ReactNode): ParsedItem[] {
  const text = extractText(children)
  if (!text.includes('\n') && !text.match(/^[\-\*\d]/)) {
    return [] // Not a markdown list
  }

  const lines = text.split('\n')
  const items: ParsedItem[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    // Match markdown list patterns
    // - item, * item, + item, 1. item, 2. item, etc.
    const match = trimmed.match(/^[\-\*\+]?\s*(?:\d+\.)?\s*(.+)$/)

    if (match && match[1]) {
      items.push({
        text: match[1].trim(),
        raw: trimmed,
      })
    }
  }

  return items
}

/**
 * Strategy 3: Parse plain text lines (newline-separated)
 *
 * Handles:
 * - "item 1\nitem 2\nitem 3"
 * - Simple text without list markers
 */
export function tryParsePlainText(children: ReactNode): ParsedItem[] {
  const text = extractText(children)

  // Must have newlines to be considered a list
  if (!text.includes('\n')) {
    return []
  }

  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (lines.length < 2) {
    return [] // Not really a list
  }

  return lines.map((line) => ({
    text: line,
    raw: line,
  }))
}

/**
 * Strategy 4: Fallback - treat entire content as single item
 *
 * Always succeeds, returns at least one item
 */
export function fallbackToRawContent(children: ReactNode): ParsedItem[] {
  const text = extractText(children).trim()

  if (!text) {
    return []
  }

  return [
    {
      text,
      raw: text,
    },
  ]
}

/**
 * Extract text recursively from React children
 *
 * Handles:
 * - String children
 * - Nested React elements
 * - Arrays of children
 * - null/undefined
 */
export function extractText(node: ReactNode): string {
  if (node == null) return ''

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join('')
  }

  if (isValidElement(node)) {
    return extractText(node.props.children)
  }

  return ''
}

/**
 * Parse attributes from text
 *
 * Extracts key=value pairs from text like:
 * "Question text {correct=0 points=5}"
 */
export function parseAttributes(text: string): {
  text: string
  attributes: Record<string, any>
} {
  const match = text.match(/^(.*?)\{([^}]+)\}$/)

  if (!match) {
    return { text, attributes: {} }
  }

  const cleanText = match[1].trim()
  const attrString = match[2]

  const attributes: Record<string, any> = {}

  // Parse key=value pairs
  const attrMatches = attrString.matchAll(/(\w+)=["']?([^"'\s]+)["']?/g)
  for (const [, key, value] of attrMatches) {
    // Try to parse as number
    const numValue = Number(value)
    attributes[key] = isNaN(numValue) ? value : numValue
  }

  return { text: cleanText, attributes }
}

/**
 * Parse quiz-specific content
 *
 * Handles:
 * - Question text
 * - Answer options (list)
 * - Correct answer index/indices
 */
export function parseQuizContent(children: ReactNode): {
  question?: string
  options: string[]
  correct?: number | number[]
} {
  const items = parseComponentContent(children)

  if (items.length === 0) {
    return { options: [] }
  }

  // First item might be question
  const firstItem = items[0]
  const { text: question, attributes } = parseAttributes(firstItem.text)

  // Remaining items are options
  const options = items.slice(1).map((item) => item.text)

  // If no options found, treat first item as only option
  if (options.length === 0) {
    return {
      question: undefined,
      options: [question],
      correct: attributes.correct,
    }
  }

  return {
    question,
    options,
    correct: attributes.correct,
  }
}

/**
 * Parse keywords/glossary content
 *
 * Handles:
 * - "term: definition" format
 * - "term - definition" format
 * - Plain list of terms
 */
export function parseKeywordsContent(children: ReactNode): Array<{
  term: string
  definition?: string
}> {
  const items = parseComponentContent(children)

  return items.map((item) => {
    const text = item.text

    // Try "term: definition" format
    const colonMatch = text.match(/^([^:]+):\s*(.+)$/)
    if (colonMatch) {
      return {
        term: colonMatch[1].trim(),
        definition: colonMatch[2].trim(),
      }
    }

    // Try "term - definition" format
    const dashMatch = text.match(/^([^\-]+)\s*-\s*(.+)$/)
    if (dashMatch) {
      return {
        term: dashMatch[1].trim(),
        definition: dashMatch[2].trim(),
      }
    }

    // Plain term without definition
    return {
      term: text.trim(),
      definition: undefined,
    }
  })
}

/**
 * Validate parsed content
 *
 * Returns whether parsing was successful and content is usable
 */
export function validateParsedContent(items: ParsedItem[]): {
  valid: boolean
  error?: string
} {
  if (items.length === 0) {
    return {
      valid: false,
      error: 'No content found',
    }
  }

  const hasValidText = items.some((item) => item.text.trim().length > 0)

  if (!hasValidText) {
    return {
      valid: false,
      error: 'No valid text content found',
    }
  }

  return { valid: true }
}
