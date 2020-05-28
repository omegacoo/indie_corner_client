import React from 'react';
import { Link } from 'react-router-dom';

import Login from '../Login/Login';
import Register from '../Register/Register';
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
    }

    handleRegisterClick = () => {
        this.setState({
            registering: !this.state.registering
        });
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

                { this.state.loggingIn ? <Login handleClose={this.handleLoginClick} history={this.props.history} /> : null }
                { this.state.registering ? <Register handleClose={this.handleRegisterClick} history={this.props.history} /> : null }
            </div>
        );
    };
};