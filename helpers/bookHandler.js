database = require('../database/index');

var saveBook = (book, cb) => {
	database.find({title: book.title}, (err, data) => {
		if (err) {
			cb(err);
		} else {
			if (data.length === 0) {
				database.create(book, (err) => {
					if (err) {
						cb(err);
					} else {
						cb(null);
					}
				});
			} else {
				console.log('Already in database!');
				cb(null);
			}
		}
	});
};

var fetchBooks = (cb) => {
	database.find({}, (err, data) => {
		if (err) {
			cb(err, null);
		} else {
			cb(null, data)
		}
	})
}

var deleteBook = (book, cb) => {
	database.deleteBook(book.title, (err) => {
		if (err) {
			cb(err);
		} else {
			cb(null);
		}
	});
}

module.exports.saveBook = saveBook;
module.exports.fetchBooks = fetchBooks;
module.exports.deleteBook = deleteBook;