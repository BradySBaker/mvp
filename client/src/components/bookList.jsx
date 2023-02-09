import React from 'react';
import Book from './book.jsx';



/*
{
      props.books.map((curBook) => {
        id++;
        return <Book key={id} book={curBook}/>
      })
      }
 */

//<div><div><div/></div>

const BookList = (props) => {
  var id = 0;
  var columns = [];
  var bookArr = [];
  props.books.forEach((curBook, idx) => {
    id++;
    bookArr.push(<Book key={id} book={curBook}/>);
    if ((idx+1) % 4 === 0) {
      columns.push(<div class="column">{bookArr}</div>);
      bookArr = [];
    }
  });
  return (
    <div id="books">
      <h3>Books</h3>
      {columns};
    </div>
  )
}

export default BookList