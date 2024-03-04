import React, { useEffect, useState } from 'react'
import UserNavigation from './UserNavigation'
import './CardProduct.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast';
import Footer from './Footer'
function CardProduct() {
    const navigate= useNavigate()
    const user_id = JSON.parse(localStorage.getItem('login_id'))
      const [data,setData] = useState([])
      //const [name,setName]=useState([])
      useEffect(()=>{console.log(user_id,'user_id');
    
      axios.post('http://localhost:2000/api/furniture/viewAll',data).then(response=>
      {
          const products = response.data.details
          console.log(products,'pdt');
          setData(products)
      }).catch(error=>{
          console.log(error);
      })
  },[]);
  const viewProduct =(id=>
    {
      navigate(`/viewProduct/${id}`)
      
    
    })


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
    <div>
        <div>
            <UserNavigation/>
        </div>
{
    data.map(item=>(
        <div className="card" data-aos="zoom-in-up">
  <div className="card-info">
    <img src={`/image/${item.image}`} alt="i" className='card-avatar' />
    <div className="card-title">{item.type} {item.name}</div>
    <div className="card-subtitle">Price : {item.price}</div>
    <div className="card-subtitle">Age : {item.age}</div>
  </div>
  
  <button className='viewbtn' onClick={()=>{viewProduct(item._id)}}>view product</button>
  <button className='viewbtn' onClick={()=>{addToCart(item._id)}}>Add to cart</button>

</div>

    ))
}

      
    </div>
    
  )
}

export default CardProduct
