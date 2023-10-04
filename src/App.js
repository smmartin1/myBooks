import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

import { LoginView } from './login-view';
import { RegistrationView } from './registration-view';
import { BookView } from './book-view';
import { BookCard } from './book-card';
import { AuthorView } from './author-view';
import { NavbarView } from './navbar-view';
import { ProfileView } from './profile-view';

import './App.css';

export const App = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [viewBooks, setViewBooks] = useState(books);

  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  //Get Books
  useEffect(() => {
    if (!token) return;
    axios.get("https://mighty-falls-90534.herokuapp.com/books", {
      headers: { Authorization: 'Bearer ' + token }
    }).then(response => response.json())
    .then(books => {
      const booksFromAPI = books.map(book => {
        return {
          id: book._id,
          title: book.Title,
          synopsisparagraph1: book.Synopsis.Paragraph1,
          synopsisparagraph2: book.Synopsis.Paragraph2,
          genre: book.Genre,
          published: book.Published,
          bookimage: book.ImagePath,
          author: book.Author.Name,
          authorbio: book.Author.Bio,
          authorbirth: book.Author.Birth,
          authordeath: book.Author.Death,
          authorimage: book.Author.ImageURL
        };
      });
      setBooks(booksFromAPI);
    });
  }, [token]);

  //Set Books
  useEffect(() => {
    setViewBooks(books);
  }, [books]);

  return (
    <BrowserRouter>
      <NavbarView 
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />

      <Container>
        <Row className="main-view justify-content-md-center">
          <Routes>
            <Route path="/register" element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <RegistrationView />
                  </Col>
                )}
              </>
            }/>

            <Route path="/login" element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView 
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }/>

            <Route path="/" element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : books.length === 0 ? (
                  <Col>Loading... please wait!</Col>
                ) : (
                  <>
                    {viewBooks.map((book) => (
                      <Col md={3} key={book._id}>
                        <BookCard book={book} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }/>

            <Route path="/books/:bookID" elememt={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : books.length === 0 ? (
                  <Col>Loading... please wait!</Col>
                ) : (
                  <Col md={8}>
                    <BookView books={books} user={user} token={token} updateUser={updateUser}/>
                  </Col>
                )}
              </>
            }/>

            <Route path="/profile" element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView book={books} user={user} token={token} 
                      onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    />
                  </Col>
                )}
              </>
            }/>

            <Route path="/author/:Name" element={
              <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : books.length === 0 ? (
                <Col>Loading... please wait!</Col>
              ) : (
                <Col md={8}>
                  <AuthorView author={books.Author} user={user} token={token} />
                </Col>
              )}
            </>
            }/>
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

/*
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
        <Row className="main-view justify-content-md-center">
        <Routes>
            {/*<NavbarView user={ user } />}
              <Route exact path="/" render={() => {
                if (!user) return <Col md={5}><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

                if (books.length === 0) return <div className="main-view"/>

                return books.map(b => (
                  <Col md={3} key={b._id}>
                      <BookCard book={b} />
                  </Col>
                ))
              }}/>

              <Route path="/register" element={
                <>
                  {user ? (<Navigate to="/"/>) 
                    : (
                      <Col md={6}>
                        <RegistrationView />
                      </Col>
                    )
                  }
                </>
              }
              
              /*render={() => {
                if (user) return <Redirect to="/" />
                return <Col md={6}>
                  <RegistrationView />
                </Col>
              }}
              />

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
        </Routes>
        </Row>
    )
  }
}
*/

export default App;