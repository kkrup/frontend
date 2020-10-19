import React, {Component} from 'react';

export default class Home extends Component {
    render() {
        if (localStorage.accessToken) {
            return (
                <h2>Hi {localStorage.username}</h2>
            )
        } else {
            return (
                <h2>You are not logged in</h2>
            )
        }
    }
}
