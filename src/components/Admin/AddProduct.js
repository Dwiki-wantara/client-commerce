import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { Form } from "react-bootstrap";
import NavbarAdmin from '../Navbar/NavbarAdmin';
import { API } from "../../config/api";

export default function AdminAddProduct() {
  document.title = "Tambah Product"

  let navigate = useNavigate();

  const [categories, setCategories] = useState([]); //Store all category data
  const [preview, setPreview] = useState(null); //For image preview

  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
    categoryId:"",

  }); //Store product data

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleChangeCategoryId = (e) => {
    console.log(e.target.value);
    setForm({
      ...form,
      categoryId: e.target.value,
    });
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", form.categoryId);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log("response.data.data");
      console.log(response.data.data);

      if (response.data.code == 200) {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-dark" style={{padding:"100px 300px 50px 300px"}}>
    <NavbarAdmin />
      <Container className="py-5" style={{backgroundColor:"white",padding:"30px"}}>
        <Row>
          <Col xs="12">
            <h3 className="mt-5 mb-4">Add Product</h3>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              {preview && (
                <div className="d-flex justify-content-center">
                  <img  src={preview}  style={{maxWidth: "300px",minWidth:"300px",minHeight: "150px"}} alt={preview}/>
                </div>
              )}
              <div>
                <input type="file" id="upload" name="image" hidden onChange={handleChange}/>
                <label for="upload" style={{border:"none", backgroundColor:"green", color:"white", padding:"5px 20px", cursor:"pointer", borderRadius:"10px"}}>
                  Upload Gambar
                </label>  
              </div>
              
              <div className="d-flex mt-4">
                <label>Nama Product</label>
              </div>
              <div className="d-flex">
                <input type="text" placeholder="Product Name" name="name" onChange={handleChange} style={{width:"100%"}}/>
              </div>

              <div className="d-flex mt-3">
                <label>Deskripsi Product</label>
              </div>
              <div className="d-flex">
                <textarea  placeholder="Deskripsi Product" name="desc" onChange={handleChange}  style={{width:"100%"}}></textarea>
              </div>
              
              <div className="d-flex mt-3">
                <label>Total Harga</label>
              </div>
              <div className="d-flex">
                <input  type="number"  placeholder="Price" name="price" style={{width:"100%"}} onChange={handleChange}/>
              </div>

              <div className="d-flex mt-3">
                <label>Stock Barang</label>
              </div>
              <div className="d-flex">  
                <input type="number" placeholder="Stock" min="0" name="qty" style={{width:"100%"}} onChange={handleChange}/>
              </div>
              
              <Form.Control className="mt-4" as="select" style={{border:"1px solid #848484"}} onChange={handleChangeCategoryId}>
                <option value="0" hidden>Stock</option>
                {categories.map((item, index) => (
                  <option key={index} value={item.id} name={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Tambah
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
