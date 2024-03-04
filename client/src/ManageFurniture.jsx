import React, { useEffect, useState } from 'react'
import AdminNavigation from './AdminNavigation'
import axios from 'axios'
import Footer from './Footer'
import './ManageFurniture.css'
function ManageFurniture() {
    const [data,setData]=useState([])
    useEffect(()=>
    {
        axios.post('http://localhost:2000/api/furniture/viewAll-admin').then(response=>{
            const value = response.data.details
            setData(value)
        })
    },[])
    const approve= (id,uid)=>
    {
        const fid=id
        console.log('fid',fid,'uid',uid);
        axios.post(`http://localhost:2000/api/furniture/set-status/${fid}/${uid}`).then(response=>{
            console.log('status response',response.data.message);
            const filteredData= data.filter(item=>{
                return item._id!=id
            })
            setData(filteredData)
        }).catch(error=>{
            console.log(error);
        })
    }
    const remove = (id,uid)=>{
        axios.post(`http://localhost:2000/api/furniture/remove-product/${id}/${uid}`).then(response=>{
            console.log(response.data.message);
            const filteredData= data.filter(item=>{
                return item._id!=id
            })
            setData(filteredData)
        }).catch(error=>{
            console.log(error);
        })
    }
  return (
    <>
    <div>
        <AdminNavigation/>
    </div>
    <div>
        {
            data.map(item=>(
                <div className='furnitureCard'>
                   
                  <p> {item.name} </p>
                  <p> Type : {item.type}</p>
                  <p> Description :  {item.description}</p>
                  <p> Age:  {item.age}</p>
                  <p>Price:  {item.price}</p>
                  <img src= {`/image/${item.image}`} alt="img"  style={{width:'200px',height:'150px'}} />
                  <button className='btn' onClick={()=>{approve(item._id,item.user_id); console.log(item.user_id);}}>Approve</button>
                  <button className='btn' onClick={()=>{remove(item._id,item.user_id)}}>Remove</button>
                  
                  </div>
            ))
        }

    </div>
    
    </>
  )
}

export default ManageFurniture
