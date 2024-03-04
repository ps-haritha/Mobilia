import React, { useEffect, useState } from 'react'
import NavHead from './NavHead'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Footer from './Footer'



function View() {

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
const add=()=>{
     toast.error('Please login to buy products')
}
  return (
<>
<NavHead/>

<Toaster/>
<div>
    <div><img src="/image/sofa2.png" alt="" style={{float:'right'}} /></div>
    
    
   <div className='furniturecard' style={{display:'flex'}}>
   <div >
    <img src={`/image/${data.image}`} alt="" style={{width:'250px',height:'250px'}}/>
    </div>
   <div style={{marginLeft:'10px'}} >
    <p>{data.type} {data.name}</p>
    <p>Category : {data.category}</p>
    <p>Price : {data.price}</p>
    <p>Description : {data.description}</p>
    <p>Age : {data.age}</p>
    <div>
    <button className='pdtbtn' onClick={add}>Add to cart</button>
   </div>
    
    
   </div>
   

    </div>
</div>


</>

   
  )
}

export default View
