const express = require('express');
const path = require('path');
const app = express();
const fetchBooks = require('../helpers/googleBooks');
app.use('/client', express.static('./client/dist'));

app.use(express.json());

let port = 8080;

app.get('/fetch', (req, res) => {
  fetchBooks((err, data) => {
    if (err) {
      res.statusCode = 404;
      res.send(JSON.stringify(err));
    } else {
      res.statusCode = 200;
      res.send(JSON.stringify(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})