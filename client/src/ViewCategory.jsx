import React, { useEffect, useState } from 'react'
import NavHead from './NavHead'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './ViewCategory.css'
import toast, { Toaster } from 'react-hot-toast'
import Footer from './Footer'
import CardData from './CardData'


function ViewCategory() 
{

let {category} = useParams()
console.log(category);
const [data,setData]= useState([])
useEffect(()=>{
    axios.post(`http://localhost:2000/api/furniture/view-by-category/${category}`).then(response=>{
        const values= response.data.details
        setData(values)
    }).catch(error=>{
        console.log(error);
    })
},[])
console.log(data)
const msg=()=>{
    toast.error('Please login to buy products')
}
  return (
   <>

   <NavHead/>
   <Toaster/>

<div>
    
{
        data.map(item=>(
            
          
                <>
               <CardData details={item} view='' msg={msg}/>
                
            <button className='btnadd' onClick={msg}>Buy</button>
                
            
            </>
           
            
          
            
        ))
}

</div>

   </>
  )
}

export default ViewCategory
