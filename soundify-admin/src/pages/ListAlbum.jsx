import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { toast } from 'react-toastify'

// Image | Name | Description | Album Colour | Action  (same proportions as the screenshot)
// Inline style so the columns always work, even if Tailwind skips the class.
const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '0.5fr 1fr 2fr 1fr 0.6fr',
    alignItems: 'center',
    gap: '12px',
    padding: '0 16px',
}

const ListAlbum = () => {
    const [data, setData] = useState([])

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`)
            if (response.data.success) setData(response.data.albums)
        } catch {
            toast.error("Error fetching albums")
        }
    }

    const removeAlbum = async (id) => {
        try {
            const response = await axios.post(`${url}/api/album/remove`, { id })
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchAlbums()
            }
        } catch {
            toast.error("Error removing album")
        }
    }

    useEffect(() => { fetchAlbums() }, [])

    return (
        <div>
            <p className='mb-6'>All Albums List</p>

            <div className='border border-gray-300'>
                <div style={rowStyle} className='py-3 bg-gray-100 border-b border-gray-300 text-black'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Colour</b>
                    <b>Action</b>
                </div>

                {data.map((item, index) => (
                    <div key={index} style={rowStyle} className='py-4 border-b border-gray-300 last:border-b-0'>
                        <img src={item.image} style={{ width: 60, height: 60, objectFit: 'cover' }} alt="" />
                        <p>{item.name}</p>
                        <p>{item.desc}</p>
                        <input type="color" value={item.bgColour} readOnly style={{ width: 60, height: 30 }} />
                        <p onClick={() => removeAlbum(item._id)} className='cursor-pointer'>x</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListAlbum