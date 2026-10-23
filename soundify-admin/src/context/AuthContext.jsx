import React, { createContext, useState, useMemo } from 'react';
import { getAdminCredentials } from '../utils/authConfig';

const AuthContext = createContext(null);

const SESSION_STORAGE_KEY = 'soundify_admin_session';

const getInitialSession = () => {
    try {
        const stored = localStorage.getItem(SESSION_STORAGE_KEY);
        if (!stored) return null;
        const parsed = JSON.parse(stored);
        const adminConfig = getAdminCredentials();

        if (adminConfig && adminConfig.username === parsed.username) {
            return {
                id: adminConfig.id,
                username: adminConfig.username,
                name: adminConfig.name,
                role: adminConfig.role,
                token: parsed.token || `token_${Date.now()}`,
                loginTime: parsed.loginTime || new Date().toISOString(),
            };
        }
        localStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(getInitialSession);

    const login = (username, password) => {
        const adminConfig = getAdminCredentials();

        if (
            adminConfig &&
            adminConfig.username === (username || '').trim() &&
            adminConfig.password === (password || '').trim()
        ) {
            const sessionData = {
                id: adminConfig.id,
                username: adminConfig.username,
                name: adminConfig.name,
                role: adminConfig.role,
                token: `admin_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
                loginTime: new Date().toISOString(),
            };

            try {
                localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
            } catch {
                // Ignore storage errors
            }
            setAdmin(sessionData);
            return { success: true, admin: sessionData };
        }

        return { success: false, message: 'Invalid username or password.' };
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