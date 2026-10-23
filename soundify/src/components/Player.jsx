import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {
  const {
    track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong,
    isShuffling, setIsShuffling, isLooping, setIsLooping
  } = useContext(PlayerContext);

  if (!track) return null;

  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      {/* Left: Track info */}
      <div className='hidden lg:flex items-center gap-4 w-[25%]'>
        <img className='w-12 h-12 rounded object-cover' src={track.image} alt="" />
        <div>
          <p className='text-sm font-medium truncate max-w-[150px]'>{track.name}</p>
          <p className='text-xs text-[#a7a7a7] truncate max-w-[150px]'>{track.desc ? track.desc.slice(0, 20) : ""}</p>
        </div>
      </div>

      {/* Centre: Controls + Seek */}
      <div className='flex flex-col items-center gap-1 flex-1'>
        <div className='flex gap-5 items-center'>
          {/* Shuffle */}
          <button
            onClick={() => setIsShuffling(s => !s)}
            className={`transition-opacity ${isShuffling ? 'opacity-100' : 'opacity-50 hover:opacity-75'} relative`}
            title='Shuffle'
          >
            <img className='w-4' src={assets.shuffle_icon} alt="Shuffle" />
            {isShuffling && (
              <span className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-500'></span>
            )}
          </button>

          <img onClick={previous} className='w-4 cursor-pointer opacity-75 hover:opacity-100 transition' src={assets.prev_icon} alt="Previous" />

          {!playStatus ? (
            <img onClick={play} className='w-8 cursor-pointer hover:scale-105 transition' src={assets.play_icon} alt="Play" />
          ) : (
            <img onClick={pause} className='w-8 cursor-pointer hover:scale-105 transition' src={assets.pause_icon} alt="Pause" />
          )}

          <img onClick={next} className='w-4 cursor-pointer opacity-75 hover:opacity-100 transition' src={assets.next_icon} alt="Next" />

          {/* Loop */}
          <button
            onClick={() => setIsLooping(l => !l)}
            className={`transition-opacity ${isLooping ? 'opacity-100' : 'opacity-50 hover:opacity-75'} relative`}
            title='Loop'
          >
            <img className='w-4' src={assets.loop_icon} alt="Loop" />
            {isLooping && (
              <span className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-500'></span>
            )}
          </button>
        </div>

        {/* Seek bar */}
        <div className='flex items-center gap-3 w-full max-w-[500px]'>
          <p className='text-xs text-[#a7a7a7] w-8 text-right'>
            {time.currentTime.minute}:{String(time.currentTime.second).padStart(2, '0')}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className='flex-1 bg-[#3a3a3a] rounded-full cursor-pointer h-1 hover:h-1.5 transition-all group'
          >
            <div
              ref={seekBar}
              className='h-full border-none w-0 bg-white group-hover:bg-green-500 rounded-full transition-colors'
            />
          </div>
          <p className='text-xs text-[#a7a7a7] w-8'>
            {time.totalTime.minute}:{String(time.totalTime.second).padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Player