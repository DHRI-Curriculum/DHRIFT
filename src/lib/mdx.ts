/**
 * MDX processing utilities
 * Simplified approach - no 851-line sanitizer!
 */

import matter from 'gray-matter'
import { WorkshopFrontmatterSchema, type WorkshopFrontmatter } from '@/types/workshop'

export interface ParsedWorkshop {
  frontmatter: WorkshopFrontmatter
  content: string
}

/**
 * Parse markdown with frontmatter
 * Returns validated frontmatter and content
 */
export function parseWorkshopMarkdown(markdown: string): ParsedWorkshop {
  const { data, content } = matter(markdown)

  // Validate frontmatter with Zod
  const frontmatter = WorkshopFrontmatterSchema.parse(data)

  // Basic preprocessing - much simpler than original!
  const processedContent = preprocessMarkdown(content)

  return {
    frontmatter,
    content: processedContent,
  }
}

/**
 * Minimal markdown preprocessing
 * Handles only essential transformations
 */
function preprocessMarkdown(markdown: string): string {
  let processed = markdown

  // Ensure self-closing tags for custom components
  processed = processed.replace(/<PythonREPL>/g, '<PythonREPL />')
  processed = processed.replace(/<Terminal>/g, '<Terminal />')

  // Ensure proper spacing around block-level custom components
  const blockComponents = ['Info', 'Secret', 'Quiz', 'Keywords', 'CodeEditor']
  blockComponents.forEach(component => {
    // Add blank lines before opening tags
    processed = processed.replace(
      new RegExp(`([^\\n])\\n<${component}`, 'g'),
      `$1\n\n<${component}`
    )
    // Add blank lines after closing tags
    processed = processed.replace(
      new RegExp(`</${component}>\\n([^\\n])`, 'g'),
      `</${component}>\n\n$1`
    )
  })

  return processed
}

/**
 * Split content into pages based on headings
 * Returns array of content chunks
 */
export function splitIntoPages(content: string): string[] {
  // Split on ## headings (H2)
  const sections = content.split(/^## /m)

  if (sections.length === 1) {
    return [content] // No splitting needed
  }

  // Re-add the ## to each section (except first)
  return sections.map((section, index) => {
    if (index === 0) return section.trim()
    return `## ${section.trim()}`
  })
}

/**
 * Extract table of contents from markdown
 */
export interface ToCItem {
  level: number
  title: string
  slug: string
}

export function extractToC(content: string): ToCItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const toc: ToCItem[] = []

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    toc.push({ level, title, slug })
  }

  return toc
}
