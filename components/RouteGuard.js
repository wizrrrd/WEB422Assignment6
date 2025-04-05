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
      const favs = await getFavourites();
      const history = await getHistory();
      setFavouritesList(favs);
      setSearchHistory(history);
    } catch (err) {
      console.error('Failed to update atoms:', err);
    }
  }

  function authCheck(url) {
    const path = url.split('?')[0];
    const isPublic = PUBLIC_PATHS.includes(path);

    if (!isAuthenticated() && !isPublic) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      authCheck(router.asPath);
      if (isAuthenticated()) {
        updateAtoms(); 
      }
    }, 100); 

    router.events.on('routeChangeComplete', authCheck);
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  return authorized ? children : null;
}
