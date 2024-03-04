import React, { useEffect, useState } from 'react'
import UserNavigation from './UserNavigation';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewProduct.css'
import toast,{Toaster} from 'react-hot-toast';
import Footer from './Footer';

function ViewProduct() 
{
    const user_id= JSON.parse(localStorage.getItem('login_id'))
    console.log(user_id);
    const {id} = useParams()
    console.log(id);
    const [data,setData]= useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        axios.post(`http://localhost:2000/api/furniture/viewOne/${id}`).then(response=>{
            const product= response.data.details
            console.log(product);
            setData(product)
        }).catch((error)=>
        {
            
            console.log(error);
        })
    },[])
   
    const addToCart = (id)=>{
        axios.post(`http://localhost:2000/api/cart/add-to-cart/${user_id}/${id}`).then(response=>{
            console.log(response.data.message);
            toast.success(response.data.message)
            setTimeout(() => {

              navigate('/cart')  
            }, 1000);
        }).catch(error=>{
            toast.error(error.response.data.message)
            console.log(error);
        })

    }

  return (
   <>
   
   <UserNavigation/>
   
   <Toaster/>
   <div className='Pcard' style={{display:'inline-flex'}}>
   <div >
    <img src={`/image/${data.image}`} alt="" style={{width:'250px',height:'250px'}}/>
    </div>
   <div >
    <p>{data.type} {data.name}</p>
    <p>Category : {data.category}</p>
    <p>Price : {data.price}</p>
    <p>Description : {data.description}</p>
    <p>Age : {data.age}</p>
    <div>
    <button className='btn' onClick={()=>{addToCart(data._id)}}>Add to cart</button>
   </div>
    
    
   </div>
   
   
   </div>
   
   
   </>
  )
}

export default ViewProduct;
