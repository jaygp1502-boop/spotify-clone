import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { url } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddAlbum = () => {
    const [image, setImage] = useState(false)
    const [colour, setColour] = useState('#000000')
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('desc', description)
            formData.append('image', image)
            formData.append('bgColour', colour)

            const response = await axios.post(`${url}/api/album/add`, formData)
            if (response.data.success) {
                toast.success(response.data.message)
                setDescription(""); setName(""); setImage(false); setColour("#000000")
            } else {
                toast.error('Something went wrong')
            }
        } catch {
            toast.error("Error Occurred")
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <div className='grid place-items-center min-h-[80vh]'>
                <p>Creating album...</p>
            </div>
        )
    }

    const inputClass = 'border-2 border-gray-400 bg-transparent px-4 py-3 w-full max-w-xl outline-none placeholder:text-gray-400'

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-8 text-gray-700'>

            <div className='flex flex-col gap-3'>
                <p>Upload Image</p>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
                <label
                    htmlFor="image"
                    className='flex flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-100 cursor-pointer overflow-hidden'
                    style={{ width: 120, height: 120 }}
                >
                    {image
                        ? <img src={URL.createObjectURL(image)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        : <>
                            <img src={assets.upload_area} style={{ width: 32 }} alt="" />
                            <span className='text-sm text-gray-500'>Upload</span>
                        </>
                    }
                </label>
            </div>

            <div className='flex flex-col gap-3'>
                <p>Album name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Type here' required className={inputClass} />
            </div>

            <div className='flex flex-col gap-3'>
                <p>Album description</p>
                <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='Type here' required className={inputClass} />
            </div>

            <div className='flex flex-col gap-3'>
                <p>Background Colour</p>
                <input onChange={(e) => setColour(e.target.value)} value={colour} type="color" style={{ width: 60, height: 30 }} className='cursor-pointer' />
            </div>

            <button type='submit' className='bg-black text-white py-3 w-44'>
                ADD
            </button>
        </form>
    )
}

export default AddAlbum