database = require('../database/index');

var saveBook = (book, cb) => {
	database.find(book.title, (err, data) => {
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

module.exports.saveBook = saveBook;