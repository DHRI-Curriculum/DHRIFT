"use client"

import { compileMDX } from 'next-mdx-remote/rsc'
 

export default async function MDX() {
  // Optionally provide a type for your frontmatter object
  const { content, frontmatter } = await compileMDX({
    source: `---
      title: RSC Frontmatter Example
      ---
      # Hello World
      This is from Server Components!
    `,
    options: { parseFrontmatter: true },
  })
  return (
    <>
      <h1>{frontmatter.title}</h1>
      {content}
    </>
  )
}