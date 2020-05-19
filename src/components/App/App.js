import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header/Header';
import MainLanding from '../MainLanding/MainLanding';
import Forums from '../Forums/Forums';
import StoreContext from '../../StoreContext';

import './App.css';

export default class App extends React.Component {
    state = {
        loggedIn: false,
    };

    handleLogin = () => {
        this.setState({
            loggedIn: true
        });
    }

    handleLogout = () => {
        this.setState({
            loggedIn: false
        });
    }

    render(){
        let contextValue = {
            loggedIn: this.state.loggedIn,
            handleLogin: this.handleLogin,
            handleLogout: this.handleLogout
        };
        
        return(
            <div className='App'>
                <StoreContext.Provider value={contextValue}>
                    {/* HEADER COMPONENT */}
                    <Route 
                        component={Header}
                    />

                    {/* MAIN COMPONENT */}
                    <Route 
                        exact path={'/'}
                        component={MainLanding}
                    />
                    <Route 
                        path={'/forums'}
                        component={Forums}
                    />
                </StoreContext.Provider>
            </div>
        );
    };
};