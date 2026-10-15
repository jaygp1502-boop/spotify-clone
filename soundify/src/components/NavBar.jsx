import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { searchQuery, searchAll } = useContext(PlayerContext);

    return (
        <div className='w-full mb-4'>
            <div className='w-full flex justify-between items-center font-semibold gap-3'>
                <div className='flex items-center gap-2'>
                    <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-[#1a1a1a] transition' src={assets.arrow_left} alt="Back" />
                    <img onClick={() => navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-[#1a1a1a] transition' src={assets.arrow_right} alt="Forward" />
                </div>

                {/* Search Bar in Navbar */}
                <div 
                    onClick={() => {
                        if (location.pathname !== '/search') navigate('/search');
                    }}
                    className='flex items-center gap-3 bg-[#242424] hover:bg-[#2a2a2a] px-3.5 py-1.5 rounded-full flex-1 max-w-sm cursor-pointer border border-transparent focus-within:border-white transition'
                >
                    <img className='w-4 opacity-75' src={assets.search_icon} alt="Search" />
                    <input 
                        type="text" 
                        placeholder="What do you want to play?"
                        value={searchQuery}
                        onChange={(e) => {
                            searchAll(e.target.value);
                            if (location.pathname !== '/search') {
                                navigate('/search');
                            }
                        }}
                        className='bg-transparent text-sm text-white outline-none w-full placeholder:text-[#a7a7a7]'
                    />
                    {searchQuery && (
                        <button 
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                searchAll('');
                            }}
                            className='text-xs text-[#a7a7a7] hover:text-white px-1'
                            title="Clear"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className='flex items-center gap-4'>
                    <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-[#1a1a1a] transition hidden sm:block'>Install App</p>
                    <p className='bg-purple-500 w-7 h-7 text-black rounded-full flex items-center justify-center font-bold'>J</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar