
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '@/lib/userData'; 

export default function SearchForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [formData, setFormData] = useState({
    q: '',
    searchBy: 'title',
    geoLocation: '',
    medium: '',
    isHighlight: false,
    isOnView: false,
  });

  const onSubmit = async (data) => {
    let queryString = '';

    if (data.q) queryString += `&q=${data.q}`;
    if (data.searchBy) queryString += `&searchBy=${data.searchBy}`;
    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    if (data.isHighlight) queryString += `&isHighlight=true`;
    if (data.isOnView) queryString += `&isOnView=true`;

    if (queryString.startsWith('&')) queryString = queryString.slice(1);

    setSearchHistory(await addToHistory(queryString)); 

    router.push(`/artwork?${queryString}`);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              name="q"
              {...register('q', { required: 'Search query is required' })}
              value={formData.q}
              onChange={handleInputChange}
            />
            {errors.q && <p className="text-danger">{errors.q.message}</p>}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Label>Search By</Form.Label>
          <Form.Select
            name="searchBy"
            className="mb-3"
            {...register('searchBy')}
            value={formData.searchBy}
            onChange={handleInputChange}
          >
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
              name="geoLocation"
              {...register('geoLocation')}
              value={formData.geoLocation}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control
              type="text"
              name="medium"
              {...register('medium')}
              value={formData.medium}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            label="Highlighted"
            name="isHighlight"
            checked={formData.isHighlight}
            onChange={handleInputChange}
          />
          <Form.Check
            type="checkbox"
            label="Currently on View"
            name="isOnView"
            checked={formData.isOnView}
            onChange={handleInputChange}
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
  );
}
