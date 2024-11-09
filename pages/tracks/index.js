import React, { useEffect, useState } from 'react';
import TracksView from '../../components/AllTracksView';
import OneTrackView from '../../components/OneTrackView';
import Header from '../../components/Header';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';

export default function Tracks(props) {
    const router = useRouter();
    const [selectedTrack, setSelectedTrack] = useState(null);

    useEffect(() => {
        const track = router.query.t;
        setSelectedTrack(track);
    }, [router.query.t]);

    console.log('props', props)

    return (
        <>
            <Header title={'Tracks'} instUser={props.instGitUser} instRepo={props.instGitRepo}
                gitUser={props.gitUser} gitRepo={props.gitRepo}
            />
            <Container className="tracks mui-container">
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
            </Container>
        </>
    );
}