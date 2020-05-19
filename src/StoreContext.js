import React from 'react';

const StoreContext = React.createContext({
    loggedIn: Boolean,
    handleLogin: () => {},
    handleLogout: () => {},
});

export default StoreContext;