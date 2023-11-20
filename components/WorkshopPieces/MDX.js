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
        if (node.properties.dataFootnoteRef === true){
        console.log('node', node)
        }
        // footnotes.push(node)}
      })
      visit(tree, (node) => {
        let footnoteDef = node.children?.find((c) => c.properties?.id === '')
        let footnote = footnotes.find((f) => f.identifier === node.identifier)
        if (footnote) {
          node.type = 'element'
          node.tagName = 'sup'
          node.children = footnote.children
          console.log('node', node)
        }
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
      .process(await content).then((file) => {
        return file
      })
  } catch (e) {
    console.log('e', e)
  }

  return file
}

