import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { url } from '../App'
import { toast } from 'react-toastify'

const AddSong = () => {
    const [image, setImage] = useState(false)
    const [song, setSong] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [album, setAlbum] = useState("none")
    const [loading, setLoading] = useState(false)
    const [albumData, setAlbumData] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('desc', description)
            formData.append('image', image)
            formData.append('audio', song)
            formData.append('album', album)

            const response = await axios.post(`${url}/api/song/add`, formData)
            if (response.data.success) {
                toast.success("Song added successfully!")
                setName(""); setDescription(""); setAlbum("none")
                setImage(false); setSong(false)
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            toast.error("Error occurred")
        }
        setLoading(false)
    }

    const loadAlbumData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`)
            if (response.data.success) setAlbumData(response.data.albums)
            else toast.error("Unable to load albums")
        } catch { toast.error("Error loading albums") }
    }

    useEffect(() => { loadAlbumData() }, [])

    if (loading) {
        return (
            <div className='bg-black min-h-screen grid place-items-center'>
                <p className='text-gray-400'>Uploading...</p>
            </div>
        )
    }

    const boxClass = 'flex flex-col items-center justify-center w-30 h-30 border border-dashed border-gray-600 bg-neutral-900 cursor-pointer overflow-hidden'
    const inputClass = 'bg-black border-2 border-gray-500 text-white px-4 py-3 w-full max-w-xl outline-none focus:border-white placeholder:text-gray-500'

    return (
        <form onSubmit={onSubmitHandler} className='bg-black min-h-screen text-gray-300 flex flex-col gap-8 p-8 text-white'>

            <div className='flex gap-8'>
                <div className='flex flex-col gap-3'>
                    <p>Upload song</p>
                    <input onChange={(e) => setSong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden />
                    <label htmlFor="song" className={boxClass} style={{ width: 120, height: 120 }}>
                        <img src={assets.upload_song} className='w-8 opacity-60' alt="" />
                        <span className='text-sm text-gray-400 mt-1 px-1 truncate max-w-full'>
                            {song ? song.name : 'Upload'}
                        </span>
                    </label>
                </div>

                <div className='flex flex-col gap-3'>
                    <p>Upload Image</p>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
                    <label htmlFor="image" className={boxClass} style={{ width: 120, height: 120 }}>
                        {image
                            ? <img src={URL.createObjectURL(image)} className='w-full h-full object-cover' alt="" />
                            : <>
                                <img src={assets.upload_area} className='w-8 opacity-60' alt="" />
                                <span className='text-sm text-gray-400 mt-1'>Upload</span>
                            </>
                        }
                    </label>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <p>Song name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Type here' required className={inputClass} />
            </div>

            <div className='flex flex-col gap-3'>
                <p>Song description</p>
                <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='Type here' required className={inputClass} />
            </div>

            <div className='flex flex-col gap-3'>
                <p>Album</p>
                <select onChange={(e) => setAlbum(e.target.value)} value={album} className='bg-black border-2 border-gray-500 text-white px-4 py-3 w-44 outline-none focus:border-white'>
                    <option value="none">None</option>
                    {albumData.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>

            <button type='submit' className='bg-white text-black w-44 py-3 hover:bg-gray-200'>
                ADD
            </button>
        </form>
    )
}

export default AddSong