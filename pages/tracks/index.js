import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import OneTrackView from '../../components/OneTrackView';
import Header from '../../components/Header';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';

const TracksView = dynamic(() => import('../../components/AllTracksView'), {
    suspense: true,
});

export default function Tracks(props) {
    const router = useRouter();
    const { t: selectedTrack } = router.query;

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