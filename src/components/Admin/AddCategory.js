import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query'
import NavbarAdmin from '../Navbar/NavbarAdmin';
import { API } from '../../config/api';

export default function AdminAddCategory() {
  console.clear();

  let navigate = useNavigate();
  const [category, setCategory] = useState('');

  document.title = 'Tambah Category';

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify({ name: category });

      // Insert category data
      const response = await API.post('/category', body, config);

      navigate('/admin/category');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="bg-dark" style={{padding:"100px 300px 400px 300px"}}>
      <NavbarAdmin/>
      <Container className="py-5" style={{backgroundColor:"white",padding:"30px" }}>
        <Row>
          <Col xs="12">
            <h3 className="text-header-category mb-4">Tambah Category</h3>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="d-flex mt-4">
                <label>Nama Category</label>
              </div>
              <div className="d-flex">
                <input type="text" placeholder="Tambah Category" name="category" onChange={handleChange} style={{width:"100%"}}/>
              </div>
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Add
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
