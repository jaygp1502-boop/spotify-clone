import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {url} from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {

    const [data, setData] = useState([]);
    const fetchAlbums = async () => {
        try{

            const response = await axios.get(`${url}/api/album/list`);

            if(response.data.success){
                setData(response.data.albums)
            }
        }catch(error){
            toast.error("Error Occured")
        }
    }        

    const removeAlbum = async(id) => {
        try{
            const response = await axios.post(`${url}/api/album/remove`,{id});

            if(response.data.success){
                toast.success(response.data.message);
                await fetchAlbums();
            }
        }catch(error){
            toast.error("Error Occur");
        }
    }

    useEffect(() => {
        fetchAlbums();
    },[])

    return (

        <div>
            <p>All Album List</p>
            <br />
            <div>
                <div className='grid grid-cols-5 items-center gap-2 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Colour</b>
                    <b>Action</b>
                </div>
                {data.map((item,index)=>{
                    return (
                        <div key={index} className='grid grid-cols-5 sm:grid-cols-5 items-center gap-2.5 p-3 border-gray-300 text-sm mr-5'>
                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input type="color" value={item.bgColour} />
                            <p onClick={() => removeAlbum(item._id)} className='cursor-pointer'>x</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListAlbum