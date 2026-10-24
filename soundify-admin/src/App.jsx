import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListSong from './pages/ListSong';
import AddSong from './pages/AddSong';
import ListAlbum from './pages/ListAlbum';
import AddAlbum from './pages/AddAlbum';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import useAuth from './context/useAuth';

export const url = import.meta.env.VITE_BACKEND_URL || 'https://spotify-clone-p6ik.onrender.com';

const AdminPanel = () => {
    const { isAuthenticated } = useAuth();

    // Authorization Guard: Require valid credentials before viewing site
    if (!isAuthenticated) {
        return <Login />;
    }

    return (
        <div className='flex items-start min-h-screen bg-[#121212] text-white'>
            <Sidebar />
            <div className='flex-1 h-screen overflow-y-scroll bg-[#121212]'>
                <Navbar />
                <div className='pt-8 pl-5 sm:pt-12 sm:pl-12 pr-5 sm:pr-12 pb-16'>
                    <Routes>
                        <Route path='/list-song' element={<ListSong />} />
                        <Route path='/add-song' element={<AddSong />} />
                        <Route path='/list-album' element={<ListAlbum />} />
                        <Route path='/add-album' element={<AddAlbum />} />
                        {/* Default route redirect */}
                        <Route path='/' element={<Navigate to='/list-song' replace />} />
                        {/* Fallback for undefined routes */}
                        <Route path='*' element={<Navigate to='/list-song' replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme='dark'
            />
            <AdminPanel />
        </AuthProvider>
    );
};

export default App;
