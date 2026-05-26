import { useEffect } from 'react';

export default function AuthComplete() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const bc = new BroadcastChannel('auth');
    if (token) {
      localStorage.setItem('githubToken', token);
      localStorage.setItem('githubTokenExpiry', Date.now() + 1000 * 60 * 60 * 24 * 2);
    }
    const message = token ? '{"auth":"complete"}' : '{"auth":"missing-token"}';
    bc.postMessage(message);
    if (window.opener && !window.opener.closed) {
      window.close();
    }
    return () => bc.close();
  }, []);

  return <div>Authentication complete. You can close this window.</div>;
}
