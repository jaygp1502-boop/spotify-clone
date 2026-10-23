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
                {admin?.role && (
                    <span className='hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#003A10] text-[#1db954] border border-[#1db954]/40 uppercase tracking-wider'>
                        {admin.role}
                    </span>
                )}
            </div>

            {admin && (
                <div className='flex items-center gap-3 sm:gap-5'>
                    {/* Admin identity chip */}
                    <div className='flex items-center gap-2.5 bg-[#1e1e1e] border border-gray-700/70 rounded-full py-1.5 px-3 sm:px-4'>
                        <div className='w-7 h-7 rounded-full bg-[#1db954] text-black font-bold flex items-center justify-center text-xs'>
                            {admin.name ? admin.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className='flex flex-col text-left'>
                            <span className='text-xs font-medium text-white leading-tight'>
                                {admin.name || admin.username}
                            </span>
                            <span className='text-[10px] text-gray-400 font-mono leading-none'>
                                @{admin.username}
                            </span>
                        </div>
                    </div>

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
