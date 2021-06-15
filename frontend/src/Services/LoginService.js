import MD5 from "react-native-md5";
import HttpService from './HttpService';
const config = require ('../config');

export function setToken (token){
    sessionStorage.setItem('mockToken', token);
}

export function getToken(){
    return sessionStorage.getItem('mockToken');
}

export function removeToken () {
    sessionStorage.removeItem('mockToken');
}

function baseURL() {
    return config.backendUri + "/user/login"
}

export function login(email, pass) {
    return new Promise((resolve, reject) => {
        let hashedPass = MD5.hex_md5(pass);
        HttpService.post(baseURL(), {
            email: email,
            password: hashedPass
        }, function(data){
            resolve(data);
        }, function (textStatus) {
            reject(textStatus);
        });
    });
}

export function logout(){
    removeToken();
}

export function isAuthenticated() {
    return getToken() !== undefined && getToken() !== null;
}
