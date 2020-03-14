/**
 * @file Combine all reducer to root reducer
  */
import { combineReducers } from "redux";
import authReducer from "./auth.reducers"
import errorReducer from "./error.reducers";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer
});