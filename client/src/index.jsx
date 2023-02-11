import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import BookList from './components/bookList.jsx';

const App = () => {
  const [bookIconStyle, setBookIconStyle] = useState({'backgroundImage': 'url("closed-book.png")'});
  const [books, setBooks] = useState([]);
  const [loadIconStyle, setLoadIconStyle] = useState({'visibility': 'hidden'});
  const update = (data) => {
    setLoadIconStyle({'visibility': 'hidden'});
    setBooks(data);
  }

  const toggleBookIcon = (open) => {
    if (open) {
      setBookIconStyle({'backgroundImage': 'url("open-book.png")'});
    } else {
      setBookIconStyle({'backgroundImage': 'url("closed-book.png")'})
    }
  }

  const fetch = () => {
    setLoadIconStyle({'visibility': 'visible'})
    $.ajax({
      type: 'GET',
      url: '/fetch',
      dataType: 'json',
      success: (data) => {console.log('success!'); update(data)},
      error: (err) => {console.log(err)}
    });
  }


  const saveBook = (bookInfo) => {
    $.ajax({
      type: 'POST',
      url: '/favorite',
      contentType: "application/json",
      data: JSON.stringify(bookInfo),
      success: () => {console.log('Saved!')},
      error: () => {console.log('Error saving book!')}
    });
  }

  return (
    <div>
      <h1>Book Roulette</h1>
      <a id='nav-button' href='/client/favorite.html'>View Saved</a>
      <div id='loading' style={loadIconStyle}></div>
      <h3>To get started simply click on the discover button</h3>
      <div id='book-icon' style={bookIconStyle}></div>
      <button id='random-button' onClick={fetch} onMouseEnter={() => toggleBookIcon(true)} onMouseLeave = {() => toggleBookIcon(false)}>DISCOVER</button>
      <BookList books={books} saveBook={saveBook}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
//