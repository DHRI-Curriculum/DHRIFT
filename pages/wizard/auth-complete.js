import { da } from 'date-fns/locale';
import { useEffect } from 'react';

export default function AuthComplete() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bc = new BroadcastChannel('auth');
    localStorage.setItem('githubToken', urlParams.get('token'));
    localStorage.setItem('githubTokenExpiry', Date.now() + 1000 * 60 * 60 * 24 * 2);
    const message = '{"auth":"complete"}';
    bc.postMessage(message);
    window.close();
  }, []);

  return <div>Authentication complete. You can close this window.</div>;
}