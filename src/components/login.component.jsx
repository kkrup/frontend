import React, { Component } from "react";
import {withRouter} from "react-router";


class Login extends Component {
    isDisabledButton;

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            errors: {
                username: false,
                password: false
            }
        };

        this.isDisabledButton = true;
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        event.preventDefault();

        const {name, value} = event.target;

        let errors = this.state.errors;

        switch (name) {
            case 'username':
                errors.username = value.length > 5;
                break;
            case 'password':
                errors.password = value.length >= 8;
                break;
            default:
                break;
        }

        this.setState(Object.assign(this.state, {errors, [name]: value}));
        this.isDisabledButton = !Object.values(errors).every(
            (val) => val
        );
    }

    render() {
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={this.isDisabledButton}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}


export default withRouter(Login);
