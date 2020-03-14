import axios from "axios";
import setAuthToken from "../../utils/set-auth-token";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

// register user 
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("http://localhost:4000/users/register", userData)
        .then(res => history.push("/login")) // re-direct to login on successful register
        // if have error, dispatch action GET_ERRORs
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token 
export const loginUser = userData => dispatch => {
    axios
        .post("http://localhost:4000/users/login", userData)
        .then(res => // if login success, save info to localStorage
        {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // set token to auth header for futures request
            setAuthToken(token);
            // decode token to get user data
            const decoded = jwt_decode(token);
            // set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}
// action function: Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
// action function: User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests 
    setAuthToken(false);
    // Set current user to empty object {} which set isAuthenticated to false 
    dispatch(setCurrentUser({}));
}