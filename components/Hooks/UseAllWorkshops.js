import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { createGitHubFetcher } from '../../utils/github';

export default function useAllWorkshops({ gitUser, gitRepo }) {
    const [workshops, setWorkshops] = useState([]);
    const [totalWorkshops, setTotalWorkshops] = useState(0);

    const fetcher = createGitHubFetcher({ decodeBase64: false });
    const workshopsBuiltURL = `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/`;

    const { data: allWorkshops } = useSWR(
        gitUser ? workshopsBuiltURL : null,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false }
    );

    useEffect(() => {
        if (allWorkshops) {
            // Remove workshops that start with 'DHRIFT_'
            const filteredWorkshops = allWorkshops.filter(item => !item.name.startsWith('DHRIFT_'));
            setWorkshops(filteredWorkshops);
            setTotalWorkshops(allWorkshops.length);
        }
    }, [allWorkshops]);

    const toLoop = Array(totalWorkshops).fill().map((_, i) => i);

    return { workshops, toLoop };
}