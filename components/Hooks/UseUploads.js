import useSWRImmutable from "swr/immutable";
import { useState, useEffect } from "react";
import { createGitHubFetcher } from "../../utils/github";

export default function useUploads({ setAllUploads, gitUser, gitRepo, gitBranch = 'v2' }) {
    const [shouldFetch, setShouldFetch] = useState(false);

    // Construct uploads URL from git info
    const uploadsURL = gitUser && gitRepo
        ? `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/uploads?ref=${gitBranch}`
        : null;

    useEffect(() => {
        if (uploadsURL) {
            setShouldFetch(true);
        }
    }, [uploadsURL]);

    const fetcher = createGitHubFetcher({
        decodeBase64: false,
        onError: () => setShouldFetch(false)
    });

    const { data: uploads } = useSWRImmutable(
        shouldFetch ? uploadsURL : null,
        fetcher,
        { revalidateOnMount: true }
    );

    useEffect(() => {
        if (uploads && setAllUploads) {
            setAllUploads(uploads);
        }
    }, [uploads, setAllUploads]);

    return uploads;
}