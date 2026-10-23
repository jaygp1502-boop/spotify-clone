import React from 'react';
import useAuth from '../context/useAuth';
import Login from './Login';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Login />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
