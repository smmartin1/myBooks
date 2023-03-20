import React, { Component } from 'react';
import axios from 'axios';

import { LoginView } from './login-view';
import { RegistrationView } from './registration-view';
import { BookView } from './book-view';
import { BookCard } from './book-card';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      selectedBook: null,
      user: null,
      register: null
    };
  }

  componentDidMount(){
    axios.get('https://mighty-falls-90534.herokuapp.com/books').then(response => {
        this.setState({ books: response.data });
      }).catch(error => {
          console.log(error);
      });
  }

  setSelectedBook(book) {
    this.setState({ selectedBook: book });
  }

  onLoggedIn(user) {
    this.setState({ user });
  }

  onRegister(register) {
      this.setState({ register });
  }

  render() {
    const { books, selectedBook, user, register } = this.state;

    if (register) return <RegistrationView onRegister={(bool) => this.onRegister(bool)} />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (books.length === 0) return <div className='main-view'>The list is empty</div>;

    return (
        <div className='main-view'>
            {selectedBook
                ? <BookView book={selectedBook} onBackClick={ newSelectedBook => {this.setSelectedBook(newSelectedBook);} }/>
                : books.map(book => (
                    <BookCard key={book._id} book={book} onBookClick={ (book) => {this.setSelectedBook(book)} }/>
                ))
            }
        </div>
    )
  }
}

export default App;