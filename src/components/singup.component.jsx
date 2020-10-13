import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import {regExp} from "../validators/userForm";
import axios from "axios";


class SignUp extends Component {
    isDisabledButton;

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {
                username: false,
                email: false,
                password: false
            }
        };

        this.isDisabledButton = true;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        let validity = Object.values(this.state.errors).every(
            (val) => val
        );

        if (validity) {
            const body = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            };

            await axios.post("http://localhost:5000/API/user", body, )
                .then((r) => {
                        if (r.status === 200) {
                            this.props.history.push('/home')
                        }
                    }
                );
        } else {
            console.log(this.state.errors);
            console.log("Wrong!");
        }
    }

    handleChange(event) {
        event.preventDefault();

        const {name, value} = event.target;

        let errors = this.state.errors;

        switch (name) {
            case 'username':
                errors.username = value.length > 5;
                break;
            case 'email':
                errors.email = regExp.test(value);
                break;
            case 'password':
                errors.password = value.length >= 8;
                break;
            default:
                break;
        }

        this.setState(Object.assign(this.state, {errors, [name]: value}));
        this.isDisabledButton = !Object.values(this.state.errors).every(
            (val) => val
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input
                        name="email"
                        type="email"
                        className={!this.state.errors.email ? "is-invalid form-control" : "form-control"}
                        placeholder="Enter email"
                        onChange={this.handleChange}
                    />
                    {this.state.errors.email &&
                    <span style={{color: "red"}}>{this.state.errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        className={!this.state.errors.password ? "is-invalid form-control" : "form-control"}
                        placeholder="Enter password"
                        onChange={this.handleChange}
                    />
                    {this.state.errors.password &&
                    <span style={{color: "red"}}>{this.state.errors.password}</span>}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={this.isDisabledButton}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}

export default withRouter(SignUp);
