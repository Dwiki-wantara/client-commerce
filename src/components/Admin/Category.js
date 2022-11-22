import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import DeleteData from '../Modal/DeleteData';
import { API } from '../../config/api';

export default function AdminCategory() {
  let navigate = useNavigate();
  document.title = 'Category';

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: categories, refetch } = useQuery('categoriesCache', async () => {
    const response = await API.get('/categories');
    return response.data.data;
  });

  const handleEdit = (id) => {
    navigate(`/admin/update-category/${id}`);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/category/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  const addCategory = () => {
    navigate('/admin/add-category');
  };

  return (
    <div className='bg-dark' style={{paddingTop:"100px", paddingBottom:"100%"}}>
      <Container className="py-5" style={{backgroundColor:"white", borderRadius:"10px"}} >
        <Row>
          <Col>
            <h3 className="mb-4" style={{marginLeft:"180px"}}>List Category</h3>
          </Col>
          <Col className="text-end">
            <Button onClick={addCategory} style={{width: '100px', marginRight:"200px"}}>
              Add
            </Button>
          </Col>
          <Col xs="12"  style={{padding:"0px 200px"}}>
            {categories?.length !== 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th style={{textAlign:"center"}}>No</th>
                    <th style={{textAlign:"center"}}>Category Name</th>
                    <th style={{textAlign:"center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((item, index) => (
                    <tr key={index}>
                      <td width="10%" className="align-middle" style={{textAlign:"center"}}>
                        {index + 1}
                      </td>
                      <td width="60%" className="align-middle" style={{textAlign:"center"}}>
                        {item.name}
                      </td>
                      <td width="30%"  style={{textAlign:"center"}}>
                        <Button onClick={() => {handleEdit(item.id)}} className="btn-sm btn-success me-2" style={{ width: '100px' }}>
                          Edit
                        </Button>
                        <Button onClick={() => {handleDelete(item.id)}} className="btn-sm btn-danger" style={{ width: '100px' }}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
      </Container>
      <DeleteData  setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose}/>
    </div>
  );
}
