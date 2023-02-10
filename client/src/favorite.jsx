import React, {useState} from 'react';
import ReactDOM from 'react-dom';


var App = () => {
	return (
	<div>
		<h1>Book Roulette</h1>
		<a id='nav-button' href='/client'>View Home</a>
		<h3>Find all your saved reads here... Page empty? Do some randomized searches and click on the star to store them here!</h3>
	</div>
	)
}

ReactDOM.render(<App />, document.getElementById('app'));

