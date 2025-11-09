/**
 * Client-Side GitHub API Library
 *
 * Fetches GitHub content via serverless proxy function.
 * Includes IndexedDB caching to minimize API calls and improve performance.
 */

'use client'

const API_BASE = '/api/github'
const DB_NAME = 'dhrift-github-cache'
const STORE_NAME = 'files'
const DB_VERSION = 1

interface CacheEntry {
  key: string
  content: string
  timestamp: number
}

/**
 * Fetch file from GitHub via proxy
 */
export async function fetchGitHubFile(
  user: string,
  repo: string,
  path: string
): Promise<string> {
  const url = `${API_BASE}?user=${encodeURIComponent(user)}&repo=${encodeURIComponent(
    repo
  )}&path=${encodeURIComponent(path)}`

  const response = await fetch(url)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(`Failed to fetch ${path}: ${error.error || response.statusText}`)
  }

  const data = await response.json()
  return data.content
}

/**
 * Fetch file with IndexedDB caching
 */
export async function fetchGitHubFileCached(
  user: string,
  repo: string,
  path: string,
  maxAge: number = 3600000 // 1 hour in milliseconds
): Promise<string> {
  const cacheKey = `${user}/${repo}/${path}`

  // Try cache first
  try {
    const cached = await getFromCache(cacheKey)
    if (cached && Date.now() - cached.timestamp < maxAge) {
      console.log(`✓ Cache HIT: ${cacheKey}`)
      return cached.content
    }
  } catch (error) {
    console.warn('Cache read error:', error)
  }

  // Cache miss or stale - fetch from API
  console.log(`⟳ Cache MISS: ${cacheKey}`)
  const content = await fetchGitHubFile(user, repo, path)

  // Save to cache (don't wait)
  saveToCache(cacheKey, content).catch((error) => {
    console.warn('Cache write error:', error)
  })

  return content
}

/**
 * Open IndexedDB
 */
async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' })
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

/**
 * Get entry from cache
 */
async function getFromCache(key: string): Promise<CacheEntry | null> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(key)

    request.onsuccess = () => {
      resolve(request.result || null)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

/**
 * Save entry to cache
 */
async function saveToCache(key: string, content: string): Promise<void> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)

    const entry: CacheEntry = {
      key,
      content,
      timestamp: Date.now(),
    }

    const request = store.put(entry)

    request.onsuccess = () => {
      resolve()
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

/**
 * Clear all cached files
 */
export async function clearGitHubCache(): Promise<void> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.clear()

    request.onsuccess = () => {
      console.log('✗ Cleared GitHub cache')
      resolve()
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

/**
 * Get cache statistics
 */
export async function getGitHubCacheStats(): Promise<{
  count: number
  totalSize: number
  entries: Array<{ key: string; age: number; size: number }>
}> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onsuccess = () => {
      const entries = (request.result as CacheEntry[]).map((entry) => ({
        key: entry.key,
        age: Date.now() - entry.timestamp,
        size: new Blob([entry.content]).size,
      }))

      const totalSize = entries.reduce((sum, entry) => sum + entry.size, 0)

      resolve({
        count: entries.length,
        totalSize,
        entries,
      })
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

/**
 * Fetch institute configuration
 */
export async function fetchInstituteConfig(
  instUser: string,
  instRepo: string
): Promise<any> {
  const content = await fetchGitHubFileCached(instUser, instRepo, 'config.yml')

  // Parse YAML (need to import yaml parser)
  const yaml = await import('js-yaml')
  return yaml.load(content)
}
