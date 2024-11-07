import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import yaml from 'js-yaml';

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

    console.log(tracks);
    return (
        <div className='tracks-grid'>
            {Array.isArray(tracks.tracks) && tracks.tracks.map(track => (
                <div key={track.short_name} className='track'>
                    <h2>{track.name}</h2>
                    <p>{track.description}</p>
                    <Link href={`/tracks?t=${track.short_name}&user=${gitUser}&repo=${gitRepo}&instUser=${gitUser}&instRepo=${gitRepo}`}>
                        View {track.name} Workshops
                    </Link>
                </div>
            ))}
        </div>
    );
}
