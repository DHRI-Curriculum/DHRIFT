/**
 * Get GitHub API headers with optional authentication
 * @returns {Headers} Headers object for GitHub API requests
 */
export const getGitHubHeaders = () => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (process.env.NEXT_PUBLIC_GITHUBSECRET && process.env.NEXT_PUBLIC_GITHUBSECRET !== 'false') {
    headers.set('Authorization', `token ${process.env.NEXT_PUBLIC_GITHUBSECRET}`);
  }
  return headers;
};

/**
 * Create a fetcher function for SWR that handles GitHub API responses
 * @param {Object} options - Fetcher options
 * @param {boolean} options.decodeBase64 - Whether to decode base64 content (default: true)
 * @param {Function} options.onError - Error callback
 * @returns {Function} Fetcher function for SWR
 */
export const createGitHubFetcher = (options = {}) => {
  const { decodeBase64 = true, onError } = options;
  const headers = getGitHubHeaders();

  return (...args) => fetch(...args, {
    headers,
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => {
      if (decodeBase64 && res.content) {
        return Buffer.from(res.content, 'base64').toString();
      }
      return res;
    })
    .catch(err => {
      if (onError) onError(err);
      throw err;
    });
};

const checkGitHubResource = async (user, repo) => {
  try {
    const apiURL = `https://api.github.com/repos/${user}/${repo}`;
    const headers = getGitHubHeaders();

    const response = await fetch(apiURL, {
      method: 'GET',
      headers
    });

    const data = await response.json();

    return { 
      exists: response.status === 200,
      status: response.status,
      message: response.status === 404 
        ? `Repository '${repo}' not found under user '${user}'`
        : response.status === 200 
          ? 'Repository found' 
          : response.status === 403
            ? 'Rate limit exceeded - please wait or use authenticated requests'
            : 'GitHub API error',
      type: response.status === 404 ? 'not_found' 
          : response.status === 200 ? 'success' 
          : response.status === 403 ? 'rate_limit'
          : 'api_error',
      details: data
    };
  } catch (error) {
    console.error('GitHub check error:', error);
    return {
      exists: false, 
      status: 500,
      message: `Error checking repository: ${error.message}`,
      type: 'error',
      details: null
    };
  }
};

// Add validation without breaking existing flow
const validateParams = async (params) => {
  const status = {
    isValid: true,
    messages: [],
    checks: []
  };

  try {
    if (params.gitUser && params.gitRepo) {
      const check = await checkGitHubResource(params.gitUser, params.gitRepo);
      status.checks.push(check);
      if (!check.exists) {
        status.messages.push(check.message);
        status.isValid = false;
      }
    }
    
    if (params.instUser && params.instRepo) {
      const check = await checkGitHubResource(params.instUser, params.instRepo);
      status.checks.push(check);
      if (!check.exists) {
        status.messages.push(check.message);
        status.isValid = false;
      }
    }
  } catch (error) {
    console.error('Validation error:', error);
    status.isValid = false;
    status.messages.push(error.message);
  }

  return status;
};

export const validateGitHubParams = async (params) => {
  const {gitUser, gitRepo, instUser, instRepo} = params;
  const status = {
    isValid: false,
    messages: [],
    checks: []
  };

  if (gitUser && gitRepo) {
    const check = await checkGitHubResource(gitUser, gitRepo);
    status.checks.push({
      type: 'primary',
      user: gitUser,
      repo: gitRepo,
      ...check
    });
  }

  if (instUser && instRepo) {
    const check = await checkGitHubResource(instUser, instRepo);
    status.checks.push({
      type: 'instructor',
      user: instUser,
      repo: instRepo,
      ...check
    });
  }

  status.messages = status.checks
    .filter(check => !check.exists)
    .map(check => check.message);
    
  status.isValid = status.checks.every(check => check.exists);

  return status;
};

export const buildGitHubURL = async (params) => {
  const validation = await validateGitHubParams(params);
  if (!validation.isValid) {
    throw new Error(validation.messages.join(', '));
  }
  const {gitUser, gitRepo, path = ''} = params;
  return `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/${path}`;
};

export const getGitHubParamsFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  const urlParams = {
    gitUser: params.get('user') || params.get('gitUser'),
    gitRepo: params.get('repo') || params.get('gitRepo'), 
    instUser: params.get('instUser'),
    instRepo: params.get('instRepo'),
    source: 'url',
    timestamp: Date.now()
  };

  return urlParams;
};

export { checkGitHubResource, validateParams };