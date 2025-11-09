import React from "react";
import { createElement } from "react";
import { Fragment } from "react";
import * as prod from 'react/jsx-runtime'
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeReact from 'rehype-react'
import rehypeHighlight from 'rehype-highlight'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import { visit } from 'unist-util-visit'
import PythonREPLComponent from '../Editor/PythonREPLComponent';
import QuizComponent from './NewQuiz';
import Download from './Download';
import JSTerminal from '../Editor/JSTerminal';
import Info from './Info';
import SecretComponent from './SecretComponent';
import remarkDeflist from 'remark-deflist'
import { sanitizeBeforeParse } from '../../utils/sanitizer'


export default async function MDX({ content, allUploads, workshopTitle, language, setCode, setEditorOpen, setAskToRun, gitUser, gitRepo, gitFile, instUser, instRepo, setJupyterSrc, setFileFrontmatter }) {


  const InfoComponent = ({ node, ...props }) => {
    return (<Info text={props.children} />)
  }

  const PythonREPL = () => {
    return (<PythonREPLComponent />)
  }

  const Secret = ({ node, ...props }) => {
    return <SecretComponent text={props.children} />
  }

  const Quiz = ({ node, ...props }) => {
    const children = props.children
    return (
      <div>
        <QuizComponent>
          {children}
        </QuizComponent>
      </div>
    )
  }

  const DownloadComponent = ({ node, ...props }) => {
    return (<Download props={props} />)
  }

  const Keywords = ({ node, ...props }) => {
    return (<div className="keywords">{props.children}</div>)
  }

  function moveFootnotes() {
    return function (tree) {
      let footnotes = []
      // console.log('tree', tree) 

      visit(tree, (node) => {
    //     console.log('node', node)
    //     if (node.properties.dataFootnoteRef === true){
    //     }
    //     // footnotes.push(node)}
    //   })
    //   visit(tree, (node) => {
    //     let footnoteDef = node.children?.find((c) => c.properties?.id === '')
    //     let footnote = footnotes.find((f) => f.identifier === node.identifier)
    //     if (footnote) {
    //       node.type = 'element'
    //       node.tagName = 'sup'
    //       node.children = footnote.children
    //       console.log('node', node)
    //     }
    //   })
    // }
  })   
  }
}

  // function MDXTagPlugin() {
  //   return function (tree) {
  //     console.log('tree', tree)
  //     visit(tree, function (node) {
  //       if (node.name === 'PythonREPL') {
  //         node.type = 'element'
  //         node.tagName = 'pythonrepl'
  //       }
  //       if (node.name === 'Secret') {
  //         node.type = 'element'
  //         node.tagName = 'spoiler'
  //       }
  //       if (node.name === 'Quiz') {
  //         node.type = 'element'
  //         node.tagName = 'quiz'
  //       }
  //       if (node.name === 'Info') {
  //         node.type = 'element'
  //         node.tagName = 'info'
  //       }
  //       if (node.name === 'Download') {
  //         node.type = 'element'
  //         node.tagName = 'download'
  //       }
  //       if (node.name === 'Keywords') {
  //         node.type = 'element'
  //         node.tagName = 'keywords'
  //       }
  //     })
  //   }
  // }

  // Preprocess content for MDX quirks and custom tags
  let safeContent = (await content) || ''
  // Normalize void tags (br) to self-closing to satisfy MDX
  safeContent = safeContent
    .replace(/<br\s*>/gi, '<br />')
    .replace(/<br\s*\/\s*>/gi, '<br />')

  // Auto-close bare <Download ...> if not followed by </Download>
  safeContent = safeContent.replace(/<Download(\b[^>]*?)>(?!\s*<\s*\/\s*Download\s*>)/gi, '<Download$1></Download>')

  // Force self-closing placeholders to avoid dangling closers across slices
  safeContent = safeContent
    .replace(/<dhrift-info\b([^>]*)><\/dhrift-info>/gi, '<dhrift-info$1 />')
    .replace(/<dhrift-keywords\b([^>]*)><\/dhrift-keywords>/gi, '<dhrift-keywords$1 />')

  // Strip stray </Quiz> that appear before any <Quiz> opener in the document
  const stripStrayQuizClosers = (str) => {
    const lines = str.split(/\r?\n/)
    let depth = 0
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
      const opens = (line.match(/<\s*Quiz\b[^>]*>/gi) || []).length
      line = line.replace(/<\s*\/\s*Quiz\s*>/gi, (m) => {
        if (depth > 0) { depth--; return m }
        return ''
      })
      depth += opens
      lines[i] = line
    }
    return lines.join('\n')
  }
  safeContent = stripStrayQuizClosers(safeContent)

  // Auto-close <Quiz> when a block ends (blank line) or a new block starts (heading or tag)
  const normalizeQuizBlocks = (str) => {
    const lines = str.split(/\r?\n/)
    let inFence = false
    let openSince = -1
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true }
      else if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false }
      if (inFence) continue
      if (openSince !== -1) {
        const isHeading = /^\s*#{1,6}\s+/.test(line)
        const isTagOpen = /^\s*<\s*[A-Za-z]/.test(line)
        const isNewQuiz = /<Quiz\b[^>]*>/.test(line)
        if ((isHeading || isTagOpen) && !isNewQuiz) {
          let j = i - 1
          while (j >= openSince && lines[j].trim() === '') j--
          const at = j >= openSince ? j : openSince
          lines[at] = (lines[at] || '') + '</Quiz>'
          openSince = -1
        }
      }
      if (/^\s*<\/\s*Quiz\s*>\s*$/.test(line) && openSince === -1) {
        lines[i] = ''
        continue
      }
      if (/<Quiz\b[^>]*>/.test(line)) {
        if (/<\/\s*Quiz\s*>/.test(line)) continue
        openSince = i
        continue
      }
      if (!line.trim() && openSince !== -1) {
        let j = i - 1
        while (j >= openSince && lines[j].trim() === '') j--
        const at = j >= openSince ? j : openSince
        lines[at] = (lines[at] || '') + '</Quiz>'
        openSince = -1
        continue
      }
      if (/<\/\s*Quiz\s*>/.test(line)) {
        openSince = -1
      }
    }
    if (openSince !== -1) {
      lines[lines.length - 1] = (lines[lines.length - 1] || '') + '</Quiz>'
    }
    return lines.join('\n')
  }
  safeContent = normalizeQuizBlocks(safeContent)

  // Normalize <kbd> usage: auto-close unclosed <kbd>... and strip stray </kbd>
  const normalizeKbd = (str) => {
    const lines = str.split(/\r?\n/)
    let inFence = false
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
      if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; lines[i] = line; continue }
      if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; lines[i] = line; continue }
      if (inFence) { lines[i] = line; continue }
      // Balance per line: append missing closers, strip stray closers
      const openCount = (line.match(/<\s*kbd\b[^>]*>/gi) || []).length
      const closeCount = (line.match(/<\s*\/\s*kbd\s*>/gi) || []).length
      if (openCount > closeCount) {
        const missing = openCount - closeCount
        line = line + Array(missing).fill('</kbd>').join('')
      }
      let depth = 0
      line = line.replace(/<\s*kbd\b[^>]*>/gi, (m) => { depth++; return m })
                 .replace(/<\s*\/\s*kbd\s*>/gi, (m) => depth > 0 ? (depth--, m) : '')
      lines[i] = line
    }
    return lines.join('\n')
  }
  safeContent = normalizeKbd(safeContent)
  // Apply shared sanitizer for MDX safety
  safeContent = sanitizeBeforeParse(safeContent)

  let file
  try {
    file = unified()
      .use(remarkParse, { fragment: true })
      .use(remarkGfm)
      .use(remarkFrontmatter)
      .use(remarkDeflist)
      // .use(remarkMdx, { acornOptions: { allowImportExportEverywhere: false } })
      .use(remarkDirective)
      .use(remarkDirectiveRehype)
      .use(remarkRehype,
        {
          passThrough: ['mdxjsEsm', 'mdxFlowExpression', 'mdxJsxFlowElement', 'mdxJsxTextElement', 'mdxTextExpression']
        }
        )
        // .use(MDXTagPlugin)
        .use(rehypeHighlight)
        .use(rehypeReact,
          {
            createElement: createElement,
            Fragment: Fragment,
            jsx: prod.jsx,
            jsxs: prod.jsxs,
            components: {
              'pythonrepl': PythonREPL,
              'spoiler': Secret,
              'quiz': Quiz,
              'info': InfoComponent,
              'download': DownloadComponent,
              'terminal': JSTerminal,
              'keywords': Keywords,
            },
          }
          )
          .use(moveFootnotes)
      .process(safeContent).then((file) => {
        return file
      })
  } catch (e) {
    console.log('e', e)
  }

  return file
}
