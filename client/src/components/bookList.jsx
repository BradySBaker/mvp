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
///home/bsbaker/hackreactor/rpp2210-mvp/client/src/components/no-image.png
const BookList = (props) => {
  var id = 0;
  var columns = [];
  var bookArr = [];
  props.books.forEach((curBook, idx) => {
    id++;
    bookArr.push(<Book key={id} book={curBook} saveBook={props.saveBook}/>);
    if ((idx+1) % 4 === 0) {
      columns.push(<div key={id} className="column">{bookArr}</div>);
      bookArr = [];
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