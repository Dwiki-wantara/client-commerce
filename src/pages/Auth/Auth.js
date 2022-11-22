import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Logo from "../../assets/logo.png";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";

export default function Auth() {
  let navigate = useNavigate();
  const [state] = useContext(UserContext);

  const checkAuth = () => {
    if (state.isLogin === true) {
      navigate("/");
    }
  };
  checkAuth();

  const [isRegister, setIsRegister] = useState(false);

  const switchLogin = () => {
    setIsRegister(false);
  };

  const switchRegister = () => {
    setIsRegister(true);
  };

  return (
    <div style={{backgroundColor:"white"}}>
      <Container>
        <Row className="vh-100 d-flex align-items-center">
          <Col md="6">
            <div className="d-flex justify-content-center">
              <img src={Logo} className="img-fluid" style={{ width: "264px", height: "264px"}} alt="brand" />
            </div>
            <h1 style={{color:"#6B6B6B", textAlign:"center"}}>Mudah, Murah, Terjangkau</h1>
            <p className="text-auth-parag mt-3 text-align-center">
              Blendpedia sebagai online store untuk Handphone yang berkualitas dan terjangkau<br/> 
             nikmati kemudahan bertransaksi dengan Blendpedia
            </p>
            <div className="mt-5 d-flex justify-content-center">
              <button onClick={switchLogin} className="btn btn-secondary px-5" style={{marginRight:"5px",fontFamily:"cursive"}}>
                Login
              </button>
              <button onClick={switchRegister} className="bg-white" style={{border:"1px solid secondary", padding:"0px 30px", borderRadius:"5px", fontFamily:"cursive"}}>
                Register
              </button>
            </div>
          </Col>
    
          <Col md="6">{isRegister ? <Register /> : <Login />}</Col>

        </Row>
      </Container>
    </div>
  );
}
