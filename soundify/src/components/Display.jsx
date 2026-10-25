import React, { useRef, useEffect, useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import Displayalbum from './Displayalbum'
import DisplaySearch from './DisplaySearch'
import { PlayerContext } from '../context/PlayerContext'

const Display = () => {
    const { albumsData } = useContext(PlayerContext);

    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.split('/').pop() : "";

    const currentAlbum = isAlbum && albumsData.length > 0
    ? albumsData.find(
        (x) =>
            (x._id && x._id == albumId)
      )
    : null;

    const bgColor = currentAlbum
        ? (currentAlbum.bgColour || "#121212")
        : "#121212";

    useEffect(() => {
        if (isAlbum && currentAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
        }
        else {
            displayRef.current.style.background = `#121212`
        }
    }, [isAlbum, bgColor, currentAlbum])

    return (
        <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
            <Routes>
                <Route path='/' element={<DisplayHome />} />
                <Route path='/search' element={<DisplaySearch />} />
                <Route path='/album/:id' element={<Displayalbum album={currentAlbum} />} />
            </Routes>
        </div>
    )
}

export default Display