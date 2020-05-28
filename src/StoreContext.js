import React from 'react';

const StoreContext = React.createContext({
    loggedIn: Boolean,
    currentForum: 1,
    currentUser: 'anonymous',
    userId: Number,
    forums: [],
    handleLogin: () => {},
    handleLogout: () => {},
    handleForumSelect: () => {},
    fetchForums: () => {},
});

export default StoreContext;