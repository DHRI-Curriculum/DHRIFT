import React, { memo, use, useEffect, useState } from 'react'
import useSWR from 'swr'
import jsyaml from 'js-yaml'
import WorkshopsView from '../../components/WorkshopsView';
import Schedule from '../../components/Schedule';
import Container from '@mui/material/Container';


export default function Test() {

    const [gitUser, setGitUser] = useState(null);
    const [gitRepo, setGitRepo] = useState(null);
    const [builtURL, setBuiltURL] = useState(null);
    const [parsedYAML, setParsedYAML] = useState(null);
    const [sessions, setSessions] = useState(null);
    const [workshopsGitUser, setWorkshopsGitUser] = useState(null);
    const [workshopsGitRepo, setWorkshopsGitRepo] = useState(null);

    let headers;

    if (process.env.NEXT_PUBLIC_GITHUBSECRET === 'true') {
        headers = new Headers(
            {
                'Content-Type': 'application/json',
                'authorization': `token ${process.env.NEXT_PUBLIC_GITHUBSECRET}`
            });
    } else {
        headers = new Headers(
            {
                'Content-Type': 'application/json',
            });
    }

    const fetcher = (headers) => (...args) => fetch(...args, {
        headers: headers,
        method: 'GET',
    }).then(
        res => res.json()
    ).then(
        // decode from base64
        res => Buffer.from(res.content, 'base64').toString()
    )
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setGitUser(urlParams.get('user'));
        setGitRepo(urlParams.get('repo'));
        setBuiltURL(`https://api.github.com/repos/${gitUser}/${gitRepo}/contents/config.yml`)
    }, [gitUser, gitRepo])

    const { data: config, isLoading, error } = useSWR(gitUser ? builtURL : null, fetcher(headers),
        { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false })

    useEffect(() => {
        if (config) {
            setParsedYAML(jsyaml.load(config))
        }
    }, [config])

    useEffect(() => {
        if (parsedYAML) {
            setSessions(parsedYAML.sessions)
            setWorkshopsGitUser(parsedYAML.workshopsuser)
            setWorkshopsGitRepo(parsedYAML.workshopsrepo)
        }
    }, [parsedYAML])
    return (
        <Container
            disableGutters={true}
            maxWidth={'md'}
            sx={{
                display: 'flex',
                marginLeft: {
                    md: '100px',
                },

            }}
        >
            <div>
                <div className="frontmatter">
                    <div className='frontmatter-hero'>
                        <h1>{
                            parsedYAML && parsedYAML.event
                        }</h1>
                        <h2>{
                            parsedYAML && parsedYAML.datestart && parsedYAML.enddate && `${parsedYAML.datestart} - ${parsedYAML.enddate}`
                        }</h2>
                        <p>
                            {
                                parsedYAML && parsedYAML.venue
                            }
                        </p>
                        <p>{
                            parsedYAML && parsedYAML.registerlink &&
                            <a href={parsedYAML.registerlink}>Register</a>
                        }</p>
                    </div>
                    <div className=''>
                        <div>
                            <p>{
                                parsedYAML && parsedYAML.description
                            }</p>
                        </div>
                        <div className='schedule'>
                            {sessions &&
                                <Schedule schedule={sessions} />}
                        </div>
                        <h1>Workshops</h1>
                        <div className='workshops'>
                            {workshopsGitUser && workshopsGitRepo && parsedYAML &&
                                <WorkshopsView gitUser={workshopsGitUser} gitRepo={workshopsGitRepo} instUser={gitUser} instRepo={gitRepo} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}