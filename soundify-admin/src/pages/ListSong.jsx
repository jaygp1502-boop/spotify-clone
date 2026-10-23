import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { url } from '../App'
import { toast } from 'react-toastify'

// Image | Name | Album | Duration | Action  (same proportions as the screenshot)
// Inline style so the columns always work, even if Tailwind skips the class.
const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '0.5fr 1fr 2fr 1fr 0.6fr',
    alignItems: 'center',
    gap: '12px',
    padding: '0 16px',
}

const ListSong = () => {
    const [data, setData] = useState([])

    const fetchSong = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`)
            if (response.data.success) setData(response.data.songs)
        } catch {
            toast.error("Error fetching songs")
        }
    }

    const removeSong = async (id) => {
        try {
            const response = await axios.post(`${url}/api/song/remove`, { id })
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchSong()
            }
        } catch {
            toast.error("Error removing song")
        }
    }

    useEffect(() => { fetchSong() }, [])

    return (
        <div>
            <p className='mb-6'>All Songs List</p>

            <div className='border border-gray-300'>
                <div style={rowStyle} className='py-3 bg-gray-100 border-b border-gray-300 text-black'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Album</b>
                    <b>Duration</b>
                    <b>Action</b>
                </div>

                {data.map((item, index) => (
                    <div key={index} style={rowStyle} className='py-4 border-b border-gray-300 last:border-b-0'>
                        <img src={item.image} style={{ width: 60, height: 60, objectFit: 'cover' }} alt="" />
                        <p>{item.name}</p>
                        <p>{item.album}</p>
                        <p>{item.duration}</p>
                        <p onClick={() => removeSong(item._id)} className='cursor-pointer'>x</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListSong