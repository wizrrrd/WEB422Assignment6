import useSWR from 'swr';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData'; // Importing the add/remove functions from userdata.js

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favourites?.includes(objectID));
  }, [favourites]);

  if (error) return <div>Error loading artwork.</div>;
  if (!data) return <div>Loading...</div>;

  const toggleFavourite = async () => {
    if (showAdded) {
      // Remove favourites
      const updatedFavourites = await removeFromFavourites(objectID);
      setFavourites(updatedFavourites);
    } else {
      // Add favourites
      const updatedFavourites = await addToFavourites(objectID);
      setFavourites(updatedFavourites);
    }
  };

  return (
    <Card className="shadow-lg">
      <Image
        src={data.primaryImage || '/placeholder.png'}
        alt={data.title || 'Artwork'}
        width={500}
        height={500}
        className="card-img-top"
      />
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Artist:</strong> {data.artistDisplayName || 'N/A'} <br />
          <strong>Date:</strong> {data.objectDate || 'N/A'} <br />
          <strong>Medium:</strong> {data.medium || 'N/A'} <br />
          <strong>Dimensions:</strong> {data.dimensions || 'N/A'} <br />
          <strong>Credit Line:</strong> {data.creditLine || 'N/A'}
        </Card.Text>
        {data.artistWikidata_URL && (
          <a
            href={data.artistWikidata_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about the artist
          </a>
        )}
        <br />
        <Button variant={showAdded ? 'danger' : 'success'} onClick={toggleFavourite}>
          {showAdded ? 'Remove from Favourites' : 'Add to Favourites'}
        </Button>
      </Card.Body>
    </Card>
  );
}
