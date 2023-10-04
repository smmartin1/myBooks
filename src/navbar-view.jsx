import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function NavbarView({user, onLoggedOut}) {
  return (
    <Navbar className="navigation-bar" sticky="top">
      <Container>
        <Navbar.Brand className="navbar-logo" as={Link} to="/">MyBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {!user && (
              <>
                <Nav.Link id="sign-in" as={Link} to="/">Sign In</Nav.Link>
                <Nav.Link id="sign-up" as={Link} to="/register">Sign Up</Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link id="user-name" as={Link} to="/profile">{user}</Nav.Link>
                <Nav.Link id="logout" onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}