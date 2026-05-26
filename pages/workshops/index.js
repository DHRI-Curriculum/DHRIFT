import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Container } from '@mui/material';
import Head from 'next/head';
import Header from '../../components/Header';
import WorkshopsView from '../../components/WorkshopsView';
import jsyaml from 'js-yaml';
import { createGitHubFetcher } from '../../utils/github';

export default function Workshops(props) {
    const [shouldFetch, setShouldFetch] = useState(false);
    const [builtURL, setBuiltURL] = useState(null);
    const fetcher = createGitHubFetcher({ decodeBase64: true });

    useEffect(() => {
        props.setWorkshopMode(false)
    }, [props.setWorkshopMode])

    useEffect(() => {
        setBuiltURL(`https://api.github.com/repos/${props.instGitUser}/${props.instGitRepo}/contents/config.yml`)
        if (props.instGitUser && props.instGitRepo) {
            setShouldFetch(true)
        }
    }, [props.instGitUser, props.instGitRepo])

    // useEffect(() => {
    //     //     console.log(props.gitUser) && props.gitRepo && props.instGitUser && props.instGitRepo)
    //     // }, [props.gitUser, props.gitRepo, props.instGitUser, props.instGitRepo])
    // }, [props.gitUser, props.gitRepo, props.instGitUser, props.instGitRepo])




    const { data: config } = useSWR(shouldFetch ? builtURL : null, fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false })

    useEffect(() => {
        if (config && (!props.gitUser || !props.gitRepo)) {
            const parsedConfig = jsyaml.load(config);
            props.setGitUser(parsedConfig.workshopsuser);
            props.setGitRepo(parsedConfig.workshopsrepo);
        }
    }, [config, props.gitUser, props.gitRepo, props.setGitUser, props.setGitRepo])

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
