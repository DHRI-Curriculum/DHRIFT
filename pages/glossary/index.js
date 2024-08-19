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
import Header from '../../components/Header';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const GlossaryHeader = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const LetterSelector = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const GlossaryContent = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const Term = styled(Typography)({
    fontWeight: 'bold',
});

const Definition = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));


export default function Glossary({ glossary, ...props }) {


    const [currentTerm, setCurrentTerm] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
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
            <Paper >
                <Typography variant="h5" component="h2">{letter}</Typography>
                {terms.map(term => {
                    return (
                        <Accordion key={term.term}>
                            <AccordionSummary>
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <Box flexGrow={1}>
                                        <Term variant="body1">{term.term}</Term>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <Box flexGrow={1}>
                                        <Definition variant="body2" dangerouslySetInnerHTML={{ __html: term.definition }} />
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </Paper>
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



    return isClient ? (
        <>
            <Header title={'Glossary'} instUser={props.instGitUser} instRepo={props.instGitRepo} gitUser={props.gitUser} gitRepo={props.gitRepo} />
            <Container
            className='glossary'
            >
                <GlossaryHeader variant="h3" component="h1">Glossary</GlossaryHeader>
                <LetterSelector>
                    {letterSelector}
                </LetterSelector>
                <GlossaryContent container spacing={3}>
                    <Grid item xs={12}>
                        {currentGlossaryPage}
                    </Grid>
                </GlossaryContent>
            </Container>
        </>
    ) : null;
}



export async function getStaticProps() {
    // Get files from the workshops dir


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
            glossary: glossary,
        },
    }
}
