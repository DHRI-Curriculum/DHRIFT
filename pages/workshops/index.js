import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Container } from '@mui/material';
import Head from 'next/head';
import Header from '../../components/Header';
import WorkshopsView from '../../components/WorkshopsView';

export default function Workshops(props) {

    props.setWorkshopMode(false)
    const [gitUser, setGitUser] = useState(null);
    const [gitRepo, setGitRepo] = useState(null);
    const [workshopUser, setworkshopUser] = useState(null);
    const [workshopRepo, setworkshopRepo] = useState(null);
    const [builtURL, setBuiltURL] = useState(null);
    let headers;

    if (process.env.NEXT_PUBLIC_GITHUBSECRET !== 'false') {
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
        setworkshopUser(urlParams.get('wUser'));
        setworkshopRepo(urlParams.get('wGitRepo'));
        setBuiltURL(`https://api.github.com/repos/${gitUser}/${gitRepo}/contents/config.yml`)
    }, [gitUser, gitRepo])

    const { data: config, isLoading, error } = useSWR(gitUser ? builtURL : null, fetcher(headers),
        { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false })

    return (
        <>
            <Header title={'Workshops'} instUser={gitUser} instRepo={gitRepo}
                workshopsGitUser={workshopUser} workshopsGitRepo={workshopRepo}
            />
            <Container
                disableGutters={true}
                maxWidth={'xl'}
                sx={{
                    display: 'flex',
                    marginLeft: {
                        // md: '100px',
                    },

                }}
            >
                <Head>
                    <title>Workshops</title>
                </Head>
                <div className='inst-workshops'>
                    <h1>Workshops</h1>
                    {gitUser && gitRepo && workshopUser && workshopRepo &&
                        <WorkshopsView gitUser={workshopUser} gitRepo={workshopRepo} instUser={gitUser} instRepo={gitRepo} />
                    }
                </div>
            </Container>
        </>
    )
}