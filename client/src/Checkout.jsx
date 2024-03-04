import React, { useEffect, useState } from 'react'
import './Checkout.css'
import UserNavigation from './UserNavigation'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Footer from './Footer'


function Checkout()
 {
    const [data,setData]=useState([])
    const [total,setTotal]=useState()
    const[user,getUser]=useState([])
    const user_id = JSON.parse(localStorage.getItem('login_id'))
    console.log(user_id);
    useEffect(()=>{
        axios.get(`http://localhost:2000/api/cart/viewCart/${user_id}`).then(response=>{
            //console.log(response.data.message);
            const data1= response.data.details
            setData(data1)
            setTotal(response.data.total)
            console.log(total,'t');
        }).catch(error=>{
            console.log(error);
        })
    },[])
    
    useEffect(()=>{
        
        axios.get(`http://localhost:2000/api/register/myDetails/${user_id}`).then(response=>{
            const userData=response.data.details
            console.log(userData,'ud');
            getUser(userData)
        }).catch(error=>{
            console.log(error.response.data.message);
        })
    },[])
    console.log(user,'user');
return (
    
    <>
<div>
    <UserNavigation/>
</div>

<div className='cartdiv2'>
<div className='ship'>
    
    <p className='info'>Shipping Information</p>
    <div>
   <img src="/image/furniture.png" className='imgicon'  alt="" />
   </div>
   
    
   
        <div>
            {
                user.map(item=>(

                <div>
                    <p>Name : {item.firstName} {item.lastName}</p>
                    <p>Address: {item.address}</p>
                    <p>Mobile : {item.mobile}</p>
                </div>
                ))
            }
            <hr />
        </div>
   
    
   
   

</div>

 <div className='orderlist'>
    <table>
        <h4>Your Order lists</h4>
 {
 data.map(item=>(
                <tr>
                    <td><img src={`/image/${item.image}`} alt=""  style={{width:'40px',height:'40px'}}/></td> 
                    <td><p>{item.type} {item.name}</p> </td>
                   <td> <p>Price :  {item.price}</p> </td>
                   
                </tr>
                
            ))
        }
         <hr />
        <p style={{color:'red'}}>Total Price : {total} <Link to='/payment' > <button className='checkout' > Go To Payment</button></Link></p>
       
    </table>
   
</div>
</div>

    </>
  )
}

export default Checkout
