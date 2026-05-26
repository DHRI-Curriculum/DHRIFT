import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { createGitHubFetcher, getKnownWorkshopListing } from '../../utils/github';

export default function useAllWorkshops({ gitUser, gitRepo }) {
    const [workshops, setWorkshops] = useState([]);
    const [totalWorkshops, setTotalWorkshops] = useState(0);

    const fetcher = createGitHubFetcher({ decodeBase64: false });
    const workshopsBuiltURL = `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/`;
    const knownWorkshops = useMemo(
        () => getKnownWorkshopListing({ gitUser, gitRepo }),
        [gitUser, gitRepo]
    );

    const { data: allWorkshops } = useSWR(
        gitUser && !knownWorkshops ? workshopsBuiltURL : null,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false }
    );

    useEffect(() => {
        const sourceWorkshops = knownWorkshops || allWorkshops;
        if (Array.isArray(sourceWorkshops)) {
            // Remove workshops that start with 'DHRIFT_'
            const filteredWorkshops = sourceWorkshops.filter(item => !item.name.startsWith('DHRIFT_') && item.name !== 'README.md');
            setWorkshops(filteredWorkshops);
            setTotalWorkshops(filteredWorkshops.length);
        }
    }, [allWorkshops, knownWorkshops]);

    const toLoop = Array(totalWorkshops).fill().map((_, i) => i);

    return { workshops, toLoop };
}
