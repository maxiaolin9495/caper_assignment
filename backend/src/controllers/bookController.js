const bookModel = require('../models/bookModel');
const requestBodyVerificationService = require('../Services/requestBodyVerificationService');

const addBook = (req, res) => {
    if(!verifyUserType(req)){
        return res.status(401).json('Not authorized user type')
    }
    let verificationResult = requestBodyVerificationService.verifyRequestBody(
        [
            "title",
            "authors",
            "isbn",
        ], req);

    if (!verificationResult.ifValid) {
        return res.status(400).json(verificationResult.message);
    }

    const book = Object.assign({
        title: req.body.title,
        authors: req.body.authors,
        isbn: req.body.isbn,
    });
    bookModel.findOne({isbn: req.body.isbn})
        .exec()
        .then(data => {
            if (data === null) {
                bookModel.create(book)
                    .then(
                        () => {
                            return res.status(200)
                                .json({
                                    message: "successfully added"
                                });
                        }
                    )
                    .catch(
                        error => {
                            console.log('error by adding a Book');
                            if (error.code === 11000) {
                                return res.status(400).json({
                                        error: 'Book exists',
                                        message: error.message
                                    }
                                )
                            } else {
                                return res.status(500).json({
                                    error: 'Internal server error happens by editing book',
                                    message: error.message
                                })
                            }
                        });
            } else {
                return res.status(400).json({
                    error: 'Duplicated Book',
                    message: 'A Book has already added with the same isbn'
                })
            }
        }).catch(error => {
        console.log('error by adding a book' + error.message);
    })

};

const editBook = (req, res) => {
    const {
        bookId,
    } = req.params;
    if (!bookId) {
        return res.status(400).json("Bad Request");
    }
    if(!verifyUserType(req)){
        return res.status(401).json('Not authorized user type')
    }
    let verificationResult = requestBodyVerificationService.verifyRequestBody(
        [
            "_id",
            "title",
            "authors",
            "isbn",
        ], req);

    if (!verificationResult.ifValid) {

        return res.status(400).json(verificationResult.message);

    }

    const book = Object.assign({
        title: req.body.title,
        authors: req.body.authors,
        isbn: req.body.isbn,
    });
    bookModel.updateOne({_id: bookId}, book)
        .exec()
        .then(
            () => {
                return res.status(200)
                    .json({
                        message: "successfully updated"
                    });
            }
        )
        .catch(
            error => {
                console.log('error by updating a Book');


                return res.status(500).json({
                    error: 'Internal server error happens by editing book',
                    message: error.message
                })
            });
};

const deleteBook = (req, res) => {
    if(!verifyUserType(req)){
        return res.status(401).json('Not authorized user type')
    }

    const {
        bookId,
    } = req.params;
    if (!bookId) {
        return res.status(400).json("Bad Request");
    }
    console.log(bookId);
    bookModel.deleteOne({_id: bookId})
        .exec()
        .then(data => {
        }).catch(error => {
        console.log('error by deleting book ' + error.message);
        return res.status(404).json({
            error: 'Book Not Found',
            message: error.message
        })
    })

};

const deleteBooks = (req, res) => {


    if(!verifyUserType(req)){
        return res.status(401).json('Not authorized user type')
    }
    let verificationResult = requestBodyVerificationService.verifyRequestBody(
        [
            "_ids",
        ], req);

    if (!verificationResult.ifValid) {

        return res.status(400).json(verificationResult.message);

    }
    bookModel.deleteMany({_id: [...req.body._ids]})
        .exec()
        .then( ()=> {
            return res.status(200).json({
                message: "successfully deleted"
            });
        }).catch(error => {
        console.log('error by deleting book ' + error.message);
        return res.status(404).json({
            error: 'Book Not Found',
            message: error.message
        })
    })

};

const getAllBooks = (req, res) => {
    if(!verifyUserType(req)){
        return res.status(401).json('Not authorized user type')
    }

    bookModel.find({})
        .exec()
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
        console.log('error by deleting book ' + error.message);
        return res.status(404).json({
            error: 'Book Not Found',
            message: error.message
        })
    })

};

const searchBook = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.query, 'q'))
        return res.status(200).json({
            error: 'Bad Request',
            message: 'The request query must contain a q property'
        });
    if (!req.query.q)
        return res.status(200).json({});

    const queryString = decodeURI(req.query.q);
    bookModel.find(
        { $text: { $search: queryString } }
    ).then(books => {
        return res.status(200).json(books);
    }).catch(error => {
        console.log('internal server error by searching');
        return res.status(400).json({
            error: 'Internal Server Error',
            message: 'Error in Search function: ' + error.message
        });
    })
};

const autoCompleteForSearch = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.query, 'q'))
        return res.status(200).json({
            error: 'Bad Request',
            message: 'The request query must contain a q property'
        });

    const queryString = req.query.q;
    const pattern = new RegExp(`${queryString}`, 'i');

    Promise.all([
        bookModel.distinct('title'),
        bookModel.find(
            { $or: [{ 'title': pattern }, { 'authors': pattern }] },
            { title: true, authors: true, _id: false }
        )
    ]).then((values) => {
        let titles = new Set();
        values[0].map((title) => {
            if (pattern.test(title) && !titles.has(title)) {
                titles.add(title);
            }
        }, []);
        let authors = new Set();
        values[1].map((authorsInArray) => {
            authorsInArray.authors.map(
                (author) => {
                    if(pattern.test(author) && !authors.has(author))
                    authors.add(author);
                }
            )
        }, []);
        return res.status(200).json([
            ...titles,
            ...authors
        ]);
    }).catch((error) => {
        console.log(error.message);
        console.log('internal server error by auto complete function for searching');
        return res.status(400).json({
            error: 'Internal Server Error',
            message: 'Error in auto complete function: ' + error.message
        });
    })
};

const verifyUserType = (req) =>{
    if(req.userType !== 'admin'){
        return false;
    }
    return true;
}

module.exports = {
    addBook,
    autoCompleteForSearch,
    deleteBooks,
    editBook,
    getAllBooks,
    searchBook,
};
