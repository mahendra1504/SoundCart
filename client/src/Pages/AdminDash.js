import React from 'react'
import AdminHeader from './AdminHeader'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {NavLink} from 'react-router-dom';


const AdminDash = () => {
  return (
    <>
      <AdminHeader></AdminHeader> 

      <Container>

 <Row style={{marginTop:"10px"}}>

 <Col sm={3}><Card style={{ width: '18rem',marginLeft:"2rem", height:"12rem" ,backgroundColor:"#475953"}}>
      <Card.Body>
        <Card.Title style={{color:"white"}}>Brands</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>
          
        </Card.Text>
        
        <NavLink style={{color:"white",fontStyle:"italic"}}  to={"/brand"} >Add Brands</NavLink>
       
      </Card.Body>
    </Card></Col>

        <Col sm={3}><Card style={{ width: '18rem' , marginLeft:"2rem" ,height:"12rem" ,backgroundColor:"#475953"}}>
      <Card.Body>
        <Card.Title style={{color:"white"}}>Categorys</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>
         
        </Card.Text>
        <NavLink style={{color:"white", fontStyle:"italic"}} to={"/category"}>Add Category</NavLink>
        
      </Card.Body>
    </Card></Col>
        

    <Col sm={3}><Card style={{ width: '18rem',marginLeft:"2rem",height:"12rem" ,backgroundColor:"#475953"}}>
      <Card.Body>
        <Card.Title style={{color:"white"}}>Products</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>
          
        </Card.Text>
        
        <NavLink style={{color:"white",fontStyle:"italic"}}  to={"/product"} >Add Product</NavLink>
       
      </Card.Body>
    </Card></Col>

    <Col sm={3}><Card style={{ width: '18rem',marginLeft:"2rem",height:"12rem" ,backgroundColor:"#475953"}}>
      <Card.Body>
        <Card.Title style={{color:"white"}}>Coupans</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>
          
        </Card.Text>
        <NavLink style={{color:"white",fontStyle:"italic"}} to={"/coupan"}>Add Coupan</NavLink>
       
      </Card.Body>
    </Card></Col>
      </Row>

      <Row style={{marginTop:"10px"}}>
        <Col sm={3}><Card style={{ width: '18rem',marginLeft:"2rem",height:"12rem" ,backgroundColor:"#475953"}}>
        <Card.Body>
          <Card.Title style={{color:"white"}}>Orders</Card.Title>
          <Card.Subtitle  className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
            
          </Card.Text>
          <NavLink style={{color:"white",fontStyle:"italic"}}  to={"/orders"}>Orders</NavLink>
        
        </Card.Body>
      </Card></Col>    
      </Row> 



      
    </Container>
    </>
  )
}

export default AdminDash


