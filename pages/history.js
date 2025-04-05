import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { Button, ListGroup, Container } from 'react-bootstrap';
import { removeFromHistory } from '@/userData';  // Import the function

export default function HistoryPage() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const handleSearch = (query) => {
    router.push(`/artwork?${query}`);
  };

  const handleDelete = async (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);

    // Update history after removal
    setSearchHistory(await removeFromHistory(updatedHistory));
  };

  if (!searchHistory) return null;

  return (
    <Container className="mt-4">
      <h1>Search History</h1>
      {searchHistory.length === 0 ? (
        <p>No search history yet.</p>
      ) : (
        <ListGroup>
          {searchHistory.map((query, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <span>{query}</span>
              <div>
                <Button variant="primary" size="sm" onClick={() => handleSearch(query)}>
                  Re-run
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}
