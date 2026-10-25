import React, { useContext } from 'react'
import Navbar from './NavBar'
import SongItem from './SongItem'
import AlbumItem from './AlbumItem'
import { PlayerContext } from '../context/PlayerContext'
import { assets } from '../assets/assets'

const DisplaySearch = () => {
    const { 
        searchQuery, 
        searchResults, 
        isSearching, 
        playWithId,
        songsData,
        albumsData
    } = useContext(PlayerContext);

    const displaySongs = searchQuery.trim() ? searchResults.songs : songsData;
    const displayAlbums = searchQuery.trim() ? searchResults.albums : albumsData;
    const hasResults = displaySongs.length > 0 || displayAlbums.length > 0;

    return (
        <>
            <Navbar />

            {/* Search Feedback / State */}
            {isSearching && (
                <div className='py-6 text-gray-400'>
                    <p>Searching for "{searchQuery}"...</p>
                </div>
            )}

            {!isSearching && !hasResults && searchQuery.trim() && (
                <div className='py-12 flex flex-col items-center justify-center text-center'>
                    <img className='w-16 opacity-40 mb-4' src={assets.search_icon} alt="" />
                    <h2 className='text-2xl font-bold mb-2'>No results found for "{searchQuery}"</h2>
                    <p className='text-gray-400 max-w-md'>
                        Please check your spelling or try searching for another song or album title.
                    </p>
                </div>
            )}

            {/* Matching Songs */}
            {displaySongs && displaySongs.length > 0 && (
                <div className='mb-8'>
                    <h2 className='text-2xl font-bold my-4'>
                        {searchQuery.trim() ? `Songs (${displaySongs.length})` : 'Popular Songs'}
                    </h2>
                    <div className='flex flex-col gap-1'>
                        {displaySongs.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => playWithId(item._id)}
                                className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 px-4 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] rounded-lg cursor-pointer transition'
                            >
                                <div className='flex items-center text-white col-span-2 sm:col-span-1'>
                                    <b className='mr-4 text-[#a7a7a7] w-4 text-right'>{index + 1}</b>
                                    <img className='inline w-10 h-10 rounded mr-4 object-cover' src={item.image} alt={item.name} />
                                    <div className='flex flex-col overflow-hidden'>
                                        <p className='font-semibold truncate text-white'>{item.name}</p>
                                        <p className='text-xs text-[#a7a7a7] truncate'>{item.desc}</p>
                                    </div>
                                </div>
                                <p className='text-[15px] hidden sm:block truncate'>{item.album || 'Single'}</p>
                                <p className='text-[15px] hidden sm:block text-slate-400'>Available</p>
                                <p className='text-[15px] text-right sm:text-center'>{item.duration || '3:00'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Matching Albums */}
            {displayAlbums && displayAlbums.length > 0 && (
                <div className='mb-8'>
                    <h2 className='text-2xl font-bold my-4'>
                        {searchQuery.trim() ? `Albums (${displayAlbums.length})` : 'Albums'}
                    </h2>
                    <div className='flex overflow-auto gap-4 pb-2'>
                        {displayAlbums.map((item, index) => (
                            <AlbumItem 
                                key={index} 
                                name={item.name} 
                                desc={item.desc} 
                                id={item._id} 
                                image={item.image}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default DisplaySearch;
