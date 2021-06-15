import {getToken} from "./LoginService";

export default class UserService {


    static getCurrentUser() {
        let token = getToken();
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            email: JSON.parse(window.atob(base64)).email,
            userType: JSON.parse(window.atob(base64)).userType
        };
    }

}
