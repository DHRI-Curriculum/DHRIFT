import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import yaml from 'js-yaml';
import { Card, CardActionArea, CardContent, Typography, Grid, CardMedia } from '@mui/material';

const fetcher = (...args) => fetch(...args).then(res => res.text());

export default function AllTracksView({ gitUser, gitRepo }) {
    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {
        if (gitUser && gitRepo) {
            setShouldFetch(true);
        }
    }, [gitUser, gitRepo]);

    const { data, error } = useSWR(shouldFetch ? `https://raw.githubusercontent.com/${gitUser}/${gitRepo}/main/tracks.yaml` : null, fetcher);

    if (error) return <div>Failed to load tracks</div>;
    if (!data) return <div>Loading...</div>;

    const tracks = yaml.load(data);

    return (
        <Grid container spacing={3} className='tracks-grid'>
            {Array.isArray(tracks.tracks) && tracks.tracks.map(track => {
                const imageBuiltURL = `https://raw.githubusercontent.com/${gitUser}/${gitRepo}/main/${track.coverimage}`;
                const randomNumberBetween1and7 = Math.floor(Math.random() * 7) + 1;
                var coverimage = track.coverimage;
                if (!track.coverimage) {
                    {
                        track.coverimage = "/images/img" + randomNumberBetween1and7 + ".jpg";
                    }
                }
                return (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={track.short_name}>
                        <Card className='track-card' variant="outlined">
                            <CardActionArea href={`/tracks?t=${track.short_name}&user=${gitUser}&repo=${gitRepo}&instUser=${gitUser}&instRepo=${gitRepo}`}>
                                <div className='stylized-image-container'>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={`https://raw.githubusercontent.com/${gitUser}/${gitRepo}/main/${track.coverimage}`}
                                        alt={track.name}
                                    />
                                </div>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {track.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {track.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    );
}
