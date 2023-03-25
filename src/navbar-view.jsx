import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export function NavbarView({user}) {
  const onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  const isAuth = () => {
    if(typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar className="navigation-bar" sticky="top">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">MyBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link id="user-name" href="/profile">{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" id="logout" onClick={onLoggedOut}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link id="sign-in" href="/">Sign In</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link id="sign-up" href={'/register'}>Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}