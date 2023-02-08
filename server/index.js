const express = require('express');
const path = require('path');
const app = express();

app.use('/client', express.static('./client/dist'));

app.use(express.json());

let port = 8080;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})