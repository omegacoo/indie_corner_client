import React from 'react';
import { Link } from 'react-router-dom';

import './MainLanding.css';

export default class MainLanding extends React.Component {
    state = {
        loggingIn: false,
        error: null,
    }

    handleLoginClick = () => {
        console.log('login clicked!');
        this.setState({
            loggingIn: !this.state.loggingIn
        });
    }

    renderLogin = () => {
        if(this.state.loggingIn){
            return(
                <div className='popupContainer'>
                    <span className='popup'>
                        <i className='closePopup far fa-times-circle' />
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
            )
        }
    }

    render(){
        return(
            <div className='MainLanding'>
                <h2 className='MainLanding-title'>
                    Welcome to THE forum for the Indie Gaming Community!
                </h2>

                <div 
                    className='MainLanding-login-button'
                    onClick={ this.handleLoginClick }
                >
                    Log in
                </div>

                <Link 
                    className='MainLanding-register-button'
                    to={'/register'}
                >
                    Register
                </Link>

                <Link 
                    className='MainLanding-anonymous-button'
                    to={'/forums'}
                >
                    Go Anonymous
                </Link>

                { this.renderLogin() }
            </div>
        );
    };
};