import React, { useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import OneTrackView from '../../components/OneTrackView';
import Header from '../../components/Header';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import yaml from 'js-yaml';
import { createGitHubFetcher } from '../../utils/github';

const TracksView = dynamic(() => import('../../components/AllTracksView'), {
    suspense: true,
});

export default function Tracks(props) {
    const router = useRouter();
    const { t: selectedTrack } = router.query;
    const fetcher = createGitHubFetcher({ decodeBase64: true });
    const shouldFetchConfig = Boolean(props.instGitUser && props.instGitRepo && (!props.gitUser || !props.gitRepo));
    const configUrl = `https://api.github.com/repos/${props.instGitUser}/${props.instGitRepo}/contents/config.yml`;

    useEffect(() => {
        props.setWorkshopMode(false);
    }, [props.setWorkshopMode]);

    const { data: config } = useSWR(
        shouldFetchConfig ? configUrl : null,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false }
    );

    useEffect(() => {
        if (config && (!props.gitUser || !props.gitRepo)) {
            const parsedConfig = yaml.load(config);
            props.setGitUser(parsedConfig.workshopsuser);
            props.setGitRepo(parsedConfig.workshopsrepo);
        }
    }, [config, props.gitUser, props.gitRepo, props.setGitUser, props.setGitRepo]);

    return (
        <>
            <Header title={'Tracks'} instUser={props.instGitUser} instRepo={props.instGitRepo}
                gitUser={props.gitUser} gitRepo={props.gitRepo}
            />
            <Container className="tracks mui-container">
                <Suspense fallback={<div>Loading tracks...</div>}>
                    {selectedTrack ? (
                        <div>
                            <OneTrackView gitUser={props.gitUser} gitRepo={props.gitRepo} instUser={props.instGitUser} instRepo={props.instGitRepo} track={selectedTrack} />
                        </div>
                    ) : (
                        <div>
                            <h1>All Tracks</h1>

                            <TracksView gitUser={props.gitUser} gitRepo={props.gitRepo} instUser={props.instGitUser} instRepo={props.instGitRepo} />
                        </div>
                    )}
                </Suspense>
            </Container>
        </>
    );
}
