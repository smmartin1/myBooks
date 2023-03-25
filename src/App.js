import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { LoginView } from './login-view';
import { RegistrationView } from './registration-view';
import { BookView } from './book-view';
import { BookCard } from './book-card';
import { AuthorView } from './author-view';
import { NavbarView } from './navbar-view';
import { ProfileView } from './profile-view';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken != null) {
        this.setState({ user: localStorage.getItem('user')});
        this.getBooks(accessToken);
    }
  }

  onLoggedIn(authData) {
    //console.log(authData);
    this.setState({ user: authData.users.Username });

    console.log(authData.users.Username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.users.Username);
    this.getBooks(authData.token);
  }

  onRegister(register) {
      this.setState({ register });
  }

  getBooks(token) {
    axios.get('https://mighty-falls-90534.herokuapp.com/books', {
        headers: { Authorization: 'Bearer ' + token }
    }).then(response => {
        this.setState({ books: response.data });
    }).catch(error => {
        console.log(error);
    });
}

  render() {
    const { books, user } = this.state;

    return (
      <Container>
        <Router>
          <NavbarView user={ user } />

          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return <Col md={5}><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

              if (books.length === 0) return <div className="main-view"/>

              return books.map(b => (
                <Col md={3} key={b._id}>
                    <BookCard book={b} />
                </Col>
              ))
            }}/>

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col md={6}>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/books/:bookID" render={({ match, history }) => {
                return <Col md={8}>
                    <BookView book={books.find((b) => b._id === match.params.bookID)} onBackClick={() => history.goBack()} />
                </Col>
            }} />

            <Route path="/authors/:Name" render={({match, history }) => {
              if (books.length === 0) return <div className="main-view" />
              return <Col md={8}>
                  <AuthorView 
                      author={books.find((b) => b.Author.Name === match.params.Name).Author}
                      onBackClick={() => history.goBack()}
                  />
              </Col>
            }} />

            <Route path="/profile" render={({ history }) => {
              return <Col>
                  <ProfileView
                      user={user}
                      book={books}
                      onBackClick={() => history.goBack()}
                  />
              </Col>
            }} />
          </Row>
        </Router>
      </Container>
    )
  }
}

export default App;