/**
 * MDX processing utilities
 * Server-side compilation with plugin-based architecture
 */

import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { WorkshopFrontmatterSchema, type WorkshopFrontmatter } from '@/types/workshop'
import { serializeOptions } from './mdx-config'
import { preprocessWorkshopMarkdown } from './mdx-preprocess'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface ParsedWorkshop {
  frontmatter: WorkshopFrontmatter
  content: string
  mdxSource?: MDXRemoteSerializeResult
}

/**
 * Parse markdown with frontmatter
 * Returns validated frontmatter and content
 */
export function parseWorkshopMarkdown(markdown: string): ParsedWorkshop {
  const { data, content } = matter(markdown)

  // Validate frontmatter with Zod
  const frontmatter = WorkshopFrontmatterSchema.parse(data)

  // Minimal preprocessing - only essential fixes
  const processedContent = preprocessWorkshopMarkdown(content)

  return {
    frontmatter,
    content: processedContent,
  }
}

/**
 * Server-side MDX compilation
 * Use this for static generation or server components
 */
export async function compileWorkshopMDX(
  markdown: string
): Promise<{
  frontmatter: WorkshopFrontmatter
  mdxSource: MDXRemoteSerializeResult
}> {
  const { data, content } = matter(markdown)

  // Validate frontmatter
  const frontmatter = WorkshopFrontmatterSchema.parse(data)

  // Minimal preprocessing
  const processedContent = preprocessWorkshopMarkdown(content)

  // Server-side MDX compilation with our plugin configuration
  const mdxSource = await serialize(processedContent, {
    ...serializeOptions,
    scope: { frontmatter }, // Make frontmatter available to components
  })

  return {
    frontmatter,
    mdxSource,
  }
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
