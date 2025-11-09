/**
 * Client-Side MDX Compilation
 *
 * Compiles MDX in the browser using @mdx-js/mdx evaluate().
 * Uses the same plugin pipeline as server-side for consistency.
 */

'use client'

import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { mdxOptions } from './mdx-config'
import type { MDXModule } from 'mdx/types'

/**
 * Compile MDX source code in the browser
 *
 * This runs the full remark/rehype plugin pipeline client-side,
 * with all our custom plugins, error boundaries, etc.
 */
export async function evaluateMDX(
  source: string,
  options: {
    scope?: Record<string, any>
    development?: boolean
  } = {}
): Promise<MDXModule> {
  const { scope = {}, development = process.env.NODE_ENV === 'development' } = options

  try {
    const result = await evaluate(source, {
      ...runtime,
      ...mdxOptions,
      development,
      // Make scope available to MDX components
      // @ts-ignore - MDX types are a bit loose
      scope,
    })

    return result as MDXModule
  } catch (error) {
    console.error('MDX compilation error:', error)
    throw error
  }
}

/**
 * Precompile and cache MDX
 * Useful for workshops that are viewed multiple times
 */
const compilationCache = new Map<string, MDXModule>()

export async function evaluateMDXCached(
  source: string,
  options: {
    scope?: Record<string, any>
    cacheKey?: string
  } = {}
): Promise<MDXModule> {
  const { cacheKey = source.substring(0, 100), ...evalOptions } = options

  // Check cache
  if (compilationCache.has(cacheKey)) {
    console.log(`✓ MDX compilation cache HIT: ${cacheKey.substring(0, 50)}...`)
    return compilationCache.get(cacheKey)!
  }

  // Compile
  console.log(`⟳ MDX compilation cache MISS: ${cacheKey.substring(0, 50)}...`)
  const result = await evaluateMDX(source, evalOptions)

  // Cache result (limit cache size to prevent memory issues)
  if (compilationCache.size > 50) {
    const firstKey = compilationCache.keys().next().value
    compilationCache.delete(firstKey)
  }
  compilationCache.set(cacheKey, result)

  return result
}

/**
 * Clear MDX compilation cache
 */
export function clearMDXCache() {
  compilationCache.clear()
  console.log('✗ Cleared MDX compilation cache')
}

/**
 * Get MDX cache statistics
 */
export function getMDXCacheStats() {
  return {
    size: compilationCache.size,
    keys: Array.from(compilationCache.keys()),
  }
}
