import useSWR from "swr";
import { useState, useEffect } from "react";
import { createGitHubFetcher } from "../../utils/github";

export default function useWorkshop(gitUser, gitFile, builtURL, editing) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const fetcher = createGitHubFetcher({
    decodeBase64: true,
    onError: () => setShouldFetch(false)
  });

  useEffect(() => {
    if (gitUser && gitFile && !fetchError) {
      setShouldFetch(true);
    }
  }, [gitUser, gitFile, fetchError]);

  const { data } = useSWR(
    shouldFetch ? builtURL : null,
    fetcher,
    {
      onError() {
        setShouldFetch(false);
        setFetchError(true);
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 10000000000,
    }
  );

  return data;
}
