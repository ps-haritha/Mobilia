import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function UserNavigation() 
{
  const role= JSON.parse(localStorage.getItem('role'))
  //console.log(role,'role');
  
  return (
   <>
{
role=='user'?
<Navbar expand="lg" className="bg">
<Container fluid>
  <Navbar.Brand href="/userHome" className='brand'>Mobilia</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
  <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
      <Link to={'/myOrders'} className='nav-link'>My Orders</Link>
      <Link to={'/cart'} className='nav-link'>Cart</Link>
      <Link to={'/manageProducts'} className='nav-link'>Manage Products</Link>
     <Link to={'/'} className='nav-link'>Sign Out</Link>
     
    </Nav>
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Container>
</Navbar>

:
   <Navbar expand="lg" className="bg">
    <Container fluid>
      <Navbar.Brand href="/admin" className='brand'>Mobilia</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
      <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Link to={'/manageUser'} className='nav-link'>Manage Users</Link>
          <Link to={'/manageFurniture'} className='nav-link'>Manage Furniture</Link>
         <Link to={'/'} className='nav-link'>Sign Out</Link>
         
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}
   </>
  )
}

export default UserNavigation;
