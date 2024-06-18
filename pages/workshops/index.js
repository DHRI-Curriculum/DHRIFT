import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Container } from '@mui/material';
import Head from 'next/head';
import Header from '../../components/Header';
import WorkshopsView from '../../components/WorkshopsView';

export default function Workshops(props) {
    props.setWorkshopMode(false)
    const [shouldFetch, setShouldFetch] = useState(false);
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
        setBuiltURL(`https://api.github.com/repos/${props.instGitUser}/${props.instGitRepo}/contents/config.yml`)
        if (props.instGitUser && props.instGitRepo) {
            setShouldFetch(true)
        }
    }, [props.instGitUser, props.instGitRepo])

    useEffect(() => {
        //     console.log(props.gitUser) && props.gitRepo && props.instGitUser && props.instGitRepo)
        // }, [props.gitUser, props.gitRepo, props.instGitUser, props.instGitRepo])
    }, [props.gitUser, props.gitRepo, props.instGitUser, props.instGitRepo])




    const { data: config, isLoading, error } = useSWR(shouldFetch ? builtURL : null, fetcher(headers),
        { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false })

    return (
        <>
            <Header title={'Workshops'} instUser={props.instGitUser} instRepo={props.instGitRepo}
                gitUser={props.gitUser} gitRepo={props.gitRepo}
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
                <div className='inst'>
                    <div className='inst-workshops'>
                        <h1>Workshops</h1>
                        {props.gitUser && props.gitRepo && props.instGitUser && props.instGitRepo &&
                            <WorkshopsView gitUser={props.gitUser} gitRepo={props.gitRepo} instUser={props.instGitUser} instRepo={props.instGitRepo} />
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}