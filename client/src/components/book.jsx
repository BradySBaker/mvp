import React, {useState} from 'react';
// var bookDescBackground = require('./bookDescBackground.png');

const Book = (props) => {
  var bookImage = <img className='book-img' src={props.book['img-url']}></img>;
  if (!props.book['img-url']) {
    bookImage = <div className='book-img'>Title: {props.book.title}</div>;
  }

  const [bookDetails, setBookDetails] = useState(<div></div>);

  //Deal with author rendering
  var authors = 'No author info';
  var authorsExpanded = 'No author info';
  if (props.book.authors) {
    authors = ''
    props.book.authors.forEach((curAuthor, idx) => {
      if (idx !== props.book.authors.length - 1) {
        if (idx+1 < 5) {
          authors += `${curAuthor}, `;
        } else if (idx+1 === 5) {
          authors += curAuthor + '...';
        }
        authorsExpanded += `${curAuthor}, `;
      } else {
        authorsExpanded += curAuthor
        if (idx+1 <= 5) {
          authors += curAuthor;
        }
      }
    });
  }

  var expandDetails = () => {
    var bookDesc = props.book.description;
    setBookDetails(
      <div className='expanded-book-details'>
        <ul>
        <li><u>Title</u></li>
        <div>{props.book.title}</div>
        <li><u>Author</u></li>
        <div>{authorsExpanded}</div>
        <li><u>Description</u></li>
        <div>{bookDesc}</div>
        </ul>
      </div>
    )
  }

  var showDetails = () => {
    //Work with description
    var bookDesc = props.book.description
    if (!bookDesc) {
      bookDesc = 'No description...';
    }
    var expandButton = <div></div>
    if (bookDesc && bookDesc.length > 500) {
      bookDesc = props.book.description.slice(0, 500) + '...';
      expandButton = <button className='expand-button' onClick={expandDetails}>Expand</button>
    } else if (props.book.authors && props.book.authors.length > 5) {
      expandButton = <button className='expand-button' onClick={expandDetails}>Expand</button>
    }

    setBookDetails(
    [<div className='book-details'>
      <ul>
      <li><u>Title</u></li>
        <div>{props.book.title}</div>
        <li><u>Author</u></li>
        <div>{authors}</div>
        <li><u>Description</u></li>
        <div>{bookDesc}</div>
      </ul>
    </div>,
    <div>
         {expandButton}
    </div>]
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