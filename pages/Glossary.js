import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'
import yaml from 'js-yaml'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export default function Glossary({glossary}){
    const termsAndDefs = []
    Object.keys(glossary).forEach(key => {
        let termAndDefinition = glossary[key]
        let term = Object.keys(termAndDefinition)[0]
        let definition = termAndDefinition[term]
        let termAndDefinitionArray = [term, definition]
        termsAndDefs.push(termAndDefinitionArray)
    }, {})
    // [ A: [{term: 'a', definition: 'b'}, {term: 'c', definition: 'd'}], B: [{term: 'e', definition: 'f'}, {term: 'g', definition: 'h'}] ]

    const termsArrangedByLetter = []
    termsAndDefs.forEach(termAndDefinition => {
        let term = termAndDefinition[0]
        let definition = termAndDefinition[1]
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
                                        <span className="definition">{term.definition}</span>
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
    // default to page a 
    const defaultGlossaryPage = glossaryPages[0]
    const [currentGlossaryPage, setCurrentGlossaryPage] = useState(defaultGlossaryPage)
    const [currentLetter, setCurrentLetter] = useState(alphabetizedTerms[0])

    const handleLetterClick = letter => {
        setCurrentLetter(letter)
        setCurrentGlossaryPage(glossaryPages[alphabetizedTerms.indexOf(letter)])
    }

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

    const glossary = yaml.load(fs.readFileSync('glossary.yaml', 'utf-8'))

    return {
        props: {
            workshops: workshopFiles.sort(),
            guides: installFiles.sort(),
            insights: insightsFiles.sort(),
            glossary: glossary,
        },
    }
}
