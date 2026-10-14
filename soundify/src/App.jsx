import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'

export const url = 'https://spotify-clone-p6ik.onrender.com';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      {songsData.length !== 0 && track ? (
        <>
          <div className='h-[90%] flex'>
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : (
        <div className='h-full flex items-center justify-center text-white'>
          <p>Loading...</p>
        </div>
      )}
      <audio ref={audioRef} src={track ? track.file : ""} preload='auto'></audio>
    </div>
  )
}

export default App