import React from 'react';

export const BookCard = ({ book, onBookClick }) => {
    return (
        <div onClick={() => { onBookClick(book)}}>{book.Title}</div>
    );
}