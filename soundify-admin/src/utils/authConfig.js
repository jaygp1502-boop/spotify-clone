/**
 * Note: Admin authentication is now managed via the backend database API (/api/admin/login).
 * Credentials are no longer stored in or read from the frontend .env bundle.
 */
export const getAdminCredentials = () => {
    return null;
};

export default {
    getAdminCredentials,
};
