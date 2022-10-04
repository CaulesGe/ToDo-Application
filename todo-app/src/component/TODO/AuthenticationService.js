import axios from "axios";
import { API_URL } from "../../Constants";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password); 
        return axios.get('http://localhost:8080/basicauth', {headers: {authorization: basicAuthHeader}})
    }

    executeJwtAuthenticationService(username, password) {
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password); 
        return axios.post('http://localhost:8080/authenticate', {
            username,
            password
        })
    }

    registerSuccessfulLogin(username, password) {
        
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password); 
        console.log('registerSuccessfulLogin');
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(basicAuthHeader);
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user===null) {
            return false;
        } else {
            return true;    
        }
    }

    getLoggedInUserName () {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user===null) {
            return '';
        } else {
            return user;    
        }
    }

    setupAxiosInterceptors(token) {
        
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService(); 