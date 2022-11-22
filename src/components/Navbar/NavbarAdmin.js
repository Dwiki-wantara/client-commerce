import React, {useContext} from 'react'
import { Container, Navbar as NavbarComp, Nav, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate} from "react-router-dom"
import {  Dropdown } from "react-bootstrap";
import { UserContext } from '../../context/userContext'
import Logonav from '../../assets/logonav.png'
import Logo from '../../assets/logo.png'
import {  FaAddressCard, FaSignOutAlt, FaSimCard } from "react-icons/fa";

export default function Navbar() {
    const [state, dispatch] = useContext(UserContext)

    let navigate = useNavigate()

    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/auth")
    }

    return (
    <NavbarComp fixed="top" style={{ height: "7vh",backgroundColor:"white" }}>
      <Container>



        <NavbarComp.Brand as={Link} to="/admin">
          <img src={Logonav} style={{width:"100px"}} />
        </NavbarComp.Brand>
        
      <NavbarComp.Brand as={Link} to="/admin">
          <h2>Welcome Admin</h2>
        </NavbarComp.Brand>

        <Dropdown>
          <Dropdown.Toggle  variant="white" >
            <img src={Logo} alt="Masgan" width={40} height={33} className="rounded-pill" />
          </Dropdown.Toggle>
              
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/admin/category" >
              <FaSimCard className="text-danger me-2"/>
                <span>Category</span>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/admin" >
              <FaAddressCard className="text-danger me-2"/>
                <span>Product</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={logout} >
              <FaSignOutAlt className="text-danger me-2"/>
                <span>Keluar</span>
              </Dropdown.Item>
           </Dropdown.Menu>
          </Dropdown>
      </Container>

    </NavbarComp>
       
    )
}
