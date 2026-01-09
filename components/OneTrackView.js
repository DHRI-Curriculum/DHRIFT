import React, { useEffect, useState } from 'react';
import UseWorkshopsCard from './Hooks/UseWorkshopsCard';
import useAllWorkshops from './Hooks/UseAllWorkshops';
import useSWR from 'swr';
import yaml from 'js-yaml';

const fetcher = (...args) => fetch(...args).then(res => res.text());

export default function OneTrackView({ gitUser, gitRepo, instUser, instRepo, track }) {
    const [shouldFetch, setShouldFetch] = useState(false);

    const { workshops } = useAllWorkshops({ gitUser, gitRepo, instUser, instRepo });
    useEffect(() => {
        if (gitUser && gitRepo) {
            setShouldFetch(true);
        }
    }, [gitUser, gitRepo]);

    const { data, error } = useSWR(shouldFetch ? `https://raw.githubusercontent.com/${gitUser}/${gitRepo}/main/tracks.yaml` : null, fetcher);

    if (error) return <div>Failed to load track</div>;
    if (!data) return <div>Loading...</div>;

    const tracks = yaml.load(data);
    const trackData = tracks.tracks.find(t => t.short_name === track);

    const trackWorkshops = workshops.filter(workshop => trackData.workshops.includes(workshop.name.replace('.md', '')));
    const reverseTrackWorkshops = trackWorkshops.reverse();

    return (
        <div>
            <h1>{trackData.name} Track</h1>
            <p>{trackData.description}</p>
        <div
        className='workshop-grid'>
            {reverseTrackWorkshops.map((workshop) => (
                <UseWorkshopsCard
                    workshop={workshop}
                    gitUser={gitUser}
                    gitRepo={gitRepo}
                    instRepo={instRepo}
                    instUser={instUser}
                    key={`workshop-${workshop.name}`}
                />
            ))}
        </div>
    </div>
    );
}