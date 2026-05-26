import useSWR from "swr";
import { createGitHubFetcher } from "../../utils/github";

export default function useWorkshop(gitUser, gitFile, builtURL, editing) {
  const shouldFetch = Boolean(gitUser && gitFile && builtURL);
  const fetcher = createGitHubFetcher({ decodeBase64: true });

  const { data, error } = useSWR(
    shouldFetch ? builtURL : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 10000000000,
    }
  );

  if (error) {
    return { error };
  }

  return data;
}
