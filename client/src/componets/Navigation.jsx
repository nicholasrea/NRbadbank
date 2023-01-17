import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import AuthContext from '../auth/AuthContext';
import { Link, NavLink } from 'react-router-dom';

//TODO: ADD Logout functionality

export default function Navigation() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(false);

  // Flip flag, to trigger a refresh if user is updated. 
  useEffect(() => {
    user ? setCurrentUser (true) : setCurrentUser(false);
  }, [user] )

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">BadBank</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/login" className="nav-link">
            Log In
          </NavLink>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text>
        {user && <div>Signed in as: {user.email}</div>}
      </Navbar.Text>
    </Navbar>
  );
};

