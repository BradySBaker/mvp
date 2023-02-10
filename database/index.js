const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/book-fetcher');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  'img-url': String,
  'buy-url': String
});

const Book = mongoose.model('Book', bookSchema);

// Book.deleteMany({}, () => {
//   console.log('Cleared Database');
// });

let create = (book, cb) => {
  var newBook = new Book({
    title: book.title,
    authors: book.authors,
    description: book.description,
    'img-url': book['img-url'],
    'buy-url': book['buy-url']
  });

  newBook.save((err) => {
    if (err) {
    cb(err);
  } else {
      console.log(`${book.title} saved to database!`);
    }
  });
};

let find = (options, cb) => {
  Book.find(options, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  })
};

module.exports.create = create;
module.exports.find = find;