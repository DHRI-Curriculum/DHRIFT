import { useEffect } from 'react';

export default function AuthComplete() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bc = new BroadcastChannel('auth');
    const message = '{"auth":"complete"}';
    bc.postMessage(message);
    window.close();
  }, []);

  return <div>Authentication complete. You can close this window.</div>;
}