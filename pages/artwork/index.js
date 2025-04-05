import useSWR from 'swr';
import { useState, useEffect } from 'react';
import ArtworkCard from '@/components/ArtworkCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function ArtworkPage({ query }) {
  const [page, setPage] = useState(1);
  const [filteredResults, setFilteredResults] = useState([]);
  const [paginatedResults, setPaginatedResults] = useState([]);
  
  const finalQuery = `${query}&hasImages=true&q=${query}&page=${page}&perPage=${PER_PAGE}`;
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  useEffect(() => {
    if (data?.objectIDs) {
      const validResults = validObjectIDList.objectIDs.filter((id) =>
        data.objectIDs.includes(id)
      );

      const results = [];
      for (let i = 0; i < validResults.length; i += PER_PAGE) {
        results.push(validResults.slice(i, i + PER_PAGE));
      }
      setFilteredResults(validResults);
      setPaginatedResults(results);
    }
  }, [data, page]);

  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setPage((prev) => (prev < paginatedResults.length ? prev + 1 : prev));

  if (error) return <div>Error loading artwork.</div>;
  if (!data || paginatedResults.length === 0) return <div>Loading...</div>;

  return (
    <>
      <Row className="gy-4">
        {paginatedResults[page - 1]?.map((id) => (
          <Col key={id} lg={3} md={4} sm={6}>
            <ArtworkCard objectID={id} />
          </Col>
        ))}
      </Row>

      {paginatedResults.length > 0 && (
        <Pagination className="mt-4">
          <Pagination.Prev onClick={handlePrevious} disabled={page === 1} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={handleNext} disabled={page === paginatedResults.length} />
        </Pagination>
      )}
    </>
  );
}

export async function getServerSideProps({ query }) {
  return { props: { query: query.q || '' } };
}
