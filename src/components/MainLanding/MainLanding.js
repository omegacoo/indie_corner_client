import React from 'react';
import { Link } from 'react-router-dom';

import Login from '../Login/Login';
import StoreContext from '../../StoreContext';

import './MainLanding.css';

export default class MainLanding extends React.Component {
    static contextType = StoreContext;

    state = {
        loggingIn: false,
        registering: false,
        error: null
    }

    handleLoginClick = () => {
        this.setState({
            loggingIn: !this.state.loggingIn
        });
    }

    handleLoginSubmit = e => {
        e.preventDefault();
        
        this.context.handleLogin();
        this.props.history.push('/forums');
    }

    handleRegisterClick = () => {
        this.setState({
            registering: !this.state.registering
        });
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

                { this.state.loggingIn ? <Login handleClose={this.handleLoginClick} /> : null }
                { this.renderRegistration() }
            </div>
        );
    };
};