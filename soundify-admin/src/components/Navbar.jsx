import React from 'react';
import useAuth from '../context/useAuth';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { admin, logout } = useAuth();

    const handleLogout = () => {
        logout();
        toast.info('Signed out successfully.');
    };

    return (
        <div className='navbar w-full border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg flex items-center justify-between bg-[#121212] sticky top-0 z-20'>
            <div className='flex items-center gap-3'>
                <p className='font-semibold text-white tracking-wide'>Admin Panel</p>
            </div>

            {admin && (
                <div className='flex items-center gap-3 sm:gap-5'>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className='flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 hover:border-red-600 px-3.5 py-2 rounded-full transition duration-150 cursor-pointer'
                        title='Sign out of admin session'
                    >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                        </svg>
                        <span className='hidden sm:inline'>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
