import { createContext, useContext, useState, useEffect } from 'react';
import { getGitHubParamsFromURL, validateParams } from '../utils/github';
import { useRouter } from 'next/router';
import { GitHubStatus } from './GitHubStatus';

export const GitHubContext = createContext();

export function GitHubProvider({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [validationStatus, setValidationStatus] = useState({
    isValid: false,
    messages: [],
    checks: []
  });

  useEffect(() => {
    const checkParams = async () => {
      if (!router.isReady) return;
      
      setLoading(true);
      try {
        const params = getGitHubParamsFromURL();
        const status = await validateParams(params);
        setValidationStatus(status);
      } catch (error) {
        setValidationStatus({
          isValid: false,
          messages: [`Validation error: ${error.message}`],
          checks: []
        });
      } finally {
        setLoading(false);
      }
    };

    checkParams();
    
    // Cleanup
    return () => {
      setValidationStatus({
        isValid: false,
        messages: [],
        checks: []
      });
    };
  }, [router.isReady, router.query]);

  const value = {
    loading,
    validationStatus,
    setValidationStatus
  };

  return (
    <GitHubContext.Provider value={value}>
      {loading ? (
        <div>Validating GitHub parameters...</div>
      ) : (
        <>
          <GitHubStatus validationStatus={validationStatus} />
          {children}
        </>
      )}
    </GitHubContext.Provider>
  );
}

export const useGitHub = () => useContext(GitHubContext);