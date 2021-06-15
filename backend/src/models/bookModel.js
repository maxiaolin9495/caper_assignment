"use strict";
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authors: [
        {
            type: String,
        }
    ],
    isbn: {
        type: String,
        required: false,
        unique: true,
    },
    description: {
        type: String
    }
});


BookSchema.index({ title: "text", author: "text"});
module.exports = mongoose.model('books', BookSchema);
