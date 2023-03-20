import React from 'react';

export const BookView = ({book, onBackClick}) => {
    return (
        <div className="book-view">
            <div className="book-poster">
                <img alt={book.Title} src={book.ImagePath} />
            </div>
            <div className="book-title">
                <span className="label">Title: </span>
                <span className="value">{book.Title}</span>
            </div>
            <div className="book-description">
                <span className="label">Synopsis: </span>
                <p className="value">{book.Synopsis.Paragraph1}</p>
                <p className="value">{book.Synopsis.Paragraph2}</p>
            </div>
            <div className="book-genre">
                <span className="label">Published: </span>
                <span className="value">{book.Published}</span>
            </div>
            <div className="book-genre">
                <span className="label">Genre: </span>
                <span className="value">{book.Genre}</span>
            </div>
            <div className="book-Author">
                <span className="label">Author: </span>
                <span className="value">{book.Author.Name}</span>
            </div>
            <button onClick={() => { onBackClick(null); }}>Back</button>
       </div>
    );
}