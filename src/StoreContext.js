import React from 'react';

const StoreContext = React.createContext({
    loggedIn: Boolean,
    currentForum: 1,
    currentUser: 'anonymous',
    handleLogin: () => {},
    handleLogout: () => {},
    handleForumSelect: () => {},
});

export default StoreContext;