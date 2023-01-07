import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import AuthContext from '../auth/AuthContext';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const { email } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">My App</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/link1" className="nav-link">
            Link 1
          </Link>
          <Link to="/link2" className="nav-link">
            Link 2
          </Link>
          <Link to="/link3" className="nav-link">
            Link 3
          </Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text>
        Signed in as: <a href="#login">{email}</a>
      </Navbar.Text>
    </Navbar>
  );
};

