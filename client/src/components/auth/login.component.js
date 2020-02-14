import React, { Component } from "react";
import { Link } from "react-router-dom";
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <h3>Đăng nhập</h3>
                            <div className="form-group is-invalid" >
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input type="email"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={this.state.email}
                                    className="form-control"
                                    id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                {errors.email && <div className="alert alert-danger">
                                    {errors.email}
                                </div>}
                            </div>
                            <small className="invalid-feedback">
                                {errors.email}
                            </small>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                                <input type="password"
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    className="form-control" id="password" placeholder="Password" required />
                                {errors.password && <div className="alert alert-danger">
                                    {errors.password}
                                </div>}
                            </div>
                            {/*<div className="invalid-feedback">
                        {errors.password}
                    </div> */}
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Nhớ đăng nhập</label>
                            </div>
                            <br />
                            <button
                                type="submit" className="btn btn-google btn-primary">Đăng nhập</button>
                        </form>
                        <div className="d-flex justify-content-center links">Chưa có tài khỏan?
            <Link to="/register">Đăng ký</Link></div>
                        <div id="forgotHelp" className="d-flex justify-content-center">
                            <Link to="/forgotpass">Quên mật khẩu</Link></div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Login;