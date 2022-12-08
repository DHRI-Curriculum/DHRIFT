import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {marked} from 'marked'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


export default function Glossary({ glossary }) {

    const [currentTerm, setCurrentTerm] = useState(null)
    useEffect(() => {
        //    get currentTerm from url
        const urlParams = new URLSearchParams(window.location.search);
        const currentTerm = urlParams.get('term');
        //    set currentTerm
        setCurrentTerm(currentTerm)
    }, [])


    const termsAndDefs = []
    Object.keys(glossary).forEach(key => {

        let termAndDefinition = glossary[key]
        let slug = glossary[key].slug
        let term = Object.keys(termAndDefinition)[0]
        let definition = termAndDefinition[term]
        let termAndDefinitionArray = [term, definition, slug]
        termsAndDefs.push(termAndDefinitionArray)
    }, {})
    // [ A: [{term: 'a', definition: 'b'}, {term: 'c', definition: 'd'}], B: [{term: 'e', definition: 'f'}, {term: 'g', definition: 'h'}] ]

    

    const termsArrangedByLetter = []
    termsAndDefs.forEach(termAndDefinition => {
        let term = termAndDefinition[0]
        let definition = marked(termAndDefinition[1])
        // let definition = termAndDefinition[1]
        // regularize first letter
        let firstLetter = term.charAt(0).toUpperCase()
        let termAndDefinitionArray = { term: term, definition: definition }
        if (termsArrangedByLetter[firstLetter]) {
            termsArrangedByLetter[firstLetter].push(termAndDefinitionArray)
        } else {
            termsArrangedByLetter[firstLetter] = [termAndDefinitionArray]
        }
    }, {})

    // alphabetize termsArrangedByLetter
    const alphabetizedTerms = Object.keys(termsArrangedByLetter).sort()

    // create a page for letter a, letter b, letter c, etc.
    const glossaryPages = []

    const GlossaryPage = (letter, terms) => {
        return (
            <div className="glossary-page">
                <h2>{letter}</h2>
                {terms.map(term => {
                    return (
                        <Accordion key={term.term}>
                            <AccordionSummary>
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <Box flexGrow={1}>
                                        <span className="term">{term.term}</span>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <Box flexGrow={1}>
                                        <div className='definition' dangerouslySetInnerHTML={{ __html: term.definition }} />
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>
        )
    }

    alphabetizedTerms.forEach(letter => {
        glossaryPages.push(GlossaryPage(letter, termsArrangedByLetter[letter]))
    }
    )
    // default to page a if no term is selected 
    const defaultGlossaryPage = glossaryPages[0]
    const [currentGlossaryPage, setCurrentGlossaryPage] = useState(defaultGlossaryPage)
    const [currentLetter, setCurrentLetter] = useState(alphabetizedTerms[0])

    const handleLetterClick = letter => {
        setCurrentLetter(letter)
        setCurrentGlossaryPage(glossaryPages[alphabetizedTerms.indexOf(letter)])
    }

    // if currentTerm, return the term and definition
    useEffect(() => {
        if (currentTerm) {
            // find term by slug in termsAndDefs
            const termAndDefinition = termsAndDefs.find(termAndDefinition => termAndDefinition[2] === currentTerm)

            if (termAndDefinition) {
                const term = termAndDefinition[0]
                const definition = marked(termAndDefinition[1])
                // const definition = termAndDefinition[1]
                setCurrentGlossaryPage(
                    <div className="glossary-page">
                        <h2>{term}</h2>
                        <div className='definition' dangerouslySetInnerHTML={{ __html: definition }} />
                    </div>
                )
            } else {
                setCurrentGlossaryPage(<div className="glossary-page">
                    <h2>Term not found</h2>
                </div>)
            }
        }
    }, [currentTerm])


    const letterSelector = (
        <Box className="letter-selector">
            <ButtonGroup>
                {alphabetizedTerms.map(letter => {
                    return (
                        <Button key={letter} onClick={() => handleLetterClick(letter)}>{letter}</Button>
                    )
                })}
            </ButtonGroup>
        </Box>
    )



    return (
        <div className="glossary mui-container">
            <div className="glossary-header">
                <h1>Glossary</h1>
                <div className="letter-selector">
                    {letterSelector}
                </div>
            </div>
            <div className="glossary-content">
                {currentGlossaryPage}
            </div>
        </div>
    )
}



export async function getStaticProps() {
    // Get files from the workshops dir
    const getFilesandProcess = (dir) => {
        const dirents = fs.readdirSync(path.join(dir), { withFileTypes: true })
        const dirFiles = dirents
            .filter((file) => file.isFile())
            .map((file) => file.name);
        // Get slug and frontmatter from workshop
        const markdownFiles = dirFiles.map((filename) => {
            // Create slug
            const slug = filename.replace('.md', '')

            // Get frontmatter
            const markdownWithMeta = fs.readFileSync(
                path.join(dir, filename),
                'utf-8',
            )

            const matterResult = matter(markdownWithMeta)
            const content = matterResult.content
            return {
                slug,
                content: content,
                ...matterResult.data,
            }

        })
        return markdownFiles
    }
    const workshopFiles = getFilesandProcess('workshops')
    const installFiles = getFilesandProcess('guides')
    const insightsFiles = getFilesandProcess('insights')


    //  load every file in the terms dir
    const glossary = {}
    const glossaryDir = 'terms'
    const dirents = fs.readdirSync(path.join(glossaryDir), { withFileTypes: true })
    const dirFiles = dirents
        .filter((file) => file.isFile())
        .map((file) => file.name);
    // add terms to glossary
    dirFiles.forEach(filename => {


        const markdownWithMeta = fs.readFileSync(
            path.join(glossaryDir, filename),
            'utf-8',
        )
        const matterResult = matter(markdownWithMeta)
        // term is first line of file
        const term = matterResult.content.split('\n')[0]
        // remove # and space from term
        const termWithoutHash = term.replace('# ', '')
        const content = matterResult.content
        glossary[termWithoutHash] = { [termWithoutHash]: content }
        glossary[termWithoutHash].slug = filename.replace('.md', '')
    })

    return {
        props: {
            workshops: workshopFiles.sort(),
            guides: installFiles.sort(),
            insights: insightsFiles.sort(),
            glossary: glossary,
        },
    }
}
