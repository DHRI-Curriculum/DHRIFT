import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import { useState, useEffect } from "react";

export default function useWorkshop(gitUser, gitFile, builtURL, editing) {

  let headers;
  const [shouldFetch, setShouldFetch] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  
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
    }
  )

  useEffect(() => {
    if (gitUser && gitFile && !fetchError) {
      setShouldFetch(true)
    }
  }, [gitUser, gitFile])

  var errMessage = 'There has been an error fetching the workshop. Please try again later.'
  const { data, isLoading, error } = useSWR(shouldFetch ? builtURL : null, fetcher(headers),
    {
      onError(err) {
        console.log('workshop.url', builtURL)
        console.log('workshop.err', err)
        setFetchError(err)
        
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 10000000000,
    })

  return data ? data : errMessage

}
