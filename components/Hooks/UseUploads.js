import useSWRImmutable from "swr/immutable";
import { useState, useEffect } from "react";
import { set } from "date-fns";

export default function useUploads({ setAllUploads, allUploads, gitUser, gitRepo, gitFile, uploadsURL, setUploadsURL, ...props }) {

    const [shouldFetch, setShouldFetch] = useState(false);

    let headers;
    let builtURL = uploadsURL;

    useEffect(() => {
        if (uploadsURL) {
            setShouldFetch(true)
        }
    }, [uploadsURL])

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


    const { data: uploads, error } = useSWRImmutable(shouldFetch
        ? builtURL : null, fetcher(headers),
        { revalidateOnMount: true })

    useEffect(() => {
        if (uploads) {
            setAllUploads(uploads)
        }
    }, [uploads])

    return uploads
}