import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import convertRupiah from "rupiah-format";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";

export default function UserDetail() {
  let navigate = useNavigate();
  let { id } = useParams();

  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  return (
    <div style={{backgroundColor:""}}>
      <Container style={{marginTop:"80px",backgroundColor:""}}>
      <div className="d-flex" style={{padding:"0px 100px 0px 100px"}}>
          <div style={{flex:"40%"}}>
            <img style={{minWidth:"100%", maxWidth:"100%"}} src={product?.image}  />
          </div>
          <div style={{flex:"50%", backgroundColor:"", paddingRight:"20px"}}>
            <div style={{color:"black", fontSize:"25px", fontFamily:"initial", paddingLeft:"10px"}}>{product?.name}</div>
            <div style={{color:"black", fontSize:"25px", fontFamily:"initial", paddingLeft:"10px"}}>Stock : {product?.qty}</div>
            <p style={{color:"black", fontSize:"25px", fontFamily:"initial", paddingLeft:"10px"}}>{product?.desc}</p>
            <div className="text-end mt-4" style={{color:"black", fontSize:"25px", fontFamily:"initial", paddingLeft:"10px"}}>{convertRupiah.convert(product?.price)}</div>
            <div className="d-grid gap-2 mt-5" style={{marginBottom:"10px"}}>
              <button onClick={{}} style={{color:"black", fontSize:"25px", fontFamily:"initial", paddingLeft:"10px"}}>
                Buy
              </button>
            </div>
          </div>

      </div>
         
          
   
      </Container>
    </div>
  );
}
