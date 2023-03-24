import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();

    if (isReq) {
      axios.post('https://mighty-falls-90534.herokuapp.com/login', {
        Username: username,
        Password: password
      }).then(response => {
        const data = response.data;
        props.onLoggedIn(data);
        console.log(data);
      }).catch(e => {
        console.log('User does not exist');
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body className="login-card">
                <Card.Title>Login</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter your username."
                    />
                    {/* code added here to display validation error */}
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPasswrod">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password."
                    />
                    {/* code added here to display validation error */}
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Button variant="primary" type="submit" id="login-btn" onClick={handleSubmit}>Log In</Button>

                  <Link to={"/register"}>
                    <Button variant="primary" type="submit" id="register-btn">New User?</Button>
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}