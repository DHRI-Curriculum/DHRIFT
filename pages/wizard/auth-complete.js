import { da } from 'date-fns/locale';
import { useEffect } from 'react';

export default function AuthComplete() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bc = new BroadcastChannel('auth');
    localStorage.setItem('githubToken', urlParams.get('token'));
    localStorage.setItem('githubTokenExpiry', dateFns.addDays(new Date(), 1).getTime());
    const message = '{"auth":"complete"}';
    bc.postMessage(message);
    window.close();
  }, []);

  return <div>Authentication complete. You can close this window.</div>;
}