import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import ShowMoreText from 'react-show-more-text';
import rupiahFormat from 'rupiah-format';
import { useQuery, useMutation } from 'react-query';
import DeleteData from '../Modal/DeleteData';
import { API } from '../../config/api';

export default function AdminHome() {
  let navigate = useNavigate();
  document.title = 'Home Admin';
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: products, refetch } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });

  const addProduct = () => {
    navigate('/admin/add-product');
  };

  const handleUpdate = (id) => {
    navigate('/admin/update-product/' + id);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
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

  return (
    <div className='bg-dark' style={{paddingTop:"100px", paddingBottom:"100px"}}>
      <Container className="py-5"  style={{backgroundColor:"white", borderRadius:"10px"}} >
        <Row>
          <Col xs="6">
            <h2 className="text-header-category mb-4">List Product</h2>
          </Col>
          <Col xs="6" className="text-end">
            <Button  onClick={addProduct} style={{ width: '100px' }} >
              Add
            </Button>
          </Col>
          <Col xs="12">
            {products?.length !== 0 ? (
              <Table >
                <thead>
                  <tr>
                    <th width="1%" className="text-center">
                      No
                    </th>
                    <th className="text-center">Photo</th>
                    <th className="text-center">Product Name</th>
                    <th className="text-center">Product Desc</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Qty</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((item, index) => (
                    <tr key={index}>
                      <td className="align-middle text-center">{index + 1}</td>
                      <td className="align-middle text-center">
                        <img src={item.image} style={{width: '80px',height: '80px',objectFit: 'cover',}} alt={item.name}/>
                      </td>
                      <td className="align-middle text-center">{item.name}</td>
                      <td className="align-middle text-center">
                        <ShowMoreText lines={1} more="show" less="hide" className="content-css" anchorClass="my-anchor-css-class" expanded={false} width={280}>
                          {item.desc}
                        </ShowMoreText>
                      </td>
                      <td className="align-middle text-center">
                        {rupiahFormat.convert(item.price)}
                      </td>
                      <td className="align-middle text-center">{item.qty}</td>
                      <td className="align-middle text-center">
                        <Button onClick={() => {handleUpdate(item.id)}} className="btn-sm btn-success me-2" style={{width:'100px'}}>
                          Edit
                        </Button>
                        <Button onClick={() => {handleDelete(item.id)}} className="btn-sm btn-danger" style={{width:'100px'}}>
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
      <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose}/>
    </div>
  );
}
