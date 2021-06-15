import MD5 from "react-native-md5";
import HttpService from './HttpService';
const config = require ('../config');

function baseURL() {
    return config.backendUri + "/user/register";
}

export function register(email, pass, userType) {
    return new Promise((resolve, reject) => {
        HttpService.post(baseURL(), {
            email: email,
            password: MD5.hex_md5(pass),
            userType: userType

        }, function (data) {
            resolve(data);
        }, function (textStatus) {
            reject(textStatus);
        });
    });
}
