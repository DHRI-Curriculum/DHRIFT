import { useEffect } from 'react';

export default function AuthComplete() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bc = new BroadcastChannel('auth');
    const message = '{"auth":"complete", "instUser": "' + urlParams.get('instUser') + '",' + '"instRepo": "' + urlParams.get('instRepo') + '",' + '"instCreated": "' + urlParams.get('instCreated') + '"}';
    bc.postMessage(message);
    window.close();
  }, []);

  return <div>Authentication complete. You can close this window.</div>;
}