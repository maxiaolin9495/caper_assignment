import HttpService from "./HttpService";
const config = require ('../config');

export default class BookService {
    constructor() {
    }

    static baseURL = () => config.backendUri;

    static createBook(book) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${this.baseURL()}/book/book`, book,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject('Error while retrieving tutors');
                    }
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static updateBook(book) {
        return new Promise((resolve, reject) => {
            console.log(book);
            HttpService.put(`${this.baseURL()}/book/${book._id}`, book,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }
    static deleteBook(book) {
        console.log(book._id);
        return new Promise((resolve, reject) => {
            HttpService.remove(`${this.baseURL()}/book/${book._id}`,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static deleteBook(book) {
        console.log(book._id);
        return new Promise((resolve, reject) => {
            HttpService.remove(`${this.baseURL()}/book/${book._id}`,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }
    static deleteBooks(books) {
        console.log(books._ids.length);
        return new Promise((resolve, reject) => {
            HttpService.post(`${this.baseURL()}/book/deleteBooks`, books,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static getAllBooks() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/book/getAllBooks`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject('Error while retrieving tutors and courses');
                    }
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }
}
