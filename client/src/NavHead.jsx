import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './NavHead.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function NavHead() 
{
  return (
    <Navbar expand="lg" className="bg">
      <Container fluid>
        <Navbar.Brand href="/" className='brand'>Mobilia</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to={'/'} className='nav-link'>Home</Link>
            <Link to={'/signUp'} className='nav-link'>SignUp</Link>
           <Link to={'/login'} className='nav-link'>Login</Link>
           <div class="dropdown">
  <button class="dropbtn">Furnitures</button>
  <div class="dropdown-content">
    <a href="/singleview/Sofa">Sofa</a>
    <a href="/singleview/chair">Chairs</a>
    <a href="/singleview/Dining Sets">Dining Sets</a>
    <a href="/singleview/Study Table">Study table</a>
    <a href="/singleview/Recliners">Recliners</a>
    <a href="/singleview/Bed">Bed</a>
    <a href="/singleview/Centre table">Centre table</a>
    <a href="/singleview/Wardrobe">Wardrobe</a>
    <a href="/singleview/Bar Furniture">Bar Furniture</a>
  </div>
</div>
    
    
    
    
    
           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className='search'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavHead;