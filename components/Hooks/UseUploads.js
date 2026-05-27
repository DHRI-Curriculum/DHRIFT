import useSWRImmutable from "swr/immutable";
import { useMemo, useState, useEffect } from "react";
import { ALIGNED_WORKSHOP_BRANCH, createGitHubFetcher, getKnownUploadListing } from "../../utils/github";

export default function useUploads({ setAllUploads, gitUser, gitRepo, gitBranch }) {
    const [shouldFetch, setShouldFetch] = useState(false);

    // Construct uploads URL from git info
    const refParam = gitBranch ? `?ref=${gitBranch}` : '';
    const uploadsURL = gitUser && gitRepo
        ? `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/uploads${refParam}`
        : null;
    const knownUploads = useMemo(
        () => getKnownUploadListing({ gitUser, gitRepo, branch: gitBranch || ALIGNED_WORKSHOP_BRANCH }),
        [gitUser, gitRepo, gitBranch]
    );

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
        shouldFetch && !knownUploads ? uploadsURL : null,
        fetcher,
        { revalidateOnMount: true }
    );

    useEffect(() => {
        const sourceUploads = knownUploads || uploads;
        if (Array.isArray(sourceUploads) && setAllUploads) {
            setAllUploads(sourceUploads);
        }
    }, [uploads, knownUploads, setAllUploads]);

    return knownUploads || uploads;
}
