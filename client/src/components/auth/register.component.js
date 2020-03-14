import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/auth.actions";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    static getDerivedStateFromProps(nextProps, state) {
        console.log(nextProps.errors)
        if (nextProps.errors) {
            return {
                errors: nextProps.errors
            };
        }
    }
    onChange = e => {
        console.log(`target id: ${e.target.id}`);
        console.log(`target value: ${e.target.value}`);
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(newUser);
        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const { errors } = this.state;
        return (

            <div className="container">
                <br />
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">

                        <form onSubmit={this.onSubmit}>
                            <h3>Đăng ký</h3>
                            <div className="form-group">
                                <label htmlFor="name">Họ tên</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text" className="form-control" placeholder="Họ tên" />
                                {errors.name && <div className="alert alert-danger">
                                    {errors.name}
                                </div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className="form-control" placeholder="Nhập email" />
                                {errors.email && <div className="alert alert-danger">
                                    {errors.email}
                                </div>}
                            </div>
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label htmlFor="password">Mật khẩu</label>
                                    <input onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password" className="form-control" placeholder="Nhập mật khẩu" />
                                    {errors.password && <div className="alert alert-danger">
                                        {errors.password}
                                    </div>}
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="password2">Nhập lại mật khẩu</label>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password2}
                                        error={errors.password2}
                                        id="password2"
                                        type="password" className="form-control" placeholder="Nhập lại mật khẩu" />
                                    {errors.password2 && <div className="alert alert-danger">
                                        {errors.password2}
                                    </div>}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
                            <p className="forgot-password text-right">
                                Đã có tài khỏan? <a href="/login">Đăng nhập</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {
        registerUser
    })(withRouter(Register))

//export default Register;