import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class BookView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FavoriteBooks: []
        };
    }

    keypressCallback = (event) => {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypresssCallback);
    }

    getFav = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.get(`https://mighty-falls-90534.herokuapp.com/users/${user}/books`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            this.setState({ FavoriteBooks: response.data });
        }).catch(error => {
            console.log(error);
        });
    }

    addFav = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const favBook = this.state.FavoriteBooks;
        let isFav = favBook.includes(this.props.book._id);

        if (!isFav) {
            axios.post(`https://mighty-falls-90534.herokuapp.com/users/${user}/books/${this.props.book._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                alert('Book has been added to favorites.');
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    removeFav = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const favBook = this.state.FavoriteBooks;
        let isFav = favBook.includes(this.props.book._id);

        if (!isFav) {
            axios.delete(`https://mighty-falls-90534.herokuapp.com/users/${user}/books/${this.props.book._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                alert('Book has been remove from favorites.');
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    render() {
        const {book, onBackClick} = this.props;
        const favBook = this.state.FavoriteBooks;
        let isFav = favBook.includes(this.props.book._id);

        if (!book.Synopsis.Paragraph2) {
            return(
                <div className="book-view">
                    <div className="book-title">
                        <h2>{book.Title}</h2>
                    </div>

                    <div>
                        <img alt="cover of book" className="book-poster" crossOrigin="anonymous" src={book.ImagePath} />
                    </div>
                    
                    <div className="book-description">
                        <p className="value"><b>Synopsis</b>: {book.Synopsis.Paragraph1}</p>
                    </div>

                    <div className="published-year">
                        <p><b>Published</b>: {book.Published}</p>
                    </div>

                    <div className="book-genre">
                        <p><b>Genre</b>: {book.Genre}</p>
                    </div>

                    <div className="book-Author">
                        <p>
                            <b>Author</b>: <Link className="author-link" to={`/authors/${book.Author.Name}`}>
                                {book.Author.Name}
                            </Link>
                        </p>
                    </div>

                    {!isFav && (
                        <Button id="add-btn" onClick={this.addFav}>Add to Favorites</Button>
                    )}
                    {isFav && (
                        <Button id="remove-btn" onClick={this.removeFav}>Remove from Favorites</Button>
                    )}

                    <Button id="bookBack-btn" onClick={() => { onBackClick(null); }}>Back</Button>
                </div>
            );
        } else {
            return(
                <div className="book-view">
                    <div className="book-title">
                        <h2>{book.Title}</h2>
                    </div>

                    <div>
                        <img alt="cover of book" className="book-poster" crossOrigin="anonymous" src={book.ImagePath} />
                    </div>

                    <div className="book-description">
                        <p className="value"><b>Synopsis</b>: {book.Synopsis.Paragraph1}</p>
                        <p className="value">{book.Synopsis.Paragraph2}</p> 
                    </div> 

                    <div className="published-year">
                        <p><b>Published</b>: {book.Published}</p>
                    </div>

                    <div className="book-genre">
                        <p><b>Genre</b>: {book.Genre}</p>
                    </div>

                    <div className="book-Author">
                        <p>
                            <b>Author</b>: <Link className="author-link" to={`/authors/${book.Author.Name}`}>
                                {book.Author.Name}
                            </Link>
                        </p>
                    </div>

                    {!isFav && (
                        <Button id="add-btn" onClick={this.addFav}>Add to Favorites</Button>
                    )}
                    {isFav && (
                        <Button id="remove-btn" onClick={this.removeFav}>Remove from Favorites</Button>
                    )}

                    <Button id="bookBack-btn" onClick={() => { onBackClick(null); }}>Back</Button>
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
        }),
        _id: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};