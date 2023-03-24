import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function BookCard({ book }) {    
    return (
        <Card id="book-card">
            <Card.Img className="book-img" crossOrigin="anonymous" variant="top" src={book.ImagePath} />
            <Card.Body>
                <Card.Title className="card-title">{book.Title}</Card.Title>

                <div id="bookCard-btn">
                    <Link to={`/books/${book._id}`}>
                        <Button id="book-btn" variant="primary">Open</Button>
                    </Link>

                    <Link to={`/authors/${book.Author.Name}`}>
                        <Button id="author-btn" variant="primary">Author</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}

BookCard.propTypes = {
    book: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Author: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        _id: PropTypes.string
    }).isRequired
};