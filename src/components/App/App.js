import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header/Header';
import MainLanding from '../MainLanding/MainLanding';
import Forums from '../Forums/Forums';
import Posts from '../Posts/Posts';
import StoreContext from '../../StoreContext';

import './App.css';

export default class App extends React.Component {
    state = {
        loggedIn: false,
        userName: '',
        userId: null,
        currentForum: 1,
        currentUser: 'anonymous'
    };

    handleLogin = (userName, userId) => {
        userId = parseInt(userId);

        this.setState({
            loggedIn: true,
            userName,
            userId
        });
    }

    handleLogout = () => {
        let cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        };

        this.setState({
            loggedIn: false,
            userName: '',
            userId: null
        });
    }

    handleForumSelect = id => {
        this.setState({
            currentForum: id
        });
    }

    render(){
        let contextValue = {
            loggedIn: this.state.loggedIn,
            currentForum: this.state.currentForum,
            currentUser: this.state.currentUser,
            handleLogin: this.handleLogin,
            handleLogout: this.handleLogout,
            handleForumSelect: this.handleForumSelect
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
                    <Route 
                        path={'/posts'}
                        component={Posts}
                    />
                </StoreContext.Provider>
            </div>
        );
    };
};