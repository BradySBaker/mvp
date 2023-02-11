import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import BookList from './components/bookList.jsx';

var App = () => {
	const [books, setBooks] = useState([]);

	var update = (bookData) => {
		console.log('updated');
		setBooks(bookData);
	}

	var fetch = () => {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: '/favorite',
			success: (data) => {update(data)},
			error: (err) => {console.log(err)}
		});
	};

	const deleteSaved = (book) => {
		$.ajax({
			type:'DELETE',
			contentType: "application/json",
			data: JSON.stringify(book),
			url: '/favorite',
			success: fetch,
			error: () => {console.log('failed!')}
		});
  };

	  //Run once on startup
		useEffect(fetch, []);

	return (
	<div>
		<h1>Book Roulette</h1>
		<a id='nav-button' href='/client'>View Home</a>
		<h3>Find all your saved reads here... Page empty? Do some randomized searches and click on the star to store them here!</h3>
		<h2>Saved Reads</h2>
		<BookList deleteSaved={deleteSaved} books={books} favorite={true}/>
	</div>
	)
}

ReactDOM.render(<App />, document.getElementById('app'));

