/**
 * GitHub API utilities for fetching workshop content
 * Type-safe, server-side only implementation
 */

import yaml from 'js-yaml'
import { InstituteConfigSchema, type InstituteConfig } from '@/types/workshop'

const GITHUB_API_BASE = 'https://api.github.com'

interface GitHubFileResponse {
  content: string
  encoding: string
  size: number
  name: string
}

/**
 * Fetch a file from GitHub repository
 * Server-side only - uses optional GitHub token from environment
 */
export async function fetchGitHubFile(
  user: string,
  repo: string,
  path: string
): Promise<string> {
  const url = `${GITHUB_API_BASE}/repos/${user}/${repo}/contents/${path}`

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }

  // Use GitHub token if available (server-side only)
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText} (${url})`
    )
  }

  const data = (await response.json()) as GitHubFileResponse

  // Decode base64 content
  const content = Buffer.from(data.content, 'base64').toString('utf-8')

  return content
}

/**
 * Fetch and parse institute configuration from config.yml
 */
export async function fetchInstituteConfig(
  instUser: string,
  instRepo: string
): Promise<InstituteConfig> {
  const content = await fetchGitHubFile(instUser, instRepo, 'config.yml')

  const parsed = yaml.load(content)

  // Validate with Zod
  const validated = InstituteConfigSchema.parse(parsed)

  return validated
}

/**
 * List all workshop files in a repository
 */
export async function listWorkshopFiles(
  user: string,
  repo: string
): Promise<string[]> {
  const url = `${GITHUB_API_BASE}/repos/${user}/${repo}/contents`

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }

  const data = await response.json()

  // Filter for .md files, exclude README and template
  const workshops = data
    .filter((file: any) =>
      file.name.endsWith('.md') &&
      file.name !== 'README.md' &&
      !file.name.includes('template')
    )
    .map((file: any) => file.name)

  return workshops
}

/**
 * Check if a GitHub repository exists
 */
export async function checkRepoExists(
  user: string,
  repo: string
): Promise<boolean> {
  const url = `${GITHUB_API_BASE}/repos/${user}/${repo}`

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      next: { revalidate: 3600 },
    })
    return response.ok
  } catch {
    return false
  }
}
