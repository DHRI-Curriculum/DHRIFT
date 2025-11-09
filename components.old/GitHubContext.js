import { createContext, useContext, useState, useEffect } from 'react';
import { getGitHubParamsFromURL, validateParams } from '../utils/github';
import { useRouter } from 'next/router';
import { GitHubStatus } from './GitHubStatus';

const PAGES_NEEDING_GITHUB = ['/inst', '/workshops', '/dynamic'];

export const GitHubContext = createContext();

export function GitHubProvider({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Start false to prevent flash
  const [validationStatus, setValidationStatus] = useState({
    isValid: true, // Start true to prevent flash
    messages: [],
    checks: []
  });

  useEffect(() => {
    const checkParams = async () => {
      if (!router.isReady) return;
      
      // Skip validation for pages that don't need it
      if (!PAGES_NEEDING_GITHUB.includes(router.pathname)) {
        return;
      }

      setLoading(true);
      const params = getGitHubParamsFromURL();
      const status = await validateParams(params);
      setValidationStatus(status);
      setLoading(false);
    };

    checkParams();
  }, [router.isReady, router.pathname]);

  // Only show validation UI on relevant pages
  const showValidation = PAGES_NEEDING_GITHUB.includes(router.pathname);

  return (
    <GitHubContext.Provider value={{ loading, validationStatus }}>
      {children}
      {showValidation && <GitHubStatus validationStatus={validationStatus} />}
    </GitHubContext.Provider>
  );
}

export const useGitHub = () => useContext(GitHubContext);