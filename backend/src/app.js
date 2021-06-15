const bodyParser = require('body-parser');
const config = require('./config.js');
const express = require('express');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/api-definitions/api.yaml');
const mongoose = require('mongoose');
const middleWares = require('./middleWares');
const customer = require('./routes/customerRoute');
const book = require('./routes/bookRoute');
const admin = require('./routes/adminRoute');
const user = require('./routes/userRoute');
const bookModel = require('./models/bookModel');

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./src/sample_books')
});

async function injectDefaultBooks(){
    let index = 0;
    lineReader.on('line', function (line) {
        let oldBook = JSON.parse(line);
        let newBook = {
            title: oldBook.title,
            isbn: oldBook.isbn?oldBook.isbn:index++,
            authors: oldBook.authors,
            description: oldBook.shortDescription?oldBook.shortDescription:oldBook.longDescription
        }
        bookModel.findOne({title: oldBook.title}).exec().then(
            book => {
                if(book === null){
                    bookModel.create(newBook).then().catch(error => {
                        console.log(error);
                    })
                }
            }
        )

    });
}



const app = express();

/**
 * Connect to the database
 */

mongoose.connect(config.mongoURI, { useNewUrlParser: true });

mongoose.connection
    .once('open', () => {
        console.log('Connected');
        injectDefaultBooks().then();
    })
    .on('error', (error) => {
        console.log('Your Error', error);

    });
/**
 * Middleware
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());
app.use(middleWares.allowCrossDomain);

// Basic route
app.get('/', (req, res) => {
    res.json({
        name: 'Mock Backend'
    });
});

// API routes=
app.use('/user', user);
app.use('/book', book);
app.use('/admin', admin);
app.use('/customer', customer);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

/**
 * Register the routes
 */

module.exports = app;
