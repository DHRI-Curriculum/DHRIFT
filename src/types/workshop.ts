import { z } from 'zod'

// Workshop frontmatter schema
export const WorkshopFrontmatterSchema = z.object({
  title: z.string(),
  'cover title': z.string().optional(),
  description: z.string(),
  programming_language: z.string().optional(),
  'learning objectives': z.array(z.string()).optional(),
  'estimated time': z.array(z.string()).optional(),
  prerequisites: z.record(z.object({
    description: z.string(),
    required: z.boolean().optional(),
    recommended: z.boolean().optional(),
  })).optional(),
  instructors: z.array(z.string()).optional(),
  authors: z.array(z.string()).optional(),
  editors: z.array(z.string()).optional(),
  readings: z.array(z.string()).optional(),
  'ethical considerations': z.array(z.string()).optional(),
  projects: z.record(z.object({
    description: z.string(),
    link: z.string().optional(),
  })).optional(),
  resources: z.record(z.object({
    description: z.string(),
    link: z.string().optional(),
  })).optional(),
  goals: z.array(z.union([
    z.string(),
    z.object({ description: z.string() })
  ])).optional(),
})

export type WorkshopFrontmatter = z.infer<typeof WorkshopFrontmatterSchema>

// Institute config schema
export const InstituteConfigSchema = z.object({
  organization: z.string().optional(),
  event: z.string().optional(),
  datestart: z.string().optional(),
  enddate: z.string().optional(),
  workshopsuser: z.string(),
  workshopsrepo: z.string(),
  sessions: z.array(z.any()).optional(),
  sponsors: z.array(z.any()).optional(),
  organizers: z.array(z.any()).optional(),
})

export type InstituteConfig = z.infer<typeof InstituteConfigSchema>

// Workshop content
export interface Workshop {
  frontmatter: WorkshopFrontmatter
  content: string
  slug: string
}

// GitHub parameters
export interface GitHubParams {
  user: string
  repo: string
  file?: string
  page?: string
}

export interface InstituteParams {
  instUser: string
  instRepo: string
}
