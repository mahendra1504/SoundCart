import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../components/ContextProvider/Context';

const AdminHeader = () => {

  
  const {logindata,setLoginData} = useContext(LoginContext);
  const navigate = useNavigate()
  const Logout = async () => {
    console.log("aya ke ni");
    let token = localStorage.getItem("usersdatatoken");
    console.log("token :",token);

    const res = await fetch("/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            Accept: "application/json"
        },
        credentials: "include"
    });

    console.log("respms",res );

    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
        console.log("user logout");
        localStorage.removeItem("usersdatatoken");
        setLoginData(false)
        navigate("/");
    } else {
        console.log("error");
    }
}
  return (
    <>

<Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{textDecoration:"none"}}><NavLink style={{color:"white"}} to={"/admin"}>Admin Dashboard</NavLink></Navbar.Brand>
          <Nav className="me-auto">
            <NavLink style={{color:"white", margin: "10px"}} to={"/admin"}>Home</NavLink>
            <NavLink style={{color:"white", margin: "10px"}} to={"/brand"}>Brands</NavLink>
            <NavLink style={{color:"white", margin: "10px"}} to={"/category"}>Categories</NavLink>
            <NavLink style={{color:"white", margin: "10px"}} to={"/product"}>Products</NavLink>
            <NavLink style={{color:"white", margin: "10px"}} to={"/coupan"}>Coupon</NavLink>
            <NavLink style={{color:"white", margin: "10px"}} to={"/orders"}>Orders</NavLink>
            <NavLink style={{color:"white", margin: "10px"}} onClick={Logout}>Logout</NavLink>
          </Nav>
        </Container>
      </Navbar>

    </>
  )
}

export default AdminHeader