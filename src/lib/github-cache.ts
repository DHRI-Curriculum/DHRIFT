/**
 * GitHub API Caching Layer
 *
 * Caches GitHub API responses to file system to avoid hitting rate limits
 * during static site builds. Especially important during development where
 * you might rebuild frequently.
 *
 * Rate Limits:
 * - Unauthenticated: 60 requests/hour
 * - Authenticated: 5,000 requests/hour
 *
 * With 22 workshops, each build needs ~23 API calls.
 * Cache allows unlimited builds without hitting limits.
 */

import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

const CACHE_DIR = path.join(process.cwd(), '.github-cache')
const DEFAULT_MAX_AGE = 3600 // 1 hour in seconds

interface CacheEntry {
  content: string
  timestamp: number
  cacheKey: string
  etag?: string
}

/**
 * Generate cache file path for a given key
 */
function getCacheFilePath(cacheKey: string): string {
  const hash = crypto.createHash('md5').update(cacheKey).digest('hex')
  return path.join(CACHE_DIR, `${hash}.json`)
}

/**
 * Read from cache if available and fresh
 */
async function readCache(
  cacheKey: string,
  maxAge: number
): Promise<string | null> {
  try {
    const cacheFile = getCacheFilePath(cacheKey)
    const cached = await fs.readFile(cacheFile, 'utf-8')
    const entry: CacheEntry = JSON.parse(cached)

    const age = (Date.now() - entry.timestamp) / 1000

    if (age < maxAge) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`  ✓ Cache HIT: ${cacheKey} (${age.toFixed(0)}s old)`)
      }
      return entry.content
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(`  ✗ Cache STALE: ${cacheKey} (${age.toFixed(0)}s old)`)
      }
      return null
    }
  } catch (error) {
    // Cache miss (file doesn't exist or is invalid)
    return null
  }
}

/**
 * Write to cache
 */
async function writeCache(cacheKey: string, content: string): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true })

    const cacheFile = getCacheFilePath(cacheKey)
    const entry: CacheEntry = {
      content,
      timestamp: Date.now(),
      cacheKey,
    }

    await fs.writeFile(cacheFile, JSON.stringify(entry, null, 2))

    if (process.env.NODE_ENV === 'development') {
      console.log(`  ✓ Cached: ${cacheKey}`)
    }
  } catch (error) {
    // Cache write failed - not fatal, just log
    console.error('  ✗ Cache write failed:', error)
  }
}

/**
 * Fetch with cache support
 *
 * Checks cache first, falls back to fetcher function if miss or stale.
 * Automatically caches successful fetches.
 */
export async function fetchWithCache<T = string>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  options: {
    maxAge?: number
    skipCache?: boolean
    serialize?: (data: T) => string
    deserialize?: (cached: string) => T
  } = {}
): Promise<T> {
  const {
    maxAge = DEFAULT_MAX_AGE,
    skipCache = process.env.SKIP_CACHE === 'true',
    serialize = (data: any) => (typeof data === 'string' ? data : JSON.stringify(data)),
    deserialize = (cached: string) => cached as T,
  } = options

  // Check cache unless skipped
  if (!skipCache) {
    const cached = await readCache(cacheKey, maxAge)
    if (cached !== null) {
      return deserialize(cached)
    }
  }

  // Cache miss - fetch from source
  if (process.env.NODE_ENV === 'development') {
    console.log(`  ⟳ Cache MISS: ${cacheKey} - fetching...`)
  }

  const data = await fetcher()
  const serialized = serialize(data)

  // Save to cache (fire and forget)
  writeCache(cacheKey, serialized).catch(() => {})

  return data
}

/**
 * Invalidate cache for specific file
 */
export async function invalidateCacheKey(cacheKey: string): Promise<void> {
  try {
    const cacheFile = getCacheFilePath(cacheKey)
    await fs.unlink(cacheFile)
    console.log(`  ✗ Invalidated: ${cacheKey}`)
  } catch {
    // File doesn't exist - already invalid
  }
}

/**
 * Invalidate all cache entries matching a pattern
 */
export async function invalidateCachePattern(pattern: RegExp): Promise<void> {
  try {
    const files = await fs.readdir(CACHE_DIR)

    for (const file of files) {
      const cachePath = path.join(CACHE_DIR, file)
      const cached = await fs.readFile(cachePath, 'utf-8')
      const entry: CacheEntry = JSON.parse(cached)

      if (pattern.test(entry.cacheKey)) {
        await fs.unlink(cachePath)
        console.log(`  ✗ Invalidated: ${entry.cacheKey}`)
      }
    }
  } catch (error) {
    // Cache directory doesn't exist or error reading
    console.error('  ✗ Cache invalidation failed:', error)
  }
}

/**
 * Clear all cached files
 */
export async function clearCache(): Promise<void> {
  try {
    await fs.rm(CACHE_DIR, { recursive: true, force: true })
    console.log('  ✗ Cleared all GitHub API cache')
  } catch (error) {
    console.error('  ✗ Cache clear failed:', error)
  }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
  count: number
  totalSize: number
  items: Array<{
    key: string
    age: number
    size: number
  }>
}> {
  try {
    const files = await fs.readdir(CACHE_DIR)

    const items = await Promise.all(
      files.map(async (file) => {
        const cachePath = path.join(CACHE_DIR, file)
        const stat = await fs.stat(cachePath)
        const cached = await fs.readFile(cachePath, 'utf-8')
        const entry: CacheEntry = JSON.parse(cached)

        return {
          key: entry.cacheKey,
          age: (Date.now() - entry.timestamp) / 1000,
          size: stat.size,
        }
      })
    )

    return {
      count: items.length,
      totalSize: items.reduce((sum, item) => sum + item.size, 0),
      items,
    }
  } catch {
    return {
      count: 0,
      totalSize: 0,
      items: [],
    }
  }
}

/**
 * Check if cache exists and is fresh
 */
export async function isCacheFresh(
  cacheKey: string,
  maxAge: number = DEFAULT_MAX_AGE
): Promise<boolean> {
  const cached = await readCache(cacheKey, maxAge)
  return cached !== null
}
