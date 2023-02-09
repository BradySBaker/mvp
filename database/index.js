const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/book-fetcher');

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  description: String
});

const Book = mongoose.model('Book', bookSchema);

let create = (book, cb) => {
  // var newBook = new Book({
  //   name: book.name,
  //   author: book.author,
  //   description: book.description
  // });

  // newBook.save((err) => {
  //   if (err) {
  //     cb(err);
  //   } else {
  //     console.log(`${book.name} saved to database!`);
  //   }
  // });
};

let find = () => {

};

module.exports.create = create();
module.exports.find = find();