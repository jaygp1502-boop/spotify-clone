import React, { createContext, useState, useMemo } from 'react';
import axios from 'axios';
import { url } from '../App';

const AuthContext = createContext(null);

const SESSION_STORAGE_KEY = 'soundify_admin_session';

const getInitialSession = () => {
    try {
        const stored = localStorage.getItem(SESSION_STORAGE_KEY);
        if (!stored) return null;
        const parsed = JSON.parse(stored);

        if (parsed && parsed.username && parsed.token) {
            return parsed;
        }
        localStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(getInitialSession);

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${url}/api/admin/login`, {
                username: (username || '').trim(),
                password: (password || '').trim(),
            });

            if (response.data && response.data.success) {
                const sessionData = response.data.admin;
                try {
                    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
                } catch {
                    // Ignore storage errors
                }
                setAdmin(sessionData);
                return { success: true, admin: sessionData };
            } else {
                return {
                    success: false,
                    message: response.data?.message || 'Invalid username or password.',
                };
            }
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    'Unable to connect to server. Please try again.',
            };
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem(SESSION_STORAGE_KEY);
        } catch {
            // Ignore storage errors
        }
        setAdmin(null);
        return { success: true };
    };

    const value = useMemo(
        () => ({
            admin,
            isAuthenticated: Boolean(admin),
            login,
            logout,
        }),
        [admin]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
