import React, { Component } from 'react';
import { BookView } from './book-view';
import { BookCard } from './book-card';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [
          {
            "_id":{"$oid":"63b8a05b3668348cc197f714"},
            "Title":"The Lightning Thief",
            "Synopsis":{
                "Paragraph1":"Percy Jackson is about to be kicked out of boarding school...again. And that's the least of his troubles. Lately, mythological monsters and the god of Mount Olympus seem to be walking straight out of the pages and into his life. And worse, he angered a few of them. Zeus's master lightning bolt has been stolen, and Percy is the prime suspect.",
                "Paragraph2":"Now Percy and his friends have just ten days to find and return Zeus's stolen property and bring peace to a warring Mount Olympus. But to succeed in his quest, Percy will have to do more than catch the thief: he must come to terms with the father who abandoned him; solve the riddle of the Oracle, which warns him of betrayal by a friend; and unravel a treachery more powerful than the gods themselves."
            },
            "Published":2005.0,
            "Genre":"Young Abult",
            "Author":{
                "Name":"Rick Riordan",
                "Bio":"Rick Riordan, dubbed \"storyteller of the gods\" by Publisher Weekly, is the author of five New York Times #1 best-selling series. He is best known for his Percy Jackson and the Olympians books, which bring Greek mythology to life for contemporary readers. He expanded on that series with two more: the Heros of Olympus and the Trials of Apollo, which cleverly combine Greek and Roman gods and heroes with his beloved modern characters. Rick tackled Egyptian gods in the magic-filled Kane Chronicles, and Norse mythology in Magnus Chase and the Gods of Asgard.",
                "Birth":1964.0,
                "Death":null
            },
            "ImagePath":"https://m.media-amazon.com/images/I/51PRKKi2BuL._AC_SY780_.jpg"
        },
        {
            "_id":{"$oid":"63b8a07b3668348cc197f715"},
            "Title":"The Hobbit",
            "Synopsis":{
                "Paragraph1":"When Thorin Oakenshield and his band of dwarves embark upon a dangerous quest to reclaim their home from the ruthless dragon Smaug, Gandalf the wizard suggests an unlikely accomplice: Bilbo Baggins, an unassuming hobbit dwelling in peaceful Hobbiton.",
                "Paragraph2":"As they journey from the wonders of Rivendell to the terrors of Mirkwood and beyond, Bilbo discovers within himself unexpected qualities of courage and cunning. And with each step, a newfound love of adventure propels him toward his great destiny...a destiny that waits in the dark caverns beneath the Misty Mountains, where a twisted creature known as Gullum jealously guards a precious magic ring."
            },
            "Published":1937.0,
            "Genre":"Fantasy",
            "Author":{
                "name":"J.R.R. Tolkien",
                "bio":"John Ronald Reuel Tolkien was born on January 3, 1892, in Bloemfontein, South Africa. After serving in World War I, he embarked upon a disinguished academic career and was recognized as one of the finestes philologists in the world. He was a professor of Anglo-Saxon at Oxford, a fellow of Pembroke College, and a fellow of Merton College until his retirement in 1959. He is, however, beloved throughout the world as the creator of Middle Earth and author of such classic works as The Hobbit and The Lord of the Rings. He died on September 2, 1973, at the age of eighty-one.",
                "birth":1892.0,
                "death":1973.0
            },
            "ImagePath":"https://m.media-amazon.com/images/I/413V3sIKSJL._AC_SY780_.jpg"
        },
        {
            "_id":{"$oid":"63b8a0963668348cc197f716"},
            "Title":"Hamlet",
            "Synopsis":{
                "Paragraph1":"A student is called home from university to find his life turned upside down. He had the world at his feet, but now everything has changed. Who can be trusted? Who can be believed?",
                "Paragraph2":"Sent by the ghost of his father to avenge his brutal death, Hamlet's mission to expose the truth is a perilous journey of madness, murder and lost love. What will ultimately become of a young man sent to kill?"
            },
            "Published":1599.0,
            "Genre":"Drama",
            "Author":{
                "Name":"William Shakespeare",
                "Bio":"William Shakespeare was a renowned English poet, playwright, and actor born in 1564 in Stratford-upon-Avon. His birthday is most commonly celebrated on 23 April, which is also believed to be the date he died in 1616. Shakespeare was a prolific writer during the Elizabethan and Jacobean ages of British theatre (sometimes called the English Renaissance or the Early Modern Period). Shakespeare's plays are perhaps his most enduring legacy, but they are not all he wrote. Shakespeare's poems also remain popular to this day.",
                "Birth":1564.0,
                "Death":1616.0
            },
            "ImagePath":"https://m.media-amazon.com/images/I/513mu30Xy7L._AC_SY780_.jpg"
          }
        ],
      selectedBook: null
    };
  }

  setSelectedBook(newSelectedBook) {
    this.setState({ selectedBook: newSelectedBook });
  }

  render() {
    const { books, selectedBook } = this.state;

    if (books.length === 0) {
      return <div>The list is empty</div>
    } else {
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
}

export default App;