/**
 * MDX Preprocessing Utilities
 *
 * Minimal preprocessing that only fixes essential syntax issues
 * that would break MDX parsing. The goal is to handle edge cases
 * gracefully without resorting to 851 lines of sanitization.
 *
 * Philosophy: Fix only what's broken, let MDX handle the rest.
 */

import { preprocessConfig } from './mdx-config'

/**
 * Main preprocessing function
 * Applies minimal fixes based on configuration
 */
export function preprocessWorkshopMarkdown(markdown: string): string {
  let processed = markdown

  // Apply each preprocessing step based on config
  if (preprocessConfig.normalizeLineEndings) {
    processed = normalizeLineEndings(processed)
  }

  if (preprocessConfig.fixUnclosedTags) {
    processed = fixUnclosedTags(processed)
  }

  if (preprocessConfig.fixNestedComponents) {
    processed = fixNestedComponents(processed)
  }

  if (preprocessConfig.convertLegacyDirectives) {
    processed = convertLegacyDirectives(processed)
  }

  return processed
}

/**
 * Normalize line endings to Unix format (\n)
 * Handles Windows (\r\n) and old Mac (\r) formats
 */
export function normalizeLineEndings(markdown: string): string {
  return markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
}

/**
 * Fix unclosed self-closing component tags
 *
 * Ensures void components (REPLs, terminals) are properly self-closing
 * Example: <PythonREPL> → <PythonREPL />
 */
export function fixUnclosedTags(markdown: string): string {
  const voidComponents = [
    'PythonREPL',
    'RREPL',
    'Terminal',
    'CommandLine',
    'JSTerminal',
    'WebVM',
    'Jupyter',
  ]

  let processed = markdown

  voidComponents.forEach((component) => {
    // Match opening tags that are NOT:
    // 1. Already self-closing (ends with />)
    // 2. Have a corresponding closing tag
    const regex = new RegExp(`<${component}(?![^>]*\\/|[\\s\\S]*?<\\/${component}>)`, 'g')
    processed = processed.replace(regex, `<${component} /`)
  })

  return processed
}

/**
 * Fix nested component spacing
 *
 * Ensures proper blank lines around block-level components
 * This helps MDX parser recognize component boundaries
 */
export function fixNestedComponents(markdown: string): string {
  const blockComponents = ['Info', 'Secret', 'Quiz', 'Keywords', 'CodeEditor']

  let processed = markdown

  blockComponents.forEach((component) => {
    // Add blank line before opening tag (if not already present)
    // Pattern: non-newline, single newline, opening tag
    // Replace with: non-newline, double newline, opening tag
    processed = processed.replace(
      new RegExp(`([^\\n])\\n<${component}`, 'g'),
      `$1\n\n<${component}`
    )

    // Add blank line after closing tag (if not already present)
    processed = processed.replace(
      new RegExp(`</${component}>\\n([^\\n])`, 'g'),
      `</${component}>\n\n$1`
    )
  })

  return processed
}

/**
 * Convert legacy directive syntax (optional)
 *
 * Converts old-style HTML tags to directive syntax
 * Example: <Info>...</Info> → :::info...:::
 *
 * Currently disabled - we support both syntaxes!
 */
export function convertLegacyDirectives(markdown: string): string {
  // This is optional and currently not recommended
  // MDX handles both syntaxes well with rehypeRaw plugin
  return markdown
}

/**
 * Detect and log potential issues (for debugging)
 */
export function detectPotentialIssues(markdown: string): {
  issues: Array<{ type: string; line: number; message: string }>
  hasIssues: boolean
} {
  const issues: Array<{ type: string; line: number; message: string }> = []
  const lines = markdown.split('\n')

  lines.forEach((line, index) => {
    const lineNum = index + 1

    // Detect unclosed tags
    if (/<[A-Z]\w+[^/>]*>/.test(line) && !/<\/[A-Z]\w+>/.test(line)) {
      const match = line.match(/<([A-Z]\w+)[^/>]*>/)
      if (match) {
        issues.push({
          type: 'unclosed-tag',
          line: lineNum,
          message: `Potentially unclosed tag: <${match[1]}>`,
        })
      }
    }

    // Detect mismatched brackets
    const openBrackets = (line.match(/\[/g) || []).length
    const closeBrackets = (line.match(/\]/g) || []).length
    if (openBrackets !== closeBrackets) {
      issues.push({
        type: 'mismatched-brackets',
        line: lineNum,
        message: `Mismatched brackets: ${openBrackets} open, ${closeBrackets} close`,
      })
    }

    // Detect mixed HTML and markdown
    if (/<[a-z]+/.test(line) && /^\s*[\-\*]/.test(line)) {
      issues.push({
        type: 'mixed-syntax',
        line: lineNum,
        message: 'Mixed HTML and markdown list syntax',
      })
    }
  })

  return {
    issues,
    hasIssues: issues.length > 0,
  }
}

/**
 * Validation: Check if markdown is safe to process
 */
export function validateMarkdown(markdown: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Check for extremely long lines (might break parser)
  const lines = markdown.split('\n')
  const maxLineLength = 10000
  lines.forEach((line, index) => {
    if (line.length > maxLineLength) {
      errors.push(`Line ${index + 1} exceeds maximum length (${maxLineLength} chars)`)
    }
  })

  // Check for deeply nested structures
  const maxNesting = 10
  let currentNesting = 0
  let maxObservedNesting = 0

  for (const line of lines) {
    const openTags = (line.match(/<[A-Z]\w+/g) || []).length
    const closeTags = (line.match(/<\/[A-Z]\w+>/g) || []).length
    currentNesting += openTags - closeTags
    maxObservedNesting = Math.max(maxObservedNesting, currentNesting)
  }

  if (maxObservedNesting > maxNesting) {
    errors.push(`Nesting too deep: ${maxObservedNesting} levels (max ${maxNesting})`)
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Emergency fallback: Strip problematic content
 * Only use when all else fails
 */
export function emergencyStrip(markdown: string): string {
  console.warn('Using emergency strip - content may be degraded')

  let processed = markdown

  // Remove inline HTML that's not a component
  processed = processed.replace(/<(?!\/?\w+>)[^>]+>/g, '')

  // Remove excessive blank lines
  processed = processed.replace(/\n{4,}/g, '\n\n\n')

  // Remove HTML comments
  processed = processed.replace(/<!--[\s\S]*?-->/g, '')

  return processed
}
