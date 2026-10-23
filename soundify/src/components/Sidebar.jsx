import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'

const Sidebar = () => {
    const navigator = useNavigate();
    const { albumsData } = useContext(PlayerContext);

    return (
        <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
            <div className="bg-black h-[15%] rounded flex flex-col justify-center gap-5">
                <div onClick={() => navigator('/')} className='flex items-center gap-3 pl-8 cursor-pointer hover:text-white transition'>
                    <img className='w-6' src={assets.home_icon} alt="Home" />
                    <p className='font-bold'>Home</p>
                </div>
                <div onClick={() => navigator('/search')} className='flex items-center gap-3 pl-8 cursor-pointer hover:text-white transition'>
                    <img className='w-6' src={assets.search_icon} alt="Search" />
                    <p className='font-bold'>Search</p>
                </div>
            </div>
            <div className='bg-[#121212] h-[85%] rounded flex flex-col'>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-8' src={assets.stack_icon} alt="" />
                        <p className='font-semibold'>Your Library</p>
                    </div>
                </div>
                <div className='px-2 py-1 overflow-y-auto flex-1 flex flex-col gap-1'>
                    {albumsData && albumsData.length > 0 ? (
                        albumsData.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => navigator(`/album/${item._id || item.id}`)}
                                className='flex items-center gap-3 p-2 rounded-lg hover:bg-[#242424] cursor-pointer transition'
                            >
                                <img className='w-11 h-11 rounded object-cover' src={item.image} alt={item.name} />
                                <div className='flex flex-col overflow-hidden'>
                                    <p className='font-semibold text-sm truncate text-white'>{item.name}</p>
                                    <p className='text-xs text-[#a7a7a7] truncate'>Album</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='p-4 text-xs text-gray-400'>
                            <p>No albums in library yet</p>
                        </div>
                    )}
                </div>
            </div>       
        </div>
    )
}

export default Sidebar