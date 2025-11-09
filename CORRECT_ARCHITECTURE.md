# DHRIFT Actual Architecture

## How DHRIFT Really Works

DHRIFT is a **static site with dynamic content fetching**:

1. **Static Export**: App shell deployed as static HTML/CSS/JS
2. **Dynamic Workshops**: Each user/institution provides their own workshop repos
3. **Client-Side Rendering**: Workshops fetched and rendered in browser
4. **Owner's Token**: Site owner's GitHub token used for API calls (not user's)

## User Flow

```
1. User visits: https://app.dhrift.org/inst?instUser=DHRI-Curriculum&instRepo=workshops
2. Client JS fetches: config.yml from DHRI-Curriculum/workshops
3. Client JS fetches: workshop markdown from repos listed in config
4. Client JS compiles: MDX in browser with custom components
5. Client JS renders: Interactive workshop with Quiz, REPL, etc.
```

## Architecture Challenge: Token Security

### Problem
- GitHub API requires token for reasonable rate limits (5,000 vs 60 req/hour)
- Static export = no server = can't hide token server-side
- Can't put token in client bundle (anyone can extract it)

### Solution: Serverless Function Proxy

```
Client (browser)
    ↓ fetch('/api/github?user=X&repo=Y&path=Z')
Serverless Function (Vercel/Netlify/Cloudflare)
    ↓ uses GITHUB_TOKEN from env
GitHub API
    ↓ returns content
Serverless Function
    ↓ returns to client
Client renders workshop
```

## Implementation

### 1. Serverless Function (Vercel)

```typescript
// api/github.ts (Vercel Edge Function)
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const user = searchParams.get('user')
  const repo = searchParams.get('repo')
  const path = searchParams.get('path')

  if (!user || !repo || !path) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  // Fetch from GitHub with OWNER'S token
  const response = await fetch(
    `https://api.github.com/repos/${user}/${repo}/contents/${path}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  )

  if (!response.ok) {
    return NextResponse.json(
      { error: 'GitHub API error' },
      { status: response.status }
    )
  }

  const data = await response.json()

  // Decode base64 content
  const content = Buffer.from(data.content, 'base64').toString('utf-8')

  return NextResponse.json({ content })
}
```

### 2. Client-Side GitHub Library

```typescript
// src/lib/github-client.ts
'use client'

/**
 * Client-side GitHub API wrapper
 * Uses serverless proxy to hide token
 */
export async function fetchGitHubFile(
  user: string,
  repo: string,
  path: string
): Promise<string> {
  const url = `/api/github?user=${user}&repo=${repo}&path=${encodeURIComponent(path)}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.statusText}`)
  }

  const { content } = await response.json()
  return content
}

/**
 * Client-side caching with IndexedDB
 */
const DB_NAME = 'dhrift-cache'
const STORE_NAME = 'github-files'

export async function fetchGitHubFileCached(
  user: string,
  repo: string,
  path: string,
  maxAge: number = 3600000 // 1 hour
): Promise<string> {
  const cacheKey = `${user}/${repo}/${path}`

  // Try cache first
  const cached = await getCached(cacheKey)
  if (cached && Date.now() - cached.timestamp < maxAge) {
    console.log('✓ Cache HIT:', cacheKey)
    return cached.content
  }

  // Fetch from API
  console.log('⟳ Cache MISS:', cacheKey)
  const content = await fetchGitHubFile(user, repo, path)

  // Save to cache
  await setCache(cacheKey, content)

  return content
}

async function getCached(key: string) {
  const db = await openDB()
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.get(key)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => resolve(null)
  })
}

async function setCache(key: string, content: string) {
  const db = await openDB()
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    store.put({ key, content, timestamp: Date.now() })
    tx.oncomplete = () => resolve(true)
  })
}

async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
```

### 3. Client-Side MDX Compilation

```typescript
// src/lib/mdx-client.ts
'use client'

import { evaluate } from '@mdx-js/mdx'
import { mdxOptions } from './mdx-config'
import * as runtime from 'react/jsx-runtime'

/**
 * Compile MDX in browser
 * Runs at RUNTIME in user's browser
 */
export async function compileMDXClient(
  markdown: string,
  scope = {}
) {
  // Client-side MDX compilation with our plugin pipeline
  const { default: MDXContent } = await evaluate(markdown, {
    ...runtime,
    ...mdxOptions,
    development: false,
    // @ts-ignore
    useMDXComponents: () => scope,
  })

  return MDXContent
}
```

### 4. Client Component

```typescript
// src/components/WorkshopClient.tsx
'use client'

import { useEffect, useState } from 'react'
import { fetchGitHubFileCached } from '@/lib/github-client'
import { compileMDXClient } from '@/lib/mdx-client'
import { parseWorkshopMarkdown } from '@/lib/mdx'
import * as mdxComponents from '@/components/mdx'

export function WorkshopClient({ user, repo, file }) {
  const [MDXContent, setMDXContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      // Fetch from GitHub (via proxy, with IndexedDB cache)
      const markdown = await fetchGitHubFileCached(user, repo, `${file}.md`)

      // Parse frontmatter and preprocess
      const { frontmatter, content } = parseWorkshopMarkdown(markdown)

      // Compile MDX in browser
      const Component = await compileMDXClient(content, { frontmatter })

      setMDXContent(() => Component)
      setLoading(false)
    }

    load()
  }, [user, repo, file])

  if (loading) return <div>Loading workshop...</div>

  return <MDXContent components={mdxComponents} />
}
```

## Deployment Options

### Vercel (Recommended)
```bash
# Deploy static export with edge functions
npm run build
vercel deploy

# Set environment variable
vercel env add GITHUB_TOKEN
```

### Netlify
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[[edge_functions]]
  path = "/api/github"
  function = "github-proxy"
```

```typescript
// netlify/edge-functions/github-proxy.ts
export default async (request: Request) => {
  // Same implementation as Vercel
}
```

### Cloudflare Pages
```typescript
// functions/api/github.ts
export async function onRequest(context) {
  // Same implementation
}
```

## Rate Limits with This Approach

### Without Cache
- 5,000 requests/hour (with owner's token)
- Each workshop view = ~1-3 requests
- ~1,600+ workshop views per hour

### With IndexedDB Cache
- First view: 1-3 API requests
- Subsequent views: 0 API requests (served from browser cache)
- Effectively unlimited views

## Benefits

1. ✅ **Static hosting**: Deploy anywhere (Vercel, Netlify, GitHub Pages + CF Workers)
2. ✅ **Secure token**: Hidden in serverless function
3. ✅ **Dynamic content**: Any user can provide their own workshop repos
4. ✅ **Fast**: IndexedDB caching means instant repeat visits
5. ✅ **Scalable**: Serverless functions scale automatically
6. ✅ **Owner's token**: Institution provides their own GitHub token

## For Other Institutions

To deploy your own DHRIFT:

1. Fork this repo
2. Set your `GITHUB_TOKEN` in platform environment variables
3. Deploy to Vercel/Netlify/Cloudflare
4. Users visit with `?instUser=YOUR_ORG&instRepo=YOUR_WORKSHOPS`
5. Workshops loaded from YOUR repos using YOUR token
