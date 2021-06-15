"use strict";

import HttpService from './HttpService';
const config = require('../config');

export default class EditProfileService {

    constructor() {
    }

    static baseURL = () => config.backendUri;

    static updateCustomerProfile(profile) {
        profile = {
            ...profile,
            userType: 'customer'
        };
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/customer/CustomerProfile`, profile,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static getCustomerProfile() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/customer/customerProfile`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject('Error while retrieving customer profile');
                    }
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static getCustomerByCustomerEmail(email) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/customer/searchCustomerByEmail?` + new URLSearchParams({q: email}).toString(),
                function (data) {
                    if (data !== undefined) {
                        resolve(data);
                    } else {
                        reject('Error while retrieving customers');
                    }
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static updateAdminProfile(profile) {
        profile = {
            ...profile,
            userType: 'admin'
        };
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/admin/adminProfile`, profile,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static getAdminProfile() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/admin/adminProfile`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject('Error while retrieving tutor profile');
                    }
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }
}
