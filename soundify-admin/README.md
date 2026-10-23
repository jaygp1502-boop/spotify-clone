# Soundify Admin Panel

Soundify Admin is a modern React + Vite dashboard for managing songs, albums, and content on the Soundify music streaming platform.

---

## 🔐 Authentication & Authorization

This admin panel includes complete authentication and authorization:
- **Authorization Guard**: Unauthenticated users are strictly barred from seeing or accessing any administrative views, routes, or controls.
- **Environment-based Credentials**: Two distinct admin accounts are configured directly via `.env`.
- **Role-based Identity**: Each admin has their own name, username, password, and role (`Super Admin`, `Admin`, etc.).
- **Session Persistence**: Active admin sessions are persisted across page refreshes via secure local session storage.
- **Logout Support**: Full sign-out functionality from both Navbar and Sidebar.

---

## 👥 Pre-Configured Administrator Accounts

The following credentials are configured in `.env` by default:

| Admin | Username | Password | Role | Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **Admin 1** | `admin1` | `admin1pass` | `Super Admin` | Full management access |
| **Admin 2** | `admin2` | `admin2pass` | `Content Manager` | Content management access |

> **Note**: You can customize these usernames, passwords, names, and roles anytime by editing `.env`.

---

## ⚙️ Environment Configuration (`.env`)

```env
# Administrator 1 (Super Admin)
VITE_ADMIN1_USERNAME=admin1
VITE_ADMIN1_PASSWORD=admin1pass
VITE_ADMIN1_NAME=Super Admin
VITE_ADMIN1_ROLE=Super Admin

# Administrator 2 (Content Manager / Admin)
VITE_ADMIN2_USERNAME=admin2
VITE_ADMIN2_PASSWORD=admin2pass
VITE_ADMIN2_NAME=Content Manager
VITE_ADMIN2_ROLE=Admin
```

*(Non-prefixed versions `ADMIN1_USERNAME`, etc., are also supported through Vite's `envPrefix` configuration).*

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Ensure `.env` exists in the `soundify-admin` root directory (a pre-configured `.env` and `.env.example` are provided).

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
soundify-admin/
├── .env                  # Admin 1 & Admin 2 credentials
├── .env.example          # Environment variables template
├── vite.config.js        # Vite config with envPrefix support
├── package.json
└── src/
    ├── App.jsx           # Protected application shell & routing
    ├── components/
    │   ├── Login.jsx     # Admin authentication login screen
    │   ├── Navbar.jsx    # Top navigation with admin identity & logout
    │   ├── Sidebar.jsx   # Sidebar navigation with active states & user status
    │   └── ProtectedRoute.jsx # Route authorization wrapper
    ├── context/
    │   ├── AuthContext.jsx # Authentication state & session management
    │   └── useAuth.js      # Custom React authentication hook
    ├── utils/
    │   └── authConfig.js   # Credential loader from .env
    └── pages/
        ├── AddSong.jsx   # Song creation
        ├── ListSong.jsx  # Songs list & management
        ├── AddAlbum.jsx  # Album creation
        └── ListAlbum.jsx # Albums list & management
```
