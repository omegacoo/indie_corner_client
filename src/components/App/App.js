import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header/Header';
import MainLanding from '../MainLanding/MainLanding';
import StoreContext from '../../StoreContext';

import './App.css';

export default class App extends React.Component {

    render(){
        let contextValue = {};
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
                </StoreContext.Provider>
            </div>
        );
    };
};