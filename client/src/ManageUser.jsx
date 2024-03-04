import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminNavigation from './AdminNavigation';
import './ManageUser.css'
import Footer from './Footer';
function ManageUser() {
    const [data,setData]= useState([])
useEffect(()=>{
    axios.get('http://localhost:2000/api/register/viewUser').then(response=>{
        const value= response.data.details
console.log(value);
setData(value)
    })
},[])

const remove=(id)=>{
    console.log(id,'axios id');
    axios.post(`http://localhost:2000/api/register/remove/${id}`).then(response=>{
        console.log(response.data.message,'deleted msg');
        const users= data.filter(value=>{
            return value._id!=id
        })
        setData(users)
    }).catch(error=>{
        console.log(error.response.data.message);
    })
}
  return (
   <>
   <div><AdminNavigation /></div>
   
   <div className='udetails'>
    {
 data.map(item=>(

    <div className='userdetails'>
        <p className='testp'>Name : {item.firstName} {item.lastName}</p>
        <p className='testp'>Address : {item.address}</p>
        <p className='testp'>Mobile : {item.mobile}</p>
        <p className='testp'>Email : {item.email}</p>
        <button className='removeUser' onClick={()=>remove(item._id)}>Remove</button>
    </div>
 ))
    }
  
   </div>
   
   
   </>
  )
}

export default ManageUser;
