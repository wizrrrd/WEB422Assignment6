import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/userData';  

export default function SearchPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const onSubmit = async (data) => {
    const queryString = `title=${data.searchBy}&geoLocation=${data.geoLocation}&medium=${data.medium}&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`;
    
    setSearchHistory(await addToHistory(queryString));
    
    router.push(`/artwork?${queryString}`);
  };

  return (
    <div className="mt-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter search query"
                {...register('q')}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register('searchBy')} className="mb-3">
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                {...register('geoLocation')}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medium"
                {...register('medium')}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              {...register('isHighlight')}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              {...register('isOnView')}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
