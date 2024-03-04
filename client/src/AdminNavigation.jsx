import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './AdminNavigation.css'

function AdminNavigation() {
  return (
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
            <Link to={'/manageUser'} className='nav-link'>Manage Users </Link>
            <Link to={'/manageFurniture'} className='nav-link'>Manage Furniture</Link>
           <Link to={'/'} className='nav-link'>Signout</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AdminNavigation
