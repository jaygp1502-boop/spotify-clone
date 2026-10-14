import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListSong = () => {

    const [data, setData] = useState([]);

    const featchSong = async () => {

        try {
            const response = await axios.get(`${url}/api/song/list`);
            if(response.data.success){
                setData(response.data.songs);
            }
        }
        catch (error) {
            toast.error("Error occured");
        }
    }

    const removeSong = async (id) => {
        try{
            const response = await axios.post(`${url}/api/song/remove`,{id});
            if(response.data.success){
                toast.success(response.data.message);
                await featchSong();
            }
        }catch(error){
            toast.error("Error occured");
        }

    }

    useEffect(() => {
        featchSong();
    },[])

    return (
        <div>
            <p>All Songs List</p>
            <br />
            <div>
                <div className='grid grid-cols-5 items-center gap-2 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Album</b>
                    <b>Duration</b>
                    <b>Action</b>
                </div>
                {data.map((item,index)=>{
                    return(
                        <div key={index} className='grid grid-cols-5 sm:grid-cols-5 items-center gap-2.5 p-3 border-gray-300 text-sm mr-5'>
                            <img src={item.image} className = 'w-12' alt="" />
                            <p>{item.name}</p>
                            <p>{item.album}</p>
                            <p>{item.duration}</p>
                            <p className='cursor-pointer' onClick={() => removeSong(item._id)}>x</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListSong