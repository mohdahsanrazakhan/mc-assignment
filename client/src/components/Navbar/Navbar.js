import React from 'react';
import { Container, Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css'

function ANavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
      <Container>
        <Navbar.Brand as={Link} to="/home">Maxlence Consulting</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home" active>Home</Nav.Link>
            <Nav.Link as={Link} to="/about-us">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact-us">Contact Us</Nav.Link>
            <DropdownButton 
              id="dropdown-basic-button"
              variant="primary"
              className="custom-dropdown" 
            >
              <Dropdown.Item eventKey="1">Username</Dropdown.Item>
              <Dropdown.Item eventKey="2">Profile Setting</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3">Log out</Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ANavbar;
