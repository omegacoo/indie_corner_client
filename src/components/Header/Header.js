import React from 'react';
import { Link } from 'react-router-dom';

import StoreContext from '../../StoreContext';

import './Header.css';

export default class Header extends React.Component {
    static contextType = StoreContext;

    handleLogout = () => {
        this.context.handleLogout();
    }

    renderWelcome = () => {
        let user = this.context.userName;

        if(user === 'anonymous'){
            return(
                <div className='Header-welcome'>
                    Not currently logged in
                </div>
            );
        }

        return(
            <div className='Header-welcome'>
                Welcome back, {user}!
            </div>
        )
    }

    render(){
        return(
            <>
                { this.renderWelcome() }
                <div className='Header'>
                    <Link 
                        className='Header-title'
                        to={'/'}
                    >
                        <h1>Indie Corner</h1>
                    </Link>
                    { this.context.loggedIn ? <button className='logout-button' onClick={this.handleLogout}>logout</button> : null}
                </div>
            </>
        );
    };
};