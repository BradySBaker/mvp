import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import BookList from './components/bookList.jsx';

const App = () => {
  const [books, setBooks] = useState([]);
  const update = (data) => {
    setBooks(data);
  }

  const fetch = () => {
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
      <h3>To get started simply click on the randomize button</h3>
      <button id='random-button' onClick={fetch}>Randomize!</button>
      <BookList books={books} saveBook={saveBook}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));