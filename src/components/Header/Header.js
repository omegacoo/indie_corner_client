import React from 'react';
import { Link } from 'react-router-dom';

import StoreContext from '../../StoreContext';

import './Header.css';

export default class Header extends React.Component {
    static contextType = StoreContext;

    handleLogout = () => {
        this.context.handleLogout();
    }

    render(){
        return(
            <div className='Header'>
                <Link 
                    className='Header-title'
                    to={'/'}
                >
                    Indie Corner
                </Link>
                { this.context.loggedIn ? <button className='logout-button' onClick={this.handleLogout}>logout</button> : null}
            </div>
        );
    };
};