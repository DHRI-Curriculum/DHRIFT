/**
 * Remark Custom Directives Plugin
 *
 * Converts remark-directive syntax into MDX components
 * Example: :::info → <Info>...</Info>
 *
 * This allows workshop authors to use clean directive syntax:
 * :::info
 * This is an info box
 * :::
 */

import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root } from 'mdast'
import { directiveMap } from '../mdx-config'

export const remarkCustomDirectives: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, (node: any) => {
      // Handle container directives (:::name)
      if (node.type === 'containerDirective') {
        const componentName = directiveMap[node.name] || node.name

        // Convert directive to JSX-like structure
        node.data = {
          ...node.data,
          hName: componentName,
          hProperties: {
            ...node.attributes,
            className: `directive-${node.name}`,
          },
        }
      }

      // Handle leaf directives (::name)
      if (node.type === 'leafDirective') {
        const componentName = directiveMap[node.name] || node.name

        node.data = {
          ...node.data,
          hName: componentName,
          hProperties: {
            ...node.attributes,
            inline: true,
            className: `directive-${node.name}`,
          },
        }
      }

      // Handle text directives (:name)
      if (node.type === 'textDirective') {
        const componentName = directiveMap[node.name] || node.name

        node.data = {
          ...node.data,
          hName: componentName,
          hProperties: {
            ...node.attributes,
            inline: true,
            variant: 'text',
            className: `directive-${node.name}`,
          },
        }
      }
    })
  }
}

/**
 * Helper: Extract text content from directive children
 */
export function extractDirectiveContent(node: any): string {
  if (!node.children) return ''

  return node.children
    .map((child: any) => {
      if (child.type === 'text') return child.value
      if (child.type === 'paragraph') return extractDirectiveContent(child)
      return ''
    })
    .join('\n')
}

/**
 * Helper: Parse directive attributes
 * Example: :::quiz{correct="0"} → { correct: "0" }
 */
export function parseDirectiveAttributes(node: any): Record<string, string> {
  const attrs: Record<string, string> = {}

  if (node.attributes) {
    Object.assign(attrs, node.attributes)
  }

  return attrs
}
