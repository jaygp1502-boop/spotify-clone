export const getAdminCredentials = () => {
    const env = import.meta.env || {};

    const username = env.VITE_ADMIN_USERNAME;
    const password = env.VITE_ADMIN_PASSWORD;

    if (!username || !password) return null;

    return {
        id: 'admin',
        username,
        password,
        name: env.VITE_ADMIN_NAME || 'Admin',
        role: env.VITE_ADMIN_ROLE || 'Admin',
    };
};