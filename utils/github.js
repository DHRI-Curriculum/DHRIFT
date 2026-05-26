/**
 * Get GitHub API headers with optional authentication
 * @returns {Headers} Headers object for GitHub API requests
 */
export const getGitHubHeaders = () => {
  const headers = new Headers();
  if (process.env.NEXT_PUBLIC_GITHUBSECRET && process.env.NEXT_PUBLIC_GITHUBSECRET !== 'false') {
    headers.set('Authorization', `token ${process.env.NEXT_PUBLIC_GITHUBSECRET}`);
  }
  return headers;
};

const KNOWN_DHRI_WORKSHOP_FILES = [
  'DHRIFT_workshop-template.md',
  'README.md',
  'catch-our-dhrift.md',
  'command-line.md',
  'creating-simulations.md',
  'data-literacies.md',
  'git.md',
  'html-css.md',
  'intro_to_R.md',
  'javascript.md',
  'mapping-javascript.md',
  'mapping.md',
  'newest_python.md',
  'pandas.md',
  'python.md',
  'sql.md',
  'text-analysis.md',
];

const KNOWN_DHRI_UPLOAD_FILES = [
  '10_index.html',
  '10_poem.css',
  '10_poem.html',
  '10_poem.js',
  '10_script.js',
  '10_styles.css',
  '11_index.html',
  '11_map.js',
  '11_poem.css',
  '11_poem.html',
  '11_poem.js',
  '11_script.js',
  '11_styles.css',
  '12_index.html',
  '12_map.js',
  '12_nyc-data.css',
  '12_nyc-data.html',
  '12_nyc-data.js',
  '12_poem.css',
  '12_poem.html',
  '12_poem.js',
  '12_script.js',
  '12_styles.css',
  '8_index.html',
  '8_script.js',
  '8_styles.css',
  '9_index.html',
  '9_script.js',
  '9_styles.css',
  'aesop.txt',
  'index.html',
  'jupyter_notebooks_tutorial.ipynb',
  'mobydick.txt',
  'nycneighborhoods.js',
  'nycneighborhoods.json',
  'nypl_items.csv',
  'poem.json',
  'script.js',
];

export const buildRawGitHubUrl = ({ user, repo, branch = 'main', path = '' }) => {
  const cleanPath = path.replace(/^\/+/, '');
  return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${cleanPath}`;
};

export const githubApiContentUrlToRawUrl = (url) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'api.github.com') return null;
    const match = parsed.pathname.match(/^\/repos\/([^/]+)\/([^/]+)\/contents\/?(.*)$/);
    if (!match) return null;
    const [, user, repo, path] = match;
    if (!path) return null;
    return buildRawGitHubUrl({
      user,
      repo,
      branch: parsed.searchParams.get('ref') || 'main',
      path,
    });
  } catch {
    return null;
  }
};

export const getKnownWorkshopListing = ({ gitUser, gitRepo, branch = 'v2' }) => {
  if (gitUser !== 'dhri-curriculum' || gitRepo !== 'workshops') return null;
  return KNOWN_DHRI_WORKSHOP_FILES.map((name) => ({
    name,
    path: name,
    type: 'file',
    url: `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/${name}?ref=${branch}`,
    download_url: buildRawGitHubUrl({ user: gitUser, repo: gitRepo, branch, path: name }),
  }));
};

export const getKnownUploadListing = ({ gitUser, gitRepo, branch = 'v2' }) => {
  if (gitUser !== 'dhri-curriculum' || gitRepo !== 'workshops') return null;
  return KNOWN_DHRI_UPLOAD_FILES.map((name) => ({
    name,
    path: `uploads/${name}`,
    type: 'file',
    url: `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/uploads/${name}?ref=${branch}`,
    download_url: buildRawGitHubUrl({ user: gitUser, repo: gitRepo, branch, path: `uploads/${name}` }),
  }));
};

export const normalizeKnownAssetUrl = (src) => {
  if (src === 'https://docs.github.com/assets/cb-113970/images/help/pages/branch-publishing-selection.png') {
    return 'https://docs.github.com/assets/images/help/pages/publishing-source-drop-down.png';
  }
  return src;
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

  return async (...args) => {
    try {
      const rawUrl = decodeBase64 && typeof args[0] === 'string'
        ? githubApiContentUrlToRawUrl(args[0])
        : null;

      if (rawUrl) {
        const rawResponse = await fetch(rawUrl, { method: 'GET' });
        if (rawResponse.ok) {
          return rawResponse.text();
        }
      }

      const res = await fetch(...args, {
        headers,
        method: 'GET',
      });
      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const body = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        const message = isJson && body?.message ? body.message : res.statusText;
        throw new Error(`GitHub request failed (${res.status}): ${message}`);
      }

      if (!isJson) {
        return body;
      }

      if (body?.message && !body.content) {
        throw new Error(body.message);
      }

      if (decodeBase64 && body.content) {
        return Buffer.from(body.content, 'base64').toString();
      }

      return body;
    } catch (err) {
      if (onError) onError(err);
      throw err;
    }
  };
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
