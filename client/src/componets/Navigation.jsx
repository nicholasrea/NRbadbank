import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import AuthContext from '../auth/AuthContext';
import { Link, NavLink } from 'react-router-dom';

//TODO: ADD Logout functionality

export default function Navigation() {
  const { user, signOut } = useContext(AuthContext);
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
          <NavLink to="/login" className="nav-link">
            Log In
          </NavLink>
          <NavLink to="/deposit" disabled={!user} className="nav-link">
            Deposit
          </NavLink>
          <NavLink to="/withdraw" disabled={!user} className="nav-link">
            Withdraw
          </NavLink>                         
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text>
        {user && <div onClick={signOut}>Signed in as: {user.email}</div>}
      </Navbar.Text>
    </Navbar>
  );
};

