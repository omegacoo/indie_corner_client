import React from 'react';
import config from '../../config';

import StoreContext from '../../StoreContext';

import './Login.css';

export default class Login extends React.Component {
    static contextType = StoreContext;

    state = {
        username: '',
        password: ''
    }

    handleUsernameChange = e => {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange = e => {
        this.setState({
            password: e.target.value
        })
    }

    handleLoginSubmit = e => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const myBody = JSON.stringify({ "user_name": this.state.username, "password": this.state.password });

        fetch(config.API_ENDPOINT + '/api/auth/login',  { method: 'POST', body: myBody, headers: myHeaders })
            .then(res => {
                if(res.status === 401){
                    throw new Error('Incorrect user_name or password') 
                };
                this.setState({
                    error: null
                });
                
                const Xtoken = res.headers.get('X-token');
                const userId = res.headers.get('user_id');

                this.setState({
                    userId
                });
                
                document.cookie = `token=${Xtoken}`;
                                 
                return res.text()
            })
            .then(resText => {
                this.context.handleLogin(this.state.username, this.state.userId);
                this.props.history.push('/forums');
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
            })
    }

    render(){
        return(
            <div className='loginContainer'>
                <span className='popup'>
                    <button
                        onClick={ this.props.handleClose }
                        className='closeLogin'
                    >
                        X
                    </button>
                    <form 
                        className='login_form'
                        onSubmit={this.handleLoginSubmit}
                    >
                        <label htmlFor='login_username'>Username: </label>
                        <input 
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            type='text'
                            autoFocus
                        />
                        <label htmlFor='login_password'>Password: </label>
                        <input
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            type='password'
                        />
                        {this.state.error ? <h3 id='Login_error'>{this.state.error}</h3> : null}
                        <button className='login_button' type='submit'>login</button>
                    </form>
                </span>
            </div>
        );
    }
}