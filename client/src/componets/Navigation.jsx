import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import AuthContext from '../auth/AuthContext';
import { Link, NavLink } from 'react-router-dom';

//TODO: ADD Logout functionality

export default function Navigation() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    user ? setCurrentUser (true) : setCurrentUser(false);
  }, [user] )

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
        {user && <div>Signed in as: {user.email}</div>}
      </Navbar.Text>
    </Navbar>
  );
};

