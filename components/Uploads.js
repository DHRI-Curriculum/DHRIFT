import useSWRImmutable from "swr/immutable";
import { useState, useEffect } from "react";

export default function useUploads(allUploads, setAllUploads, gitUser, gitRepo) {

    let headers;
    const builtURL = `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/uploads`

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

    const fetcher = (headers) => (...args) => fetch(...args, {
        headers: headers,
        method: 'GET',
    }).then(
        res => res.json()
    ).catch(
        err => console.log('err', err)
    )

    const { data: uploads, error } = useSWRImmutable(gitUser ? builtURL : null, fetcher(headers),
        { revalidateOnMount: true })


    useEffect(() => {
        if (uploads) {
            setAllUploads(uploads)
        }
    }, [uploads])

    return { uploads, error }

}