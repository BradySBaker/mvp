import React, {useState} from 'react';
/*
    <div id="book">
      <h4>Title: {props.book.title}</h4>
      {props.book.authors.map((curAuthor) => {
        return <p>Author: {curAuthor}</p>
      })}
      <p>{props.book.description}</p>
    </div>
*/


const Book = (props) => {
  var bookImage = <img className='book-img' src={props.book['img-url']}></img>;
  if (!props.book['img-url']) {
    bookImage = <div className='book-img'>Title: {props.book.title}</div>;
  }

  const [bookDetails, setBookDetails] = useState(<div></div>);

  var showDetails = () => {
    setBookDetails(
    <div className='book-details'>
      <ul>
        <li>Title: {props.book.title}</li>
        <li>Author: {props.book.authors[0]}</li>
        <li>Description: {props.book.description}</li>
      </ul>
    </div>
    );
  };
  var hideDetails = () => {
    setBookDetails(<div></div>);
  };

  return (
    <div className="book" onMouseEnter={showDetails} onMouseLeave={hideDetails}>
      {bookImage}
      <a href={props.book['buy-url']} target="_blank">Purchase</a>
      <div className='star' onClick={() => {props.saveBook(props.book)}}>&#9733;</div>
      {bookDetails}
    </div>
  )
}

export default Book;