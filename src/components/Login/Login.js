import React from 'react';

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
        
        this.context.handleLogin(this.state.username, this.state.password);
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