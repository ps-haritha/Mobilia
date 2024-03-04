import React, { useEffect, useState } from 'react'
import UserNavigation from './UserNavigation'
import axios from 'axios'
import './MyOrders.css'
import Footer from './Footer'
function MyOrders() {

    const user_id= JSON.parse(localStorage.getItem('login_id'))
    const [data,setData] = useState([])
    useEffect(()=>{
       axios.post(`http://localhost:2000/api/cart/view-order/${user_id}`) .then(response=>{
        console.log(response.data.details,'resp');
        const data1= response.data.details
        setData(data1,'data')
        
       }).catch(error=>{
        console.log(error);
       })
    },[])

  return (
   <>
   <UserNavigation />
   <div>
    <h4>Your order lists</h4>
   </div>
   <div>
    {
        data.map(item=>(
            <div  className='card2'>
                <img src={`/image/${item.image}`} alt=""  style={{width:'150px',height:'100px'}}/>
                <p>Name : {item.name}</p>
                <p>Type : {item.type}</p>
                <p>Price : {item.price}</p>
            </div>
        ))
    }
   </div>
   <Footer/>
   </>
  )
}

export default MyOrders
