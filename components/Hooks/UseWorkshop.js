import useSWR from "swr";
import { useState, useEffect } from "react";

export default function useWorkshop(gitUser, gitFile, builtURL, editing) {

  let headers;
  const [shouldFetch, setShouldFetch] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  
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
  ).then(
    // decode from base64
    res => Buffer.from(res.content, 'base64').toString()
  ).catch(
    err => {
      console.log('err', err)
      console.log('workshop.url', builtURL)
      setShouldFetch(false)
    }
  )

  useEffect(() => {
    if (gitUser && gitFile && !fetchError) {
      setShouldFetch(true)
    }
  }, [gitUser, gitFile])

  const { data, isLoading, error } = useSWR(shouldFetch ? builtURL : null, fetcher(headers),
    {
      onError(err) {
        console.log('workshop.url', builtURL)
        console.log('workshop.err', err)
        setShouldFetch(false)
        setFetchError(true)
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 10000000000,
    })

  return data

}
