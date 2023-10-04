import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function BookCard({ book }) {    
    return (
        <Card id="book-card">
            <Card.Img alt="cover of book" className="book-img" crossOrigin="anonymous" variant="top" src={book.bookimage} />
            <Card.Body>
                <Card.Title className="card-title">{book.title}</Card.Title>

                <div id="bookCard-btn">
                    <Link to={`/books/${encodeURIComponent(book.id)}`}>
                        <Button id="book-btn" variant="primary">Open</Button>
                    </Link>

                    <Link to={`/authors/${encodeURIComponent(book.author)}`}>
                        <Button id="author-btn" variant="primary">Author</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}

BookCard.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired
    }).isRequired
};