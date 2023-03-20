import React from 'react';
import PropTypes from 'prop-types';

export function BookCard({ book, onBookClick }) {
    return (
        <div onClick={() => { onBookClick(book)}}>{book.Title}</div>
    );
}

BookCard.propTypes = {
    book: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
};