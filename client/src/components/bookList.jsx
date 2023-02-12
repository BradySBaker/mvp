import React from 'react';
import Book from './book.jsx';

const BookList = (props) => {
  var id = 0;
  var columns = [];
  var bookArr = [];
  props.books.forEach((curBook, idx) => {
    id++;
    bookArr.push(<Book key={id} deleteSaved={props.deleteSaved} favorite={props.favorite} book={curBook} saveBook={props.saveBook}/>);
    if ((idx+1) % 4 === 0) {
      columns.push(<div key={id} className="column">{bookArr}</div>);
      bookArr = [];
    }
    if (idx === props.books.length - 1 && bookArr.length !== 0) {
      columns.push(<div key={id} className="column">{bookArr}</div>);
    }
  });
  return (
    <div id="books">
      <img src=''></img>
      <h3>Books</h3>
      {columns}
    </div>
  )
}

export default BookList