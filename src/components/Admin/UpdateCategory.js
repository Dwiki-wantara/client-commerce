import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import { API } from '../../config/api';

export default function AdminUpdateCategory() {
  document.title = 'Update Category';

  let navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({ name: '' });

  let { data: categoryData } = useQuery('categoryCache', async () => {
    const response = await API.get('/category/' + id);
    return response.data.data.name;
  });

  useEffect(() => {
    if (categoryData) {
      console.log(categoryData);
      setCategory({ name: categoryData });
    }
  }, [categoryData]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(category);

      await API.patch('/category/' + id, body, config);

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
      <h3 className="text-header-category mb-4">Edit Category</h3>
    </Col>
    <Col xs="12">
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <div className="d-flex mt-4">
          <label>Nama Category</label>
        </div>
        <div className="d-flex">
          <input type="text" placeholder="Tambah Category" name="category" onChange={handleChange}  value={category.name} style={{width:"100%"}}/>
        </div>
        <div className="d-grid gap-2 mt-4">
          <Button type="submit" variant="success" size="md">
            Update
          </Button>
        </div>
      </form>
    </Col>
  </Row>
</Container>
</div>
  );
}
