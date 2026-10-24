import adminModel from '../models/adminModel.js';

/**
 * Ensures at least one default admin account exists in MongoDB.
 * Defaults to Adminuser / Adminpass if no admin exists yet.
 */
export const ensureAdminExists = async () => {
    try {
        const count = await adminModel.countDocuments();
        if (count === 0) {
            const defaultUsername = process.env.ADMIN_USERNAME || 'Adminuser';
            const defaultPassword = process.env.ADMIN_PASSWORD || 'Adminpass';
            const defaultName = process.env.ADMIN_NAME || 'Soundify Admin';
            const defaultRole = process.env.ADMIN_ROLE || 'Admin';

            await adminModel.create({
                username: defaultUsername,
                password: defaultPassword,
                name: defaultName,
                role: defaultRole,
            });
            console.log(`[Admin Setup] Initialized default admin account: ${defaultUsername}`);
        }
    } catch (error) {
        console.error('[Admin Setup] Error ensuring admin exists:', error.message);
    }
};

/**
 * Admin Login: validates username & password from database.
 */
export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.json({
                success: false,
                message: 'Please provide both username and password.',
            });
        }

        // Auto-initialize if database is empty
        await ensureAdminExists();

        // Case-insensitive username lookup
        const cleanUsername = username.trim();
        const admin = await adminModel.findOne({
            username: { $regex: new RegExp(`^${cleanUsername}$`, 'i') },
        });

        if (!admin) {
            return res.json({
                success: false,
                message: 'Invalid username or password.',
            });
        }

        // Compare password
        if (admin.password !== password.trim()) {
            return res.json({
                success: false,
                message: 'Invalid username or password.',
            });
        }

        const token = `adm_${admin._id}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        res.json({
            success: true,
            message: 'Login successful',
            admin: {
                id: admin._id,
                username: admin.username,
                name: admin.name || admin.username,
                role: admin.role || 'Admin',
                token,
                loginTime: new Date().toISOString(),
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message || 'Server error during login.',
        });
    }
};

/**
 * Check or verify admin status.
 */
export const verifyAdmin = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.json({ success: false, message: 'Username is required' });
        }

        const admin = await adminModel.findOne({
            username: { $regex: new RegExp(`^${username.trim()}$`, 'i') },
        });

        if (admin) {
            return res.json({
                success: true,
                admin: {
                    id: admin._id,
                    username: admin.username,
                    name: admin.name,
                    role: admin.role,
                },
            });
        }

        return res.json({ success: false, message: 'Admin not found.' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

/**
 * Update or register an admin credential in the database.
 */
export const createOrUpdateAdmin = async (req, res) => {
    try {
        const { username, password, name, role } = req.body;

        if (!username || !password) {
            return res.json({
                success: false,
                message: 'Username and password are required.',
            });
        }

        const cleanUsername = username.trim();
        let admin = await adminModel.findOne({
            username: { $regex: new RegExp(`^${cleanUsername}$`, 'i') },
        });

        if (admin) {
            admin.password = password.trim();
            if (name) admin.name = name.trim();
            if (role) admin.role = role.trim();
            await admin.save();
            return res.json({
                success: true,
                message: `Admin '${cleanUsername}' updated successfully.`,
                admin: {
                    id: admin._id,
                    username: admin.username,
                    name: admin.name,
                    role: admin.role,
                },
            });
        } else {
            admin = await adminModel.create({
                username: cleanUsername,
                password: password.trim(),
                name: name ? name.trim() : 'Soundify Admin',
                role: role ? role.trim() : 'Admin',
            });
            return res.json({
                success: true,
                message: `Admin '${cleanUsername}' created successfully.`,
                admin: {
                    id: admin._id,
                    username: admin.username,
                    name: admin.name,
                    role: admin.role,
                },
            });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
