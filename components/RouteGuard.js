import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register'];

export default function RouteGuard({ children }) {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const updateAtoms = async () => {
    const favouritesData = await getFavourites();
    const historyData = await getHistory();
    setFavourites(favouritesData);
    setSearchHistory(historyData);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !PUBLIC_PATHS.includes(router.pathname)) {
      router.push('/login');
    } else if (token) {
      updateAtoms();
    }
  }, [router]);

  return <>{children}</>;
}
