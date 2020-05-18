import React from 'react';
import { Link } from 'react-router-dom';

import './MainLanding.css';

export default class MainLanding extends React.Component {
    state = {
        loggingIn: false,
        registering: false,
        error: null,
    }

    handleLoginClick = () => {
        this.setState({
            loggingIn: !this.state.loggingIn
        });
    }

    handleRegisterClick = () => {
        this.setState({
            registering: !this.state.registering
        });
    }

    renderLogin = () => {
        if(this.state.loggingIn){
            return(
                <div className='popupContainer'>
                    <span className='popup'>
                        <button
                            onClick={ this.handleLoginClick }
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
            )
        }
    }

    renderRegistration = () => {
        if(this.state.registering){
            return(
                <div className='popupContainer'>
                    <span className='popup'>
                        <button
                            onClick={ this.handleRegisterClick }
                        >
                            X
                        </button>
                        <form 
                            className='register_form'
                            onSubmit={this.handleRegisterSubmit}
                        >
                            <label htmlFor='register_username'>Username: </label>
                            <input 
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                type='text'
                                autoFocus
                            />
                            <label htmlFor='register_password'>Password: </label>
                            <input
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                type='password'
                            />
                            <label htmlFor='register_retype_password'>Retype password: </label>
                            <input
                                value={this.state.retypePassword}
                                onChange={this.handleRetypePasswordChange}
                                type='password'
                            />
                            <br />
                            
                            <label htmlFor='register_email'>Email: </label>
                            <input
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                type='email'
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

                <div 
                    className='MainLanding-register-button'
                    onClick={ this.handleRegisterClick }
                >
                    Register
                </div>

                <Link 
                    className='MainLanding-anonymous-button'
                    to={'/forums'}
                >
                    Go Anonymous
                </Link>

                { this.renderLogin() }
                { this.renderRegistration() }
            </div>
        );
    };
};