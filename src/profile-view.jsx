import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FavoriteBooks } from './favorite-books';
import { UpdateUser } from './update-user';

export function ProfileView(props) {
    const [user, setUser] = useState(props.user);
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    useEffect(() => {getUser()}, [])

    const getUser = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.get(`https://mighty-falls-90534.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            setUser(response.data)
            setFavoriteBooks(response.data.FavoriteBooks)
            console.log(response.data)
        }).catch(function (error) {
            console.log(error);
        });
    }

    const removeUser = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        axios.delete(`https://mighty-falls-90534.herokuapp.com/users/${user}`, {
          headers: { Authorization: `Bearer ${token}`}
        }).then((response) => {
          alert('User has been deleted from the app');
          console.log(response.data);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.open('/', '_self');
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Container>
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
                    <UpdateUser user={user} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2 className="favorite-books">Favorite Books</h2>
                </Col>
            </Row>

            <Row>
                <FavoriteBooks
                    books={ props.book }
                    favoriteBooks={ favoriteBooks }
                />
            </Row>
        </Container>
    )
}