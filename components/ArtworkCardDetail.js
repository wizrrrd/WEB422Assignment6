import { useAtom } from 'jotai';
import { favouritesAtom } from '../store'; 
import { useState, useEffect } from 'react';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null,
    fetcher
  );

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  async function favouritesClicked() {
    console.log("Favourite clicked. Current state:", showAdded);
    console.log("Current objectID:", objectID);

    if (showAdded) {
      try {
        const updatedList = await removeFromFavourites(objectID);
        console.log("Favourites after removal:", updatedList);
        setFavouritesList(updatedList);
      } catch (err) {
        console.error("Error removing favourite:", err);
      }
    } else {
      try {
        const updatedList = await addToFavourites(objectID);
        console.log("Favourites after addition:", updatedList);
        setFavouritesList(updatedList);
      } catch (err) {
        console.error("Error adding favourite:", err);
      }
    }
  }

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          {data.objectDate || 'N/A'} <br />
          {data.classification || 'N/A'} <br />
          {data.medium || 'N/A'}
          <br /><br />
          {data.artistDisplayName ? (
            <>
              {data.artistDisplayName} -{' '}
              <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
                wiki
              </a>
            </>
          ) : (
            'N/A'
          )}
          <br />
          {data.creditLine || 'N/A'}
          <br />
          {data.dimensions || 'N/A'}
        </Card.Text>

        <Button
          variant={showAdded ? 'primary' : 'outline-primary'}
          onClick={favouritesClicked}
        >
          {showAdded ? '+ Favourite (added)' : '+ Favourite'}
        </Button>
      </Card.Body>
    </Card>
  );
}
