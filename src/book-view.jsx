import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class BookView extends Component {
    keypressCallback = (event) => {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypresssCallback);
    }

    render() {
        const {book, onBackClick} = this.props;

        if (!book.Synopsis.Paragraph2) {
            return(
                <div className="book-view">
                    <div className="book-poster">
                        <img src={book.ImagePath} />
                    </div>
                    <div className="book-title">
                        <span className="label">Title: </span>
                        <span className="value">{book.Title}</span>
                    </div>
                    <div className="book-description">
                        <span className="label">Synopsis: </span>
                        <p className="value">{book.Synopsis.Paragraph1}</p>
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
        } else {
            return(
                <div className="book-view">
                    <div className="book-poster">
                        <img src={book.ImagePath} />
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
                    <div className="book-published">
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
    }
}

BookView.propTypes = {
    book: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Synopsis: PropTypes.shape({
            Paragraph1: PropTypes.string.isRequired,
            Paragraph2: PropTypes.string
        }).isRequired,
        Genre: PropTypes.string.isRequired,
        Published: PropTypes.number.isRequired,
        Author: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};