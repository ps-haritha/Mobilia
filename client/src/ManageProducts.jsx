import React, { useState } from 'react'
import UserNavigation from './UserNavigation'
import './ManageProduct.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import './CardProduct.css'
import toast from 'react-hot-toast'
import Footer from './Footer'

function ManageProducts() 
{
  const user_id = JSON.parse(localStorage.getItem('login_id'))
  console.log(user_id,'userid_mp');
const navigate = useNavigate()
const [data,getData]= useState([])

useEffect(()=>{
  axios.post(`http://localhost:2000/api/furniture/viewMyProducts/${user_id}`).then(response=>{
    const result= response.data.details
    console.log(result);
    getData(result)
  })
},[])
console.log(data,'data');

const addProduct =(id)=>{
  navigate(`/addProduct/${id}`)
}

const updateOne=(id)=>{
  navigate(`/updateProduct/${id}`)
}

const deleteOne= (id)=>{
  axios.post(`http://localhost:2000/api/furniture/delete/${id}`).then(response=>{
    toast.success(response.data.message)

   const filteredData = data.filter((value) => {
    return value._id != id
    
   })
   getData(filteredData)
  }).catch(error=>{
    toast.error(error.response.data.message)
  })
}


  return (
  <>
  <div>
  <UserNavigation/>
  </div>
  <div>
    <center>
    <button className='addbtn' onClick={()=>{addProduct(user_id)}}>Add Product</button>
    </center>


  </div>
  
  <div >
    {
     data.map(item=>(
      <div className="card" data-aos="flip-left">
      <img src={`/image/${item.image}`} alt="i" className='card-avatar' />
      <div className="card-title">{item.type} {item.name}</div>
      <div className="card-subtitle">Category : {item.category}</div>
      <div className="card-subtitle">Price : {item.price}</div>
      <div className="card-subtitle">Age : {item.age}</div>
    
    <ul className="card-social">
      <li className="card-social__item">
        <button className='smlbtn' onClick={()=>{updateOne(item._id)}}>Update</button>
      </li>
      <li className="card-social__item">
        <button className='smlbtn' onClick={()=>{deleteOne(item._id)}}>Delete</button>
      </li>
     
    </ul>
    
    </div>
     ))
    }
  </div>
   <div>
    <center>
    <p className='addpdt'>Add your product and sell with reasonable price</p>
    </center>
   </div>
  
  </>
  )
}

export default ManageProducts
