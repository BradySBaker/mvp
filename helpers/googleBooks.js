var axios = require('axios');
var database = require('../database/index');
var randomizeSearch = require('./randomizeSearch');
var config = require('../config');
/*
curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "X-goog-api-key: API_KEY" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d @request.json \
    "https://translation.googleapis.com/language/translate/v2"
*/
//https://www.googleapis.com/books/v1/volumes?q=search+terms

var fetchBooks = () => {
  var randomSearchQuery = randomizeSearch();
  var randomSearchQuery = 'hunger+games'
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${randomSearchQuery}&key=${config.TOKEN}`)
  .then((res) => {
    var booksInfo = res.data.items;
    var bookOne = booksInfo[0].volumeInfo;
    console.log(bookOne);
  });

};

module.exports = fetchBooks;