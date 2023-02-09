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

var fetchBooks = (cb) => {
  var randomSearchQuery = randomizeSearch();
  //Seperate into multiple querys!
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${randomSearchQuery}&maxResults=20&key=${config.TOKEN}`)
  .then((res) => {
    if (!res.data.items || res.data.items.length === 0) {
      cb({err: 'No data found!'}, null);
      return;
    }
    var booksAllInfo = res.data.items;
    var booksInfo = [];
    //Seperate out needed info
    booksAllInfo.forEach((curBookInfo) => {
      var bookInfo = {};
      bookInfo.title = curBookInfo.volumeInfo.title;
      bookInfo.authors = curBookInfo.volumeInfo.authors;
      bookInfo.description = curBookInfo.volumeInfo.description;
      var imageLinks = curBookInfo.volumeInfo.imageLinks;
      //If we have links for images
      if (imageLinks && imageLinks.thumbnail) {
        bookInfo['img-url'] = curBookInfo.volumeInfo.imageLinks.thumbnail;
      }
      if (curBookInfo.saleInfo && curBookInfo.saleInfo.buyLink) {
        bookInfo['buy-url'] = curBookInfo.saleInfo.buyLink;
      }
      booksInfo.push(bookInfo);
    });
    cb(null, booksInfo);
  })
  .catch((err) => {
    console.log('===========> Error in googleBooks.js!!!', err);
    cb(err, null);
  });

};

module.exports = fetchBooks;