# Static Site Architecture for DHRIFT

## Overview

DHRIFT is a static site (Next.js with `output: 'export'`). All MDX compilation happens at **build time**, not runtime.

## Build-Time vs Runtime

### Build Time (Static Generation)
1. **Fetch**: Get workshop markdown from GitHub
2. **Compile**: Run `compileWorkshopMDX()` with full plugin pipeline
3. **Serialize**: Convert to `MDXRemoteSerializeResult` (JSON-serializable)
4. **Generate**: Create static HTML files with embedded compiled MDX

### Runtime (Browser)
1. **Load**: Serve pre-generated static HTML
2. **Hydrate**: Client components (Quiz, Keywords, REPLs) become interactive
3. **Render**: `<MDXRemote>` renders pre-compiled MDX with custom components
4. **No compilation**: Zero MDX parsing/compilation in browser

## How It Works

### 1. Page Component (Server Component at Build Time)

```typescript
// src/app/workshop/[user]/[repo]/[file]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import { compileWorkshopMDX } from '@/lib/mdx'
import { fetchGitHubFile } from '@/lib/github'
import * as mdxComponents from '@/components/mdx'

export default async function WorkshopPage({ params }) {
  // ⏰ BUILD TIME: Fetch markdown from GitHub
  const markdown = await fetchGitHubFile(params.user, params.repo, params.file)

  // ⏰ BUILD TIME: Compile with our plugin pipeline
  const { frontmatter, mdxSource } = await compileWorkshopMDX(markdown)

  // ⏰ BUILD TIME: Result is serialized into static HTML
  return (
    <>
      <Frontmatter data={frontmatter} />
      <MDXRemote {...mdxSource} components={mdxComponents} />
    </>
  )
}

// Tell Next.js which pages to pre-generate
export async function generateStaticParams() {
  // ⏰ BUILD TIME: Fetch list of all workshops
  const workshops = await fetchAllWorkshops()

  return workshops.map(w => ({
    user: w.user,
    repo: w.repo,
    file: w.file,
  }))
}
```

### 2. MDX Compilation Pipeline (Build Time Only)

```typescript
// src/lib/mdx.ts
import { serialize } from 'next-mdx-remote/serialize'

export async function compileWorkshopMDX(markdown: string) {
  // ⏰ BUILD TIME ONLY
  // 1. Parse frontmatter
  // 2. Preprocess (minimal fixes)
  // 3. Compile with remark/rehype plugins
  // 4. Return serializable result

  const mdxSource = await serialize(processedContent, {
    ...serializeOptions, // Our plugin config
    scope: { frontmatter },
  })

  return { frontmatter, mdxSource }
}
```

### 3. Component Hydration (Runtime)

```typescript
// src/components/mdx/Quiz.tsx
'use client' // ⏰ RUNTIME: Becomes interactive in browser

export function Quiz({ children }) {
  // Component runs in browser
  // State, event handlers, etc. work normally
  const [selected, setSelected] = useState(...)

  return <FormControl>...</FormControl>
}
```

## Key Points

### ✅ What Happens at Build Time
- Fetch all workshop markdown from GitHub
- Run remark/rehype plugin pipeline
- Compile MDX to JavaScript
- Generate static HTML files
- Embed compiled MDX as JSON in HTML

### ✅ What Happens at Runtime
- Serve static HTML (fast!)
- Hydrate interactive components (Quiz, REPLs)
- No compilation or parsing
- No GitHub API calls
- Pure client-side interactivity

### ❌ What Doesn't Work in Static Sites
- Server-side API routes (`/api/*`)
- Dynamic server rendering per request
- Runtime environment variables (only build-time vars)
- Incremental Static Regeneration (ISR)

## Optimizations for Static Sites

### 1. Build-Time Caching
```typescript
// Cache compiled MDX between builds
const cache = new Map<string, MDXRemoteSerializeResult>()

export async function compileWorkshopMDX(markdown: string) {
  const hash = createHash(markdown)
  if (cache.has(hash)) return cache.get(hash)

  const result = await serialize(...)
  cache.set(hash, result)
  return result
}
```

### 2. Parallel Compilation
```typescript
export async function generateStaticParams() {
  const workshops = await fetchAllWorkshops()

  // Compile all workshops in parallel at build time
  await Promise.all(
    workshops.map(w => compileWorkshopMDX(w.content))
  )

  return workshops.map(w => ({ user: w.user, repo: w.repo, file: w.file }))
}
```

### 3. Build-Time Environment Variables
```bash
# .env.local (used at build time)
GITHUB_TOKEN=ghp_xxxxx
NEXT_PUBLIC_INSTITUTE_USER=DHRI-Curriculum
NEXT_PUBLIC_INSTITUTE_REPO=dhrift-site-template
```

## File Size Considerations

### Problem
Each workshop page includes:
- Static HTML (fast)
- Compiled MDX as JSON (can be large)
- React hydration bundles

### Solution 1: Code Splitting
```typescript
// Lazy load heavy components
const PythonREPL = dynamic(() => import('./PythonREPL'), {
  loading: () => <Skeleton />,
  ssr: false, // Don't include in initial HTML
})
```

### Solution 2: MDX Pagination
```typescript
// Split long workshops into pages
export function splitIntoPages(content: string): string[] {
  return content.split(/^## /m)
}

// Generate separate pages for each section
export async function generateStaticParams() {
  const workshops = await fetchAllWorkshops()
  const pages = []

  for (const workshop of workshops) {
    const sections = splitIntoPages(workshop.content)
    sections.forEach((_, index) => {
      pages.push({ ...workshop, page: index.toString() })
    })
  }

  return pages
}
```

## Deployment

### Build Command
```bash
npm run build
# Output: ./out directory with static files
```

### Deploy to Any Static Host
- GitHub Pages
- Netlify
- Vercel (as static)
- Cloudflare Pages
- AWS S3 + CloudFront
- Any CDN or web server

### Build Time Considerations
- 22 workshops × ~20 seconds each = ~7 minutes build time
- Use build caching to speed up
- Consider incremental builds (only changed workshops)

## Testing Locally

```bash
# Build static site
npm run build

# Serve static files (using any static server)
npx serve out

# Or use Next.js built-in server
npm run start
```

## Migration Path

1. ✅ Current: MDX compilation architecture (done)
2. 🔄 Next: Update WorkshopPage to use MDXRemote with RSC
3. 🔄 Next: Implement generateStaticParams
4. 🔄 Next: Test build and deployment
5. 🔄 Next: Optimize build time with caching
6. 🔄 Next: Add build-time validation and error reporting
