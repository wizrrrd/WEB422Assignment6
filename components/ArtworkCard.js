import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) return <div>Error loading artwork.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Card className="h-100 shadow-sm">
      {/* Wrap the Image directly with Link */}
      <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
        <Image
          src={data.primaryImageSmall || '/placeholder.png'}
          alt={data.title || 'Artwork'}
          width={300}
          height={300}
          className="card-img-top"
        />
      </Link>
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || 'N/A'} <br />
          <strong>Classification:</strong> {data.classification || 'N/A'} <br />
          <strong>Medium:</strong> {data.medium || 'N/A'}
        </Card.Text>
        {/* Move the "View More" button link outside of the Card.Body */}
        <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
          <Button variant="primary">View More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
