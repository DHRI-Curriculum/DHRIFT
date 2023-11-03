import useSWRImmutable from "swr/immutable";
import { useState, useEffect } from "react";
import { GitHub } from "@mui/icons-material";

export default function useWorkshop(gitUser, gitFile, builtURL, editing) {

  let headers;
  const [shouldFetch, setShouldFetch] = useState(false);
  
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
    if (gitUser && gitFile) {
      setShouldFetch(true)
    }
  }, [gitUser, gitFile])

  const { data, isLoading, error } = useSWRImmutable(shouldFetch ? builtURL : null, fetcher(headers),
    {
      onError(err) {
        console.log('workshop.url', builtURL)
        console.log('workshop.err', err)
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
