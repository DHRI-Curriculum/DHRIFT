# GitHub API Strategy for Static Sites

## Rate Limit Problem

### GitHub API Rate Limits
- **Unauthenticated**: 60 requests/hour per IP
- **Authenticated** (with token): 5,000 requests/hour

### Our Build Requirements
For a full static site build with 22 workshops:
- 1 request: Institute config (config.yml)
- 22 requests: Workshop markdown files
- **Total: ~23 requests per build**

### Issues
1. **Development Rebuilds**: Running `npm run build` repeatedly hits limits fast
2. **CI/CD**: Every push triggers a build = more API calls
3. **Multiple Developers**: Shared IP for unauthenticated requests
4. **Parallel Builds**: Building multiple branches simultaneously

## Current Implementation

```typescript
// src/lib/github.ts
export async function fetchGitHubFile(user, repo, path) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  }

  // ✅ Uses token if available (5,000 req/hour)
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  // ⚠️ Next.js cache only works at runtime, not build-time
  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 },
  })
}
```

## Solution: Build-Time Caching

### Strategy
1. **Token Authentication** (implemented): Always use GITHUB_TOKEN at build time
2. **File System Cache**: Cache responses between builds
3. **Cache Invalidation**: Smart invalidation based on git commits
4. **Parallel Request Limiting**: Rate-limit concurrent requests

### Implementation

```typescript
// src/lib/github-cache.ts
import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

const CACHE_DIR = path.join(process.cwd(), '.github-cache')

/**
 * Cached GitHub file fetch
 * Falls back to API if cache miss or stale
 */
export async function fetchGitHubFileCached(
  user: string,
  repo: string,
  filePath: string,
  options: {
    maxAge?: number // Cache age in seconds (default: 1 hour)
    skipCache?: boolean
  } = {}
): Promise<string> {
  const { maxAge = 3600, skipCache = false } = options

  // Generate cache key
  const cacheKey = `${user}/${repo}/${filePath}`
  const cacheHash = crypto
    .createHash('md5')
    .update(cacheKey)
    .digest('hex')
  const cacheFile = path.join(CACHE_DIR, `${cacheHash}.json`)

  // Check cache (unless skipped)
  if (!skipCache) {
    try {
      const cached = await fs.readFile(cacheFile, 'utf-8')
      const { content, timestamp } = JSON.parse(cached)

      const age = (Date.now() - timestamp) / 1000
      if (age < maxAge) {
        console.log(`✓ Cache HIT: ${cacheKey} (${age.toFixed(0)}s old)`)
        return content
      }
    } catch {
      // Cache miss
    }
  }

  // Fetch from API
  console.log(`⟳ Cache MISS: ${cacheKey} - fetching from GitHub`)
  const content = await fetchGitHubFile(user, repo, filePath)

  // Save to cache
  await fs.mkdir(CACHE_DIR, { recursive: true })
  await fs.writeFile(
    cacheFile,
    JSON.stringify({
      content,
      timestamp: Date.now(),
      cacheKey,
    })
  )

  return content
}

/**
 * Invalidate cache for specific repository
 * Useful when you know content has changed
 */
export async function invalidateRepoCache(user: string, repo: string) {
  const files = await fs.readdir(CACHE_DIR)

  for (const file of files) {
    const cachePath = path.join(CACHE_DIR, file)
    const cached = JSON.parse(await fs.readFile(cachePath, 'utf-8'))

    if (cached.cacheKey.startsWith(`${user}/${repo}/`)) {
      await fs.unlink(cachePath)
      console.log(`✗ Invalidated cache: ${cached.cacheKey}`)
    }
  }
}

/**
 * Clear all cached files
 */
export async function clearCache() {
  await fs.rm(CACHE_DIR, { recursive: true, force: true })
  console.log('✗ Cleared all GitHub API cache')
}

/**
 * Get cache statistics
 */
export async function getCacheStats() {
  try {
    const files = await fs.readdir(CACHE_DIR)
    const stats = await Promise.all(
      files.map(async (file) => {
        const cachePath = path.join(CACHE_DIR, file)
        const stat = await fs.stat(cachePath)
        const cached = JSON.parse(await fs.readFile(cachePath, 'utf-8'))
        return {
          key: cached.cacheKey,
          age: (Date.now() - cached.timestamp) / 1000,
          size: stat.size,
        }
      })
    )

    return {
      count: stats.length,
      totalSize: stats.reduce((sum, s) => sum + s.size, 0),
      items: stats,
    }
  } catch {
    return { count: 0, totalSize: 0, items: [] }
  }
}
```

### Usage in Build

```typescript
// src/lib/github.ts
import { fetchGitHubFileCached } from './github-cache'

export async function fetchGitHubFile(
  user: string,
  repo: string,
  path: string
): Promise<string> {
  // Use cached version during builds
  if (process.env.NODE_ENV === 'production' || process.env.USE_CACHE === 'true') {
    return fetchGitHubFileCached(user, repo, path)
  }

  // Direct fetch in development
  return fetchGitHubFileDirect(user, repo, path)
}
```

### .gitignore Addition

```gitignore
# GitHub API cache (build-time only)
.github-cache/
```

## Rate Limit Monitoring

```typescript
// src/lib/github-rate-limit.ts

/**
 * Check current GitHub API rate limit status
 */
export async function checkRateLimit(): Promise<{
  limit: number
  remaining: number
  reset: Date
}> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch('https://api.github.com/rate_limit', {
    headers,
  })

  const data = await response.json()
  const core = data.resources.core

  return {
    limit: core.limit,
    remaining: core.remaining,
    reset: new Date(core.reset * 1000),
  }
}

/**
 * Wait if rate limit is near exhaustion
 */
export async function respectRateLimit(threshold = 10) {
  const { remaining, reset } = await checkRateLimit()

  if (remaining < threshold) {
    const waitTime = reset.getTime() - Date.now()
    console.warn(
      `⚠️  Rate limit low (${remaining} remaining). Waiting ${
        waitTime / 1000
      }s...`
    )
    await new Promise((resolve) => setTimeout(resolve, waitTime))
  }
}
```

## Build Script with Cache Management

```json
// package.json
{
  "scripts": {
    "build": "next build",
    "build:fresh": "npm run cache:clear && npm run build",
    "build:cached": "USE_CACHE=true npm run build",
    "cache:clear": "node -e \"require('fs').rmSync('.github-cache', {recursive:true, force:true})\"",
    "cache:stats": "node scripts/cache-stats.js"
  }
}
```

## Best Practices

### Development
```bash
# Use cache during development to save API calls
USE_CACHE=true npm run dev

# Force fresh fetch when you know content changed
npm run build:fresh
```

### CI/CD (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
- name: Restore GitHub API cache
  uses: actions/cache@v3
  with:
    path: .github-cache
    key: github-api-${{ hashFiles('**/config.yml') }}
    restore-keys: github-api-

- name: Build site
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    USE_CACHE: true
  run: npm run build

- name: Save GitHub API cache
  uses: actions/cache@v3
  with:
    path: .github-cache
    key: github-api-${{ hashFiles('**/config.yml') }}
```

### Local Development
```bash
# Create .env.local
echo "GITHUB_TOKEN=ghp_your_token_here" > .env.local
echo "USE_CACHE=true" >> .env.local

# First build (fetches from API, populates cache)
npm run build

# Subsequent builds (uses cache, very fast)
npm run build

# Clear cache when workshops are updated
npm run cache:clear && npm run build
```

## Rate Limit Calculation

### Worst Case (No Cache, No Token)
- 22 workshops = 22 API calls
- 60 requests/hour limit
- Can build ~2.7 times per hour
- ❌ Not sustainable for development

### Best Case (With Cache & Token)
- First build: 22 API calls
- Subsequent builds: 0 API calls (cached)
- 5,000 requests/hour limit
- Can build 227+ times per hour (fresh)
- ✅ Excellent for development and CI/CD

## Monitoring & Alerts

```typescript
// Check before build
const { remaining } = await checkRateLimit()
console.log(`GitHub API: ${remaining} requests remaining`)

if (remaining < 100) {
  console.warn('⚠️  Running low on API requests!')
}

if (remaining < 10) {
  throw new Error('❌ GitHub API rate limit exhausted. Try again later.')
}
```

## Summary

1. ✅ **Always use GITHUB_TOKEN**: Required for reasonable limits
2. ✅ **Implement file-system cache**: Avoid repeated API calls
3. ✅ **Cache in CI/CD**: Use GitHub Actions cache
4. ✅ **Monitor rate limits**: Check before builds
5. ✅ **Clear cache strategically**: Only when content changes

With these strategies, you can build hundreds of times per hour without hitting rate limits.
