import { useAtom } from 'jotai';
import { favouritesAtom } from '../store'; 
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  
  if (!favouritesList) return null;

  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map(objectID => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <h4>Favourite</h4>
              <p>Nothing in the list yet.</p>
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
}
