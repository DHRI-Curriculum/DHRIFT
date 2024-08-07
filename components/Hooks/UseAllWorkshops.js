import React, { memo, use, useEffect, useState } from 'react'
import useSWR from 'swr'


export default function useAllWorkshops({ gitUser, gitRepo, instUser, instRepo }) {

    const [workshops, setWorkshops] = useState([]);
    const [totalWorkshops, setTotalWorkshops] = useState(0);

    let workshopsBuiltURL, headers;
    if (process.env.NEXT_PUBLIC_GITHUBSECRET !== 'false') {
        headers = new Headers(
            {
                'Content-Type': 'application/json',
                'authorization': `token ${process.env.NEXT_PUBLIC_GITHUBSECRET}`
            });
    } else {
        headers = new Headers(
            {
                'Content-Type': 'application/json',
            });
    }
    const allFetcher = (headers) => (...args) => fetch(...args, {
        headers: headers,
        method: 'GET',
    }).then(
        res => res.json()
    ).catch(
        err => console.log('err', err)
    )

    workshopsBuiltURL = `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/`
    const { data: allWorkshops, isLoading, error } = useSWR(gitUser ? workshopsBuiltURL : null, allFetcher(headers),
        { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false })

    useEffect(() => {
        if (allWorkshops) {
            // remove workshop from array if it starts with 'DHRIFT_'
            const filteredWorkshops = allWorkshops.filter(item => !item.name.startsWith('DHRIFT_'));
            setWorkshops(filteredWorkshops);
        }
    }, [allWorkshops])

    useEffect(() => {
        if (allWorkshops) {
            setTotalWorkshops(allWorkshops.length);
        }
    }, [totalWorkshops, allWorkshops])

    const toLoop = Array(totalWorkshops)
        .fill()
        .map((v, i) => i);

    return {workshops, toLoop}
}