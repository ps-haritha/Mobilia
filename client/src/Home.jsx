import React, { useEffect, useState } from 'react'
import HomeCarousel from './HomeCarousel'
import NavHead from './NavHead'
import './Home.css'
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast';
import Footer from './Footer'
import ShopByCategory from './ShopByCategory'
import { useNavigate } from 'react-router-dom'
import CardData from './CardData'



export default function Home() 
{
  const[data,setData]=useState([])

  const navigate= useNavigate()
  useEffect(()=>{
    axios.post('http://localhost:2000/api/furniture/viewAll',data).then(response=>
    {
        const products = response.data.details
        console.log(products,'pdt');
        setData(products)
    }).catch(error=>{
        console.log(error);
    })
},[]);
  const view=(id)=>{
    //toast.error('Please login to buy products')
    navigate(`/view/${id}`)
  }

  return (
    <>
    <div>
     
      <NavHead/>
    </div>
    
    <Toaster/>
    <div className='home'>
      <div className='container'>
      <div className='homecarousel'>
    <HomeCarousel />
    <div className='intro'>
     
      <h3 className='heading'>ARE YOU LOOKING FOR <br />SECOND-HAND FURNITURE <br />FOR YOUR HOME ? </h3>
</div>
    </div>

      </div>
       <div>
       <p className='subhead'> We offer a wide range of furniture with various models and sizes. Also get special offers from us and get discount upto 20% by shopping at our store</p>
        </div> 
    <hr />
    <ShopByCategory/>
    </div>
    <hr />
    <div>
    <div className='container'>
        
        {

            data.map(item=>(
              
                  <CardData  details={item} view = {view}/>
                ))
              
        }
        
      </div>
    </div>
    <Footer/>
    </>
  )
}
