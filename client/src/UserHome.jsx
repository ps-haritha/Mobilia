import React, { useEffect, useState } from 'react'
import UserNavigation from './UserNavigation'
import axios from 'axios';
import  './UserHome.css'
import { useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';

function UserHome() 
{
  const navigate= useNavigate()
  const user_id = JSON.parse(localStorage.getItem('login_id'))
    const [data,setData] = useState([])
    const [name,setName]=useState([])
    useEffect(()=>{
    //   const datas = {
    //     name:'maneesh'
    //   }
    //   localStorage.setItem('contact',JSON.stringify(datas))
    //  const test =  JSON.parse(localStorage.getItem('contact'))
     
    //  console.log(test);

    
    console.log(user_id,'user_id');
    
        axios.post('http://localhost:2000/api/furniture/viewAll',data).then(response=>
        {
            const products = response.data.details
            console.log(products,'pdt');
            setData(products)
        }).catch(error=>{
            console.log(error);
        })
    },[]);
    // useEffect(()=>{
    //   axios.post(`http://localhost:2000/api/register/name/${user_id}`).then(response=>{
    //     const userName= response.data.details
    //     console.log(userName);
    //     setName(userName)
    //   }).catch(error=>{
    //     console.log(error);
    //   })
    // },[])
    // console.log(name);

    
console.log(data,'data');
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
    <>
    <div>
      <UserNavigation/>
      </div>
      <p>hello {name}</p>
      <div>
        
        {

            data.map(item=>(
              
                  <div className='furnitureCard'>
                   
                  <p> {item.name} </p>
                  <p> Type : {item.type}</p>
                  <p> Description :  {item.description}</p>
                  <p> Age:  {item.age}</p>
                  <p>Price:  {item.price}</p>
                  <img src= {`/image/${item.image}`} alt="img"  style={{width:'100px',height:'100px'}} />
                  <button className='btn' onClick={()=>{viewProduct(item._id)}}>View product</button>
                  a
                  <button className='btn' onClick={()=>{addToCart(item._id)}}>Add to cart</button>
                  
                  </div>
                ))
              
        }
        
      </div>
    </>
  )
}

export default UserHome;
