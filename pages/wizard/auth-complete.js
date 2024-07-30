import { useEffect } from 'react';

export default function AuthComplete() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bc = new BroadcastChannel('auth');
    localStorage.setItem('githubToken', urlParams.get('token'));
    const message = '{"auth":"complete"}';
    bc.postMessage(message);
    window.close();
  }, []);

  return <div>Authentication complete. You can close this window.</div>;
}