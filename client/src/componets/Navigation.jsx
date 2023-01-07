import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import AuthContext from '../auth/AuthContext';
import { Link, NavLink } from 'react-router-dom';

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
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/link1" className="nav-link">
            NavLink 1
          </NavLink>
          <NavLink to="/link2" className="nav-link">
            NavLink 2
          </NavLink>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text>
        Signed in as: <a href="#login">{email}</a>
      </Navbar.Text>
    </Navbar>
  );
};

