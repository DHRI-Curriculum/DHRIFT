/**
 * Rehype Component Wrapper Plugin
 *
 * Wraps specified components in error boundaries to handle
 * rendering failures gracefully without breaking the entire page.
 *
 * Example: <Quiz> → <ComponentErrorBoundary><Quiz></ComponentErrorBoundary>
 */

import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root } from 'hast'
import { errorBoundaryConfig } from '../mdx-config'

export const rehypeComponentWrapper: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: any, index, parent) => {
      // Check if this component should be wrapped
      const shouldWrap = errorBoundaryConfig.wrappedComponents.includes(node.tagName)

      if (shouldWrap && parent && typeof index === 'number') {
        // Create error boundary wrapper
        const wrapper = {
          type: 'element',
          tagName: 'ComponentErrorBoundary',
          properties: {
            componentName: node.tagName,
          },
          children: [node],
        }

        // Replace original node with wrapped version
        parent.children[index] = wrapper
      }
    })
  }
}

/**
 * Helper: Check if element needs error boundary
 */
export function needsErrorBoundary(tagName: string): boolean {
  return errorBoundaryConfig.wrappedComponents.includes(tagName)
}
