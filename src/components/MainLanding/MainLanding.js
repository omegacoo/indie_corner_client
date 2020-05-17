import React from 'react';
import { Link } from 'react-router-dom';

import './MainLanding.css';

export default class MainLanding extends React.Component {

    render(){
        return(
            <div className='MainLanding'>
                <h2 className='MainLanding-title'>
                    Welcome to THE forum for the Indie Gaming Community!
                </h2>

                <Link className='MainLanding-login-button'>
                    Log in
                </Link>

                <Link className='MainLanding-register-button'>
                    Register
                </Link>

                <Link className='MainLanding-anonymous-button'>
                    Go Anonymous
                </Link>
            </div>
        );
    };
};