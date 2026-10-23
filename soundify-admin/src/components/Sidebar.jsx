import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import useAuth from '../context/useAuth';

const Sidebar = () => {
    const { admin, logout } = useAuth();

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-2.5 p-2 pr-[max(8vw,10px)] text-sm font-medium border transition-colors ${
            isActive
                ? 'bg-[#1db954] text-white font-semibold border-black shadow'
                : 'text-gray-800 bg-white border-black hover:bg-gray-100'
        }`;

    return (
        <div className="bg-sidebar min-h-screen w-50 p-6 sm:p-10 text-white flex flex-col justify-between">
            <div>
                <img src={assets.logo} className='mt-2 sm:mt-5 w-[max(10vw,100px)] hidden sm:block' alt="Soundify" />
                <img src={assets.logo_small} className='mt-2 sm:mt-5 w-[max(5vw,40px)] mr-5 block sm:hidden' alt="Soundify" />

                <div className='flex flex-col gap-5 mt-10'>
                    <NavLink to='/add-song' className={navLinkClass}>
                        <img src={assets.add_song} className='w-5' alt="" />
                        <p className='hidden sm:block'>Add Song</p>
                    </NavLink>

                    <NavLink to='/list-song' className={navLinkClass}>
                        <img src={assets.song_icon} className='w-5' alt="" />
                        <p className='hidden sm:block'>List Song</p>
                    </NavLink>

                    <NavLink to='/add-album' className={navLinkClass}>
                        <img src={assets.add_album} className='w-5' alt="" />
                        <p className='hidden sm:block'>Add Album</p>
                    </NavLink>

                    <NavLink to='/list-album' className={navLinkClass}>
                        <img src={assets.album_icon} className='w-5' alt="" />
                        <p className='hidden sm:block'>List Album</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
