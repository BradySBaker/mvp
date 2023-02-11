const express = require('express');
const path = require('path');
const app = express();
const getBooks = require('../helpers/googleBooks');
const bookHandler = require('../helpers/bookHandler');

app.use('/client', express.static('./client/dist'));

app.use(express.json());

let port = 8080;

app.get('/fetch', (req, res) => {
  getBooks((err, data) => {
    if (err) {
      res.statusCode = 404;
      res.send(JSON.stringify(err));
    } else {
      res.statusCode = 200;
      res.send(JSON.stringify(data));
    }
  });
});

app.post('/favorite', (req, res) => {
  bookHandler.saveBook(req.body, (err) => {
    if (err) {
      res.statusCode = 404;
      res.end();
    } else {
      res.statusCode = 201;
      res.send(JSON.stringify(req.body));
    }
  });
});

app.get('/favorite', (req, res) => {
  bookHandler.fetchBooks((err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end();
    } else {
      res.statusCode = 200;
      res.send(JSON.stringify(data));
    }
  })
});

app.delete('/favorite' ,(req, res) => {
  bookHandler.deleteBook(req.body, (err) => {
    if (err) {
      res.statusCode = 404;
      res.end();
    } else {
      res.statusCode = 204;
      res.send(JSON.stringify(req.body));
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})