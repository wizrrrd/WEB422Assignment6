import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function FavouritesPage() {
  const [favourites] = useAtom(favouritesAtom);

  if (!favourites) return null; 

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
