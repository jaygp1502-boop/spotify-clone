import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios'

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = 'http://localhost:4000';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayerStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayerStatus(true);
        }
    }

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayerStatus(false);
        }
    }

    const playWithId = async (id) => {
        await songsData.map((item) => {
            if(id === item._id){
                setTrack(item);
            }
        })

        await audioRef.current.play();
        setPlayerStatus(true);
    }

    const previous = async () => {
        songsData.map(async (item,index) => {
            if(track._id === item._id && index > 0){
                await setTrack(songsData[index-1]);
                await audioRef.current.play();
                setPlayerStatus(true);
            }
        })
    }

    const next = async () => {
        songsData.map(async (item,index) => {
            if(track._id === item._id && index < songsData.length){
                await setTrack(songsData[index+1]);
                await audioRef.current.play();
                setPlayerStatus(true);
            }
        })
    }

    const seekSong = async (e) => {
        if (audioRef.current && audioRef.current.duration) {
            audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
        }
    }

    const getSongsData = async () => {
  try {
    console.log("Calling song API...");

    const response = await axios.get(`${url}/api/song/list`);

    console.log("Song API response:", response);
    console.log("Song API data:", response.data);
    console.log("Songs:", response.data.songs);

    if (response.data.songs && response.data.songs.length > 0) {
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    }

  } catch (error) {
    console.error("SONG FETCH ERROR:", error);
    console.error("Message:", error.message);
    console.error("Response:", error.response);
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
  }
};

    const getAlbumsData = async () => {
  try {
    console.log("Calling album API...");

    const response = await axios.get(`${url}/api/album/list`);

    console.log("Album API response:", response);
    console.log("Album API data:", response.data);

    if (response.data.albums) {
      setAlbumsData(response.data.albums);
    }

  } catch (error) {
    console.error("ALBUM FETCH ERROR:", error);
  }
};

    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.ontimeupdate = () => {
            const currentTime = audioRef.current.currentTime || 0;
            const duration = audioRef.current.duration || 0;

            if (duration > 0 && seekBar.current) {
                seekBar.current.style.width = Math.floor((currentTime / duration) * 100) + "%";
            }

            setTime({
                currentTime: {
                    second: Math.floor(currentTime % 60),
                    minute: Math.floor(currentTime / 60),
                },
                totalTime: {
                    second: Math.floor(duration % 60),
                    minute: Math.floor(duration / 60),
                }
            });
        };
    }, [track]);

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayerStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;