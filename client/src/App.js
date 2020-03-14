import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTodo from "./components/todos/create-todo.component";
import EditTodo from "./components/todos/edit-todo.component";
import TodosList from "./components/todos/todos-list.component";
import Navbar from "./components/layout/navbar.component";
import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";

import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/set-auth-token";
import { setCurrentUser, logoutUser } from "./redux/actions/auth.actions";

import PrivateRoute from "./components/private-route";
import Dashboard from "./components/dashboard/";
const kaka = require("./components/dashboard/dashboard");

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Route path="/kaka" exact component={kaka} />
            <Route path="/" component={Navbar} />
            <br />
            <Route path="/login" exact component={Login} />

            <Route path="/register" exact component={Register} />
            <Route path="/todos" exact component={TodosList} />
            <Route path="/todos/edit/:id" component={EditTodo} />
            <Route path="/todos/create" component={CreateTodo} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;