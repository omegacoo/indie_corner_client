import React from 'react';
import config from '../../config';

import StoreContext from '../../StoreContext';

import './Register.css';

export default class Register extends React.Component {
    static contextType = StoreContext;

    state = {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
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

    handleConfirmPasswordChange = e => {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    handleEmailChange = e => {
        this.setState({
            email: e.target.value
        })
    }

    handleRegisterSubmit = e => {
        e.preventDefault();
        
        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                error: 'passwords must match'
            });
            return false
        } else if(this.state.username.length < 3){
            this.setState({
                error: 'username must be at least 3 characters'
            });
            return false
        } else if(this.state.password.length < 8){
            this.setState({
                error: 'password must be at least 8 characters'
            });
            return false
        } else if(!this.isValidEmail(this.state.email)){
            this.setState({
                error: 'please enter a valid email address'
            });
            return false
        };
        
        const myBody = {
            user_name: this.state.username.toLowerCase(),
            password: this.state.password,
            email: this.state.email.toLowerCase()
        };

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(myBody),
            headers: myHeaders
        };

        fetch(config.API_ENDPOINT + '/api/register', fetchOptions)
            .then(res => {
                if(res.ok){
                    this.props.history.push('/');
                };
                res = res.json()
                    .then(resJson => {
                        if(!res.ok){
                            throw new Error(resJson.error.message)   
                        };
                    })
                    .catch(err => {
                        if(err.message === 'Username or email is already in use'){
                            this.setState({
                                error: err.message
                            });
                        };
                    })
            })
    }

    isValidEmail(email){
        return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/.test(email);
    };

    render(){
        return(
            <div className='registerContainer'>
                <span className='popup'>
                    <button
                        onClick={ this.props.handleClose }
                        className='closeRegister'
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
                        <label htmlFor='register_confirm_password'>confirm password: </label>
                        <input
                            value={this.state.confirmPassword}
                            onChange={this.handleConfirmPasswordChange}
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
        );
    };
};