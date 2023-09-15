import React, { memo, use, useEffect, useState } from 'react'
import useSWR from 'swr'
import UseWorkshopsComponent from '../components/UseWorkshopsComponent';


export default function Test() {

    const [gitUser, setGitUser] = useState(null);
    const [gitRepo, setGitRepo] = useState(null);
    const [workshops, setWorkshops] = useState([]);
    const [totalWorkshops, setTotalWorkshops] = useState(0);

    let workshopsBuiltURL, headers;
    if (process.env.NEXT_PUBLIC_GITHUBSECRET === 'true') {
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
        const urlParams = new URLSearchParams(window.location.search);
        setGitUser(urlParams.get('user'));
        setGitRepo(urlParams.get('repo'));
    }, [gitUser, gitRepo])

    useEffect(() => {
        if (allWorkshops) {
            setWorkshops(allWorkshops);
        }
    }
        , [allWorkshops])


    useEffect(() => {
        if (allWorkshops) {
            setTotalWorkshops(allWorkshops.length);
        }
    }, [totalWorkshops, allWorkshops])
    const toLoop = Array(totalWorkshops)
        .fill()
        .map((v, i) => i);

    if (!gitUser || !gitRepo) {
        return (
            <div className='home'>
                <div className='home-header'>
                    <div className='home-header-left'>
                        <h1>Workshop</h1>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='home'>
            <div className='home-header'>
                <div className='home-header-left'>
                    {toLoop.map(v => 
                        {
                            if (workshops[v] && workshops[v].type != 'dir') {
                                return (
                                    <div key={v}>
                                        <UseWorkshopsComponent workshop={workshops[v]} />
                                    </div>
                                )
                            }
                        }
                    )}
                </div>
            </div>
        </div>
    )
}