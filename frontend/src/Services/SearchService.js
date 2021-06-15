import HttpService from './HttpService';
const config = require('../config');

export default class SearchService {
    constructor() {
    }

    static baseURL = () => config.backendUri;

    static getBooksByKeyword(keyword) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/book/search?` + new URLSearchParams({q: keyword}).toString(),
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


    static autoCompleteKeyWords() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/book/autoComplete?` + new URLSearchParams({q: ''}).toString(),
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
