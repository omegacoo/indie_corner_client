import React from 'react';

import './MainLanding.css';

export default class MainLanding extends React.Component {

    render(){
        return(
            <div className='MainLanding'>
                <h2 className='MainLanding-title'>
                    Welcome to THE forum for the Indie Gaming Community!
                </h2>

                <button className='MainLanding-login-button'>
                    Log in
                </button>

                <button className='MainLanding-register-button'>
                    Register
                </button>

                <button className='MainLanding-anonymous-button'>
                    Go Anonymous
                </button>
            </div>
        );
    };
};