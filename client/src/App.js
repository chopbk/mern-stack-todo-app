import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTodo from "./components/todos/create-todo.component";
import EditTodo from "./components/todos/edit-todo.component";
import TodosList from "./components/todos/todos-list.component";
import Navbar from "./components/layout/navbar.component";
import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route path="/" component={Navbar} />
          <br />

          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/todos" exact component={TodosList} />
          <Route path="/todos/edit/:id" component={EditTodo} />
          <Route path="/todos/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;