import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function FavouritesPage() {
  const [favourites, setFavourites] = useAtom(favouritesAtom);

  useEffect(() => {
    async function fetchFavourites() {
      try {
        const favs = await getFavourites();
        setFavourites(favs);
      } catch (err) {
        console.error('Failed to fetch favourites:', err);
      }
    }

    fetchFavourites();
  }, [setFavourites]);

  return (
    <div className="mt-4">
      <h1>Favourites</h1>
      {favourites.length === 0 ? (
        <p>No favourite items yet.</p>
      ) : (
        <Row className="gy-4">
          {favourites.map((id) => (
            <Col key={id} lg={3} md={4} sm={6}>
              <ArtworkCardDetail objectID={id} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
