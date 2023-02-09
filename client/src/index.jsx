import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Randomize from './components/randomize.jsx';
import BookList from './components/bookList.jsx';

const App = () => {
  const [books, setBooks] = useState([]);

  const update = (data) => {
    console.log(data);
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


  return (
    <div>
      <h1>Book Roulette</h1>
      <h3>To get started simply start clicking on the randomize button</h3>
      <Randomize fetch={fetch}/>
      <BookList />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));