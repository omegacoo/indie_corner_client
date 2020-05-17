import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default class Header extends React.Component {

    render(){
        return(
            <div className='Header'>
                <Link 
                    className='Header-title'
                    to={'/'}
                >
                    Indie Corner
                </Link>
            </div>
        );
    };
};