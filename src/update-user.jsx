import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

export function UpdateUser({ user }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.put(`https://mighty-falls-90534.herokuapp.com/users/${user.Username}`, {
            Username: username,
            Password: password,
            Email: email
        }, { headers: { Authorization: `Bearer ${token}`}
        }).then((response) => {
            alert('Profile has been updated');
            localStorage.setItem('user', response.data.Username);
            window.open('/', '_self');
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Fragment>
            <Card id="update-card">
                <Card.Body>
                    <Card.Title>Update Info</Card.Title>
                    
                    <Form className='update-form'>
                        <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Username"
                            className="update-input"
                            defaultValue={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label className="update-label">Password:</Form.Label>
                        <Form.Control
                            type="password"
                            name="Password"
                            className="update-input"
                            defaultValue={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label className="update-label">Email:</Form.Label>
                        <Form.Control
                            type="email"
                            name="Email"
                            className="update-input"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        </Form.Group>

                        <Button type="submit" id="update-btn" onClick={handleUpdate}>Update</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Fragment>
    )
}