var axios = require('axios');
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

//Fetches a certain ammount of books from google api
var limitedRandomBookFetch = (cb, ammount = 4) => {
  var randomSearchQuery = randomizeSearch();
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${randomSearchQuery}&maxResults=${ammount}&printType=books&key=${config.TOKEN}`)
  .then((res) => {
    if (!res.data.items || res.data.items.length === 0) {
      cb({err: 'No data found!'}, randomSearchQuery);
      console.log('no Data!');
      return;
    }
    cb(null, res.data.items);
    return;
  })
  .catch((err) => {
    console.log('===========> Error in googleBooks.js!!!', err);
    cb(err, randomSearchQuery);
  });
};

var organizeBookData = (allBooksInfo) => {
    var booksInfo = [];
    //Seperate out needed info
    allBooksInfo.forEach((curBookInfo) => {
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
    return booksInfo;
};

var getBooks = (cb) => {
  let promises = [];
  for (let i = 1; i <= 5; i++) {
    var promise = new Promise((resolve, reject) => {
      limitedRandomBookFetch((err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(organizeBookData(data));
        }
      });
    });
    promises.push(promise);
  }
  Promise.all(promises)
  .then((data) => {
    var books = [];
    data.forEach((curBookList) => {
      books = books.concat(curBookList);
    })
    cb(null, books);
  })
  .catch((err) => {
    cb(err, null);
  })
};

module.exports = getBooks;