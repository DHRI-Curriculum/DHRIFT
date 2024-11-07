import React from 'react';
import TracksView from '../../components/AllTracksView';
import OneTrackView from '../../components/OneTrackView';
import Header from '../../components/Header';
import { Container } from '@mui/material'

export default function Tracks(props) {

    return (
        <>
                <Header title={'Glossary'} instUser={props.instGitUser} instRepo={props.instGitRepo}
            gitUser={props.gitUser} gitRepo={props.gitRepo}
          />
          <Container className="tracks mui-container">
        {props.query?.get('t') ? (
            <div>
                <OneTrackView gitUser={props.gitUser} gitRepo={props.gitRepo} instUser={props.instGitUser} instRepo={props.instGitRepo} track={props.query.get('t')}
                 />
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