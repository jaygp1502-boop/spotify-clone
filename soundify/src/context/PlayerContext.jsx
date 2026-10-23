import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
import { songsData as localSongsData, albumsData as localAlbumsData } from '../assets/assets';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = import.meta.env.VITE_BACKEND_URL || 'https://spotify-clone-p6ik.onrender.com';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayerStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const [isShuffling, setIsShuffling] = useState(false);
    const [isLooping, setIsLooping] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState({ songs: [], albums: [] });
    const [isSearching, setIsSearching] = useState(false);

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
        const selected = songsData.find(
           (item) =>
               (item._id && item._id === id) ||
               (item.id !== undefined && item.id === id)
        );
        if (selected) {
            setTrack(selected);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().then(() => setPlayerStatus(true)).catch((e) => console.log(e));
                }
            }, 100);
        }
    }

    const previous = async () => {
        if (!track) return;
        const index = songsData.findIndex(
           (item) =>
               (item._id && track._id && item._id === track._id) ||
               (item.id !== undefined &&
                   track.id !== undefined &&
                   item.id === track.id)
        );
        if (index > 0) {
            setTrack(songsData[index - 1]);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().then(() => setPlayerStatus(true)).catch((e) => console.log(e));
                }
            }, 100);
        }
    }

       const next = async () => {
       if (!track || songsData.length === 0) return;

       const index = songsData.findIndex(
           (item) =>
               (item._id && track._id && item._id === track._id) ||
               (item.id !== undefined &&
                   track.id !== undefined &&
                   item.id === track.id)
       );

       if (index === -1) return;

       // Repeat the current song
       if (isLooping) {
           if (audioRef.current) {
               audioRef.current.currentTime = 0;
               audioRef.current.play()
                   .then(() => setPlayerStatus(true))
                   .catch((e) => console.log(e));
           }
           return;
       }

       let nextTrack;

       // Shuffle: choose a random song other than the current one
       if (isShuffling) {
           const otherIndexes = songsData
               .map((_, i) => i)
               .filter((i) => i !== index);

           if (otherIndexes.length === 0) return;

           const randomIndex =
               otherIndexes[Math.floor(Math.random() * otherIndexes.length)];

           nextTrack = songsData[randomIndex];
       } else if (index < songsData.length - 1) {
           // Normal playback: play the next song
           nextTrack = songsData[index + 1];
       }

       if (nextTrack) {
           setTrack(nextTrack);

           setTimeout(() => {
               if (audioRef.current) {
                   audioRef.current.play()
                       .then(() => setPlayerStatus(true))
                       .catch((e) => console.log(e));
               }
           }, 100);
       }
   };

    const seekSong = async (e) => {
        if (audioRef.current && audioRef.current.duration) {
            audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
        }
    }

    const searchAll = async (query) => {
        setSearchQuery(query);
        const term = (query || "").trim().toLowerCase();

        if (!term) {
            setSearchResults({ songs: songsData, albums: albumsData });
            return;
        }

        setIsSearching(true);
        try {
            const response = await axios.get(`${url}/api/search?q=${encodeURIComponent(term)}`);
            if (response.data && response.data.success) {
                setSearchResults({
                    songs: response.data.songs || [],
                    albums: response.data.albums || []
                });
                setIsSearching(false);
                return;
            }
        } catch (error) {
            console.log("Backend search endpoint error, filtering local dataset:", error);
        }

        // Filter against current active dataset
        const matchedSongs = songsData.filter((s) =>
            (s.name && s.name.toLowerCase().includes(term)) ||
            (s.desc && s.desc.toLowerCase().includes(term)) ||
            (s.album && s.album.toLowerCase().includes(term))
        );
        const matchedAlbums = albumsData.filter((a) =>
            (a.name && a.name.toLowerCase().includes(term)) ||
            (a.desc && a.desc.toLowerCase().includes(term))
        );
        setSearchResults({ songs: matchedSongs, albums: matchedAlbums });
        setIsSearching(false);
    }

    const getSongsData = async () => {
        try {
            console.log("Calling song API...");
            const response = await axios.get(`${url}/api/song/list`);
            if (response.data.songs && response.data.songs.length > 0) {
                setSongsData(response.data.songs);
                setTrack(response.data.songs[0]);
            } else {
                setSongsData(localSongsData);
                setTrack(localSongsData[0]);
            }
        } catch (error) {
            console.error("SONG FETCH ERROR, using local dataset:", error.message);
            setSongsData(localSongsData);
            setTrack(localSongsData[0]);
        }
    };

    const getAlbumsData = async () => {
        try {
            console.log("Calling album API...");
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.albums && response.data.albums.length > 0) {
                setAlbumsData(response.data.albums);
            } else {
                setAlbumsData(localAlbumsData);
            }
        } catch (error) {
            console.error("ALBUM FETCH ERROR, using local dataset:", error.message);
            setAlbumsData(localAlbumsData);
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

        audioRef.current.onended = () => {
            next();
        };
    }, [track, isLooping, isShuffling]);

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    useEffect(() => {
        if (!searchQuery) {
            setSearchResults({ songs: songsData, albums: albumsData });
        }
    }, [songsData, albumsData]);

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
        albumsData,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        isSearching,
        searchAll,
        url,
        isShuffling,
        setIsShuffling,
        isLooping,
        setIsLooping,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;