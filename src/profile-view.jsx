import React, { useState } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { BookCard } from './book-card';

export function ProfileView({user, token, books, onLoggedOut, updateUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    let favoriteBooks = books.filter(book => user.favoriteBooks.includes(book.id));

    const handleSubmit = e => {
        e.preventDefault();

        const data = {
            username,
            password,
            email
        }

        fetch(`https://mighty-falls-90534.herokuapp.com/users/${user.username}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Update failed. Try again.");
                return false;
            }
        }).then(user => {
            if (user) {
                alert("Successfully updated account");
                updateUser(user);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const removeUser = () => {
        fetch(`https://mighty-falls-90534.herokuapp.com/users/${user}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}`}
        }).then((response) => {
            if (response.ok) {
                alert('You have been deleted from the app');
                onLoggedOut();
            } else {
                alert("Unable to delete account");
            }
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <>
            <Row className="profile-info">
                <Col md={4}>
                    <Card id="info-card">
                        <Card.Body>
                        <Card.Title>Your Info</Card.Title>
                        <Card.Text><b>Username</b>: {user.Username}</Card.Text>
                        <Card.Text><b>Email</b>: {user.Email}</Card.Text>
                        <Button type="secondary" id="delete-btn" onClick={() => removeUser(user.Username)}>Delete Your Account</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={10} sm={6}>
                    <Card id="update-card">
                        <Card.Body>
                            <Card.Title>Update Info</Card.Title>
                            
                            <Form className='update-form' onSubmit={handleSubmit}>
                                <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Username"
                                    className="update-input"
                                    defaultValue={username}
                                    minlength="2"
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
                                    minlength="6"
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

                                <Button type="submit" id="update-btn">Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2 className="favorite-books">Favorite Books</h2>
                </Col>
            </Row>

            <Row>
                {favoriteBooks.map(book => (
                    <Col md={3} key={book._id}>
                        <BookCard book={book} />
                    </Col>
                ))}
            </Row>
        </>
    )
}