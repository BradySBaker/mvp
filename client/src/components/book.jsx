import React from 'react';

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
  return (
    <div class="book">
      <img src={props.book['img-url']}></img>
    </div>
  )
}

export default Book;