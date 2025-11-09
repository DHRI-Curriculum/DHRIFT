/**
 * GitHub API Proxy (Vercel Edge Function)
 *
 * Proxies GitHub API requests using the site owner's token.
 * This keeps the token secure (not exposed in client bundle).
 *
 * Deploy: Vercel automatically detects /api/* files
 * Environment: Set GITHUB_TOKEN in Vercel dashboard
 */

import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

interface GitHubFileResponse {
  content: string
  encoding: string
  size: number
  name: string
}

export default async function handler(req: NextRequest) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    )
  }

  const { searchParams } = new URL(req.url)
  const user = searchParams.get('user')
  const repo = searchParams.get('repo')
  const path = searchParams.get('path')

  // Validate parameters
  if (!user || !repo || !path) {
    return NextResponse.json(
      { error: 'Missing required parameters: user, repo, path' },
      { status: 400 }
    )
  }

  // Check for token
  if (!process.env.GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN not configured')
    return NextResponse.json(
      { error: 'GitHub token not configured' },
      { status: 500 }
    )
  }

  try {
    // Fetch from GitHub using owner's token
    const githubUrl = `https://api.github.com/repos/${user}/${repo}/contents/${path}`

    const response = await fetch(githubUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'DHRIFT',
      },
      // Cache for 5 minutes at edge
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} for ${githubUrl}`)
      return NextResponse.json(
        {
          error: 'GitHub API error',
          status: response.status,
          message: response.statusText,
        },
        { status: response.status }
      )
    }

    const data = (await response.json()) as GitHubFileResponse

    // Decode base64 content
    const content = Buffer.from(data.content, 'base64').toString('utf-8')

    // Return with CORS headers for client access
    return NextResponse.json(
      {
        content,
        name: data.name,
        size: data.size,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    console.error('GitHub proxy error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
