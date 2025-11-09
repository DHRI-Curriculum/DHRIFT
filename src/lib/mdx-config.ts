/**
 * MDX Configuration - Robust plugin-based architecture
 *
 * This configuration leverages the remark/rehype ecosystem to handle
 * diverse workshop content gracefully without edge-case-specific code.
 */

import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import type { CompileOptions } from '@mdx-js/mdx'

// Remark plugins (markdown processing)
import remarkGfm from 'remark-gfm' // GitHub Flavored Markdown (tables, strikethrough, etc.)
import remarkDirective from 'remark-directive' // Support for :::[directive] syntax
import remarkFrontmatter from 'remark-frontmatter' // Extract frontmatter
import remarkMath from 'remark-math' // Math equations

// Rehype plugins (HTML processing)
import rehypeRaw from 'rehype-raw' // CRITICAL: Allows mixed HTML in markdown
import rehypeHighlight from 'rehype-highlight' // Code syntax highlighting
import rehypeKatex from 'rehype-katex' // Render math equations
import rehypeSlug from 'rehype-slug' // Add IDs to headings
import rehypeAutolinkHeadings from 'rehype-autolink-headings' // Add links to headings

// Custom plugins
import { remarkCustomDirectives } from './mdx-plugins/remark-directives'
import { rehypeComponentWrapper } from './mdx-plugins/rehype-wrapper'

/**
 * MDX Compile Options
 *
 * These options configure how MDX processes markdown content.
 * Key features:
 * - rehypeRaw: Handles mixed HTML/markdown (solves many edge cases!)
 * - remarkGfm: Tables, task lists, strikethrough, autolinks
 * - remarkDirective: Custom syntax like :::info, :::secret
 */
export const mdxOptions: CompileOptions = {
  development: process.env.NODE_ENV === 'development',
  remarkPlugins: [
    remarkGfm,
    remarkFrontmatter,
    remarkMath,
    remarkDirective,
    remarkCustomDirectives, // Our custom directive handler
  ],
  rehypePlugins: [
    rehypeRaw, // CRITICAL: Handles mixed HTML/markdown without sanitizer!
    rehypeHighlight,
    rehypeKatex,
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeComponentWrapper, // Wrap components in error boundaries
  ],
  format: 'mdx',
}

/**
 * Serialization options for next-mdx-remote
 */
export const serializeOptions = {
  mdxOptions,
  parseFrontmatter: true,
  scope: {},
}

/**
 * Component error wrapper configuration
 * Used by rehype-wrapper plugin to add error boundaries
 */
export const errorBoundaryConfig = {
  // Components that should be wrapped in error boundaries
  wrappedComponents: [
    'Quiz',
    'Keywords',
    'Info',
    'Secret',
    'PythonREPL',
    'RREPL',
    'CodeEditor',
    'Terminal',
    'CommandLine',
    'JSTerminal',
    'WebVM',
    'Jupyter',
  ],
  // Fallback component to render on error
  fallbackComponent: 'ErrorFallback',
}

/**
 * Preprocessing configuration
 * Minimal fixes for truly broken syntax only
 */
export const preprocessConfig = {
  // Fix common markdown issues
  fixUnclosedTags: true,
  fixMismatchedBrackets: false, // Too aggressive, let MDX handle
  normalizeLineEndings: true,
  trimWhitespace: false, // Whitespace can be meaningful

  // Component-specific fixes
  convertLegacyDirectives: true, // <Info> → :::info
  fixNestedComponents: true, // Ensure proper nesting
}

/**
 * Custom directive mappings
 * Maps directive names to component names
 */
export const directiveMap: Record<string, string> = {
  info: 'Info',
  secret: 'Secret',
  quiz: 'Quiz',
  keywords: 'Keywords',
  python: 'PythonREPL',
  r: 'RREPL',
  javascript: 'JSTerminal',
  terminal: 'Terminal',
  bash: 'CommandLine',
  webvm: 'WebVM',
  jupyter: 'Jupyter',
  download: 'Download',
}

/**
 * Type exports
 */
export type { MDXRemoteSerializeResult, CompileOptions }
