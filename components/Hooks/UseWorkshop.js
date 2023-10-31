import useSWRImmutable from "swr/immutable";
import { useSWRConfig } from "swr";
import { useState, useEffect } from "react";
import { GitHub } from "@mui/icons-material";

export default function useWorkshop(gitUser, gitFile, builtURL, editing) {

  let headers;
  const [shouldFetch, setShouldFetch] = useState(false);
  const [cacheCleared, setCacheCleared] = useState(false);
  const { cache, mutate } = useSWRConfig()
  const clearCache = () => {
    cache.clear()
  }

  useEffect(() => {
    if (editing == 'true' && cacheCleared == false) {
      localStorage.removeItem('app-cache');
      localStorage.removeItem('app-cache-time');
      clearCache()
      setCacheCleared(true)
      console.log('cache cleared')
    }
  }, [editing])

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
  )

  useEffect(() => {
    if(gitUser && gitFile) {
      setShouldFetch(true)
    }
  }, [gitUser, gitFile])

  const { data, isLoading, error } = useSWRImmutable(shouldFetch ? builtURL : null, fetcher(headers),
    {
      onError(err) {
        console.log('workshop.url', builtURL)
        // get the cached version of the data

      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,

    })

  return data

}
