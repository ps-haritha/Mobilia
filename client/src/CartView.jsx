
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import UserNavigation from './UserNavigation';


import './CartView.css'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function CartView() {
    const user_id = JSON.parse(localStorage.getItem('login_id'))
    
    const navigate= useNavigate()
    const [tot,setTot]=useState()
 

    const [input, setInput] = useState([])

    useEffect(() => {
        axios.get(` http://localhost:2000/api/cart/viewCart/${user_id}`).then(response => {
            const data = response.data.details
            setInput(data)

           const total= response.data.total
            setTot(total)
            console.log('total',total);
            
        }).catch(error => 
            {
            console.log(error);
        })
    }, [])

    console.log('input', input);
  

    const remove = (id) => {
        axios.post(`http://localhost:2000/api/cart/delete/${user_id}/${id}`).then(response => {
            toast.success(response.data.message)

           const price =response.data.details.data
          
            //window.location.reload()   - for reloading
                
            const filterData = input.filter((data) => 
            {
                return data.furniture_id != id

            })
            const deletedProduct = input.filter((data) =>{return data.furniture_id == id})
            // console.log(deletedProduct);
            setTot(tot-deletedProduct[0].price)
            setInput(filterData)
                //console.log('tot',total);
            

        }).catch( error => {
            console.log(error);
        })
    }
    const checkout= ()=>{
        navigate('/checkout')

    }
    

    return (
        <>
            <div>
                <UserNavigation />
            </div>
            
        <div className='cartdiv'>
        <div>
    <table>
        <h4>Your cart items</h4>
        
    <p style={{color:'red'}}>Total Price : {tot} <button className='checkout' onClick={()=>{checkout()}}>Proceed to checkout</button></p>
 {
            input.map(item=>(
                <tr>
                    
                    <td> <img src={`/image/${item.image}`} alt="i" style={{width:'200px',height:'200px'}} />
                    
                    </td>
                    
                    <td><h4>{item.type} {item.name}</h4><br />
                    <button className='remove' onClick={() => { remove(item.furniture_id) }}>Remove</button>
                    
                    </td>
                   
                    <td>
                        <h4>Price :  {item.price}</h4>
                        <img src="/image/coupon.png" alt="" style={{width:'50px' , height:'50px'}} />
                        <p>Use Mobilia coupon to get extra discount</p>
                    </td>

                    <td>
                       
                    </td>
                   
                </tr>
                
            ))
        }
    </table>
   
</div>

</div>

 </>
    )
}

export default CartView;
