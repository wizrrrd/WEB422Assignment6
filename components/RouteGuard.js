import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    try {
      console.log("[RouteGuard] Updating atoms...");
      const favs = await getFavourites();
      const history = await getHistory();
      setFavouritesList(favs);
      setSearchHistory(history);
    } catch (err) {
      console.error('[RouteGuard] Failed to update atoms:', err);
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      const isPublic = PUBLIC_PATHS.includes(router.pathname);

      if (!isAuthenticated() && !isPublic) {
        console.log('[RouteGuard] Not authenticated. Redirecting to /login');
        setAuthorized(false);
        router.push('/login');
      } else {
        if (isAuthenticated()) {
          await updateAtoms();
        }
        setAuthorized(true);
      }
    };

    checkAuth();

    router.events.on('routeChangeComplete', checkAuth);
    return () => {
      router.events.off('routeChangeComplete', checkAuth);
    };
  }, [router.pathname]);

  return authorized ? children : null;
}
