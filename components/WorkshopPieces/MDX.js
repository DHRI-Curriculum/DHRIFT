import { MDXRemote } from 'next-mdx-remote/rsc'

// app/page.js
export default function Hometest() {
  return (
 
      <MDXRemote
        source={`# Hello World

        This is from Server Components!
        `}
      />
  )
}