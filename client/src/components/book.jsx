import React, {useState} from 'react';
// var bookDescBackground = require('./bookDescBackground.png');

const Book = (props) => {
  var starStartStyle = {}
  var deleteStyle = {'visibility': 'hidden'};
  if (props.favorite) {
    starStartStyle = {'visibility': 'hidden'};
    deleteStyle = {'visibility': 'visible'};
  }

  const [bookDetails, setBookDetails] = useState(<div></div>);
  const [starStyle, setStarStyle] = useState(starStartStyle);

  //Deal with author rendering
  var authors = 'No author info';
  var authorsExpanded = 'No author info';
  if (props.book.authors) {
    authorsExpanded = '';
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

  var setStarColor = () => {
    setStarStyle({'color': 'gold'});
  }

  var expandDetails = () => {
    var bookDesc = props.book.description;
    setBookDetails(
      <div className='expanded-book-details' onMouseLeave={hideDetails}>
        <ul>
        <li className='descriptors'><u>Title</u></li>
        <div>{props.book.title}</div>
        <li className='descriptors'><u>Author</u></li>
        <div>{authorsExpanded}</div>
        <li className='descriptors'><u>Description</u></li>
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
      expandButton = <button className='expand-button' onClick={expandDetails} onMouseLeave={hideDetails} onMouseEnter={showDetails}>Expand</button>
    } else if (props.book.authors && props.book.authors.length > 5) {
      expandButton = <button className='expand-button' onMouseEnter={showDetails} onMouseLeave={hideDetails} onClick={expandDetails}>Expand</button>
    }

    setBookDetails(
    [<div className='book-details'>
      <ul>
      <li className='descriptors'><u>Title</u></li>
        <div>{props.book.title}</div>
        <li className='descriptors'><u>Author</u></li>
        <div>{authors}</div>
        <li className='descriptors'><u>Description</u></li>
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

  var bookImage = <img className='book-img' src={props.book['img-url']} onMouseEnter={showDetails} onMouseLeave={hideDetails}></img>;
  if (!props.book['img-url']) {
    bookImage = <div className='missing-img' onMouseEnter={showDetails} onMouseLeave={hideDetails}>Title <div>{props.book.title}</div></div>;
  }

  return (
    <div className="book">
      {bookImage}
      <a href={props.book['buy-url']} target="_blank">Purchase</a>
      <div className='star' style={starStyle} onClick={() => {props.saveBook(props.book); setStarColor()}}>&#9733;</div>
      <div className='delete' style={deleteStyle} onClick={() => {props.deleteSaved(props.book)}}>delete</div>
      {bookDetails}
    </div>
  )
}

export default Book;