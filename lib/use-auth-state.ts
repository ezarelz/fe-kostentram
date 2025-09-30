// lib/use-auth-state.ts
import { useEffect, useState } from 'react';
import { authStorage } from './auth-storage';

export function useAuthState(): boolean {
  const [authed, setAuthed] = useState<boolean>(!!authStorage.getToken());

  useEffect(() => {
    const update = () => setAuthed(!!authStorage.getToken());

    // perubahan lintas tab & dari app sendiri
    const onStorage = () => update();
    const onAuthChanged = () => update();
    const onVisible = () => {
      if (document.visibilityState === 'visible') update();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('auth:changed', onAuthChanged as EventListener);
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(
        'auth:changed',
        onAuthChanged as EventListener
      );
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return authed;
}
