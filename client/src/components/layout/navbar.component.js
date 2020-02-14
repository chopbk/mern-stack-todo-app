import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../../logo.png";
class Navbar extends Component {
    render() {

        const isLoggedIn = false;
        var notLogginView = (
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/login" className="nav-link">Đăng nhập</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/register" className="nav-link">Đăng ký</Link>
                </li>
            </ul>)
        var logginView = (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/profiles" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {"User"}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/logout">Dang Xuat</a>
                    <a className="dropdown-item" href="/#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/#">Something else here</a>
                </div>
            </li>)
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="https://github.com/chopbk" target="_blank" rel="noopener noreferrer">
                    <img src={logo} width="30" height="30" alt="github.com/chopbk" />
                </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collpase navbar-collapse" id="navbarSupportedContent">
                    <Link to="/" className="navbar-brand">Trang Chủ</Link>
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/todos" className="nav-link">Công việc</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/todos/create" className="nav-link">Tạo công việc</Link>
                        </li>
                        {isLoggedIn ? (logginView) : (notLogginView)}
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Tìm kiếm" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Tìm Kiếm</button>
                    </form>
                </div>
            </nav>

        );
    }
}

export default Navbar;
