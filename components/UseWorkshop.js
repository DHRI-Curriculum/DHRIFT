import useSWRImmutable from "swr/immutable";
import { useSWRConfig } from "swr";
import { useState, useEffect } from "react";

export default function useWorkshop(gitUser, builtURL, editing) {

  let headers;


  const [cacheCleared, setCacheCleared] = useState(false);
  // const { mutate } = useSWRConfig()
  // const clearCache = () => mutate(
  //   () => true,
  //   undefined,
  //   { revalidate: false }
  // )
  // if (editing == 'true' && cacheCleared == false) {
  //   clearCache()
  //   setCacheCleared(true)
  // }
  useEffect(() => {
    if (editing == 'true' && cacheCleared == false) {
      localStorage.removeItem('app-cache');
      localStorage.removeItem('app-cache-time');
      setCacheCleared(true)
      console.log('cache cleared')
    }
  }, [editing])


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
  ).then(
    // decode from base64
    res => Buffer.from(res.content, 'base64').toString()
  )

  const { data, isLoading, error } = useSWRImmutable(gitUser != null ? builtURL : null, fetcher(headers),
    {
      onSuccess(data) {
        // const matterResult = matter(data)
        // setCurrentFile(matterResult)
        // setContent(matterResult.content)
        // setLanguage(matterResult.data.programming_language);
        // setWorkshopTitle(matterResult.data.title);
      },
      onFailure(err) {
        console.log('err', err)
        console.log('workshop.url', builtURL)
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,

    })

  return data

}