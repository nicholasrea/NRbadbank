import React, { useState, useContext, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import AuthContext from "../auth/AuthContext";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Images/bblogo.png";

//TODO: ADD Logout functionality

export default function Navigation() {
  const { user, signOut } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(false);

  // Flip flag, to trigger a refresh if user is updated.
  useEffect(() => {
    user ? setCurrentUser(true) : setCurrentUser(false);
  }, [user]);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">
          <img src={logo} alt="badbank" width="50" height="50" className="d-inline-block align-top"/>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {(!currentUser)  && <NavLink to="/login" className="nav-link">
            Log In
          </NavLink>}
          {(currentUser) && <><NavLink to="/deposit" className="nav-link">
            Deposit
          </NavLink><NavLink to="/withdraw" className="nav-link">
              Withdraw
            </NavLink></>}

        </Nav>
      </Navbar.Collapse>
      <Navbar.Text>
        {user && (
          <div>
            Signed in as: <a onClick={signOut}>{user.email}</a>
          </div>
        )}
      </Navbar.Text>
    </Navbar>
  );
}
