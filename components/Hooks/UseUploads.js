import useSWRImmutable from "swr/immutable";
import { useState, useEffect } from "react";

export default function useUploads({setAllUploads, gitUser, gitRepo, 
    gitFile, overrideURL}) {

    let headers;
    let builtURL = `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/uploads/${gitFile}`
    if (overrideURL) {
        builtURL = overrideURL;
    }

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

    const fetcher = (headers) => (...args) => fetch(...args, {
        headers: headers,
        method: 'GET',
    }).then(
        res => res.json()
    ).catch(
        err => console.log('err', err)
    )

    const { data: uploads, error } = useSWRImmutable(gitUser && gitRepo && gitFile
         ? builtURL : null, fetcher(headers),
        { revalidateOnMount: true })


    useEffect(() => {
        if (uploads) {
            setAllUploads(uploads)
        }
    }, [uploads])

    return uploads

}