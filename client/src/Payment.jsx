import React, { useEffect, useState } from 'react'
import UserNavigation from './UserNavigation';
import axios from 'axios';

import './Payment.css'
import toast, { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function Payment()
 {
  const user_id = JSON.parse(localStorage.getItem('login_id'))
  const [method,setMethod]=useState('')
  const [total,setTotal]=useState()
  const [data,setdata]=useState([])
  const [input,setInput] = useState({upi:'',bank:'',cardnumber:'',cvv:'',month:'',year:''})
  const[formError,setFormError]=useState({})
  const [submit,isSubmit]= useState(false)
const navigate =useNavigate()
  const change=(event)=>
  {
  const name= event.target.name
  const value=event.target.value
  setInput({...input,[name]:value})
 }
 console.log(input);
  
 const selection =()=>{
  const a= document.querySelector('input[name="pay"]:checked').value;
   console.log(a);
   setMethod(a)
   }

const validate = (input) =>
{

const error={}
  if(method=='upi')
  {
    
    if(input.upi=='')
    {
      error.upi=' enter valid upi'
    }
    
    
  }
  else if(method=='card')
  {
    if((input.cardnumber).length!=15)
    {
      error.cardnumber='card number must be 15 digits'
    }
    if((input.cvv).length!=3)
    {
      error.cvv='cvv must be 3 digits'
    }
  }
  
  return error
 }
 
  useEffect(()=>
  {
    axios.get(`http://localhost:2000/api/cart/viewCart/${user_id}`).then(response=>{
      setTotal(response.data.total)
      setdata(response.data.details)
      }).catch(error=>{
      console.log(error);
  })
},[])


console.log(formError,'formerror');
  
const order = (event)=>{
  event.preventDefault()
    setFormError(validate(input))

    isSubmit(true)
    if(Object.keys(formError).length==0 && submit==true)
    {
      axios.post(`http://localhost:2000/api/cart/set-order-status/${user_id}`).then(response=>{
      
      toast.success(response.data.message)
      navigate('/userHome')
      }).catch(error=>
        {
        console.log(error);
      })
    }
   
  }
  return (
    <>
    <UserNavigation/>
    <Toaster/>
    <div className='pay'>
      <div>
      <form onSubmit={order}>
        <table>
            
            <tr>
                <td>Total Amount <p>{total}</p> </td>
            </tr>
            <tr><td><p>5% Cash back - claim now with payment offers</p></td></tr>
            <tr>
              
                <td><input type="radio" name="pay" value="upi"  onClick={selection} /><img src="/image/upi.webp" alt=""  className='icon'/>UPI <br />
                <span style={{color:'red'}}>{formError.upi}</span>
            {
              method=='upi'?  <span><input type="text" className='tb' placeholder='enter upi id' name="upi" id=""  onChange={change} /></span>:''
            }
              
                </td>
            </tr>
            <tr>
            <td><input type="radio" name="pay" id="" value="netbank"  onClick={selection}/><img src="/image/netbank.png" alt=""  className='icon'/>Net Banking <br />
            
            {
              method=='netbank'?  <span>
                
              <select name="bank" id="" onChange={change} className='drop'>
                <option value="">--Select your bank--</option>
                          <option value="ICICI">ICICI</option>
                          <option value="HDFC">HDFC</option>
                          <option value="SBI">SBI</option>
                         </select>
                         </span>:''
            }
          
            </td>
            </tr>
            <tr>
            <td><input type="radio" name="pay" id="" value="card"  onClick={selection}/><img src="/image/credit.png" alt=""  className='icon'/>Credit/Debit/ATM Card <br />
            
            {
              method=='card'?
              
           
              
              <span style={{color:'red'}}>{formError.cardnumber}<input type="password" className='tb' name="cardnumber" placeholder='enter card number' id="" onChange={change} />
             <span style={{color:'red'}}>{formError.cvv}</span> <input type="password" name="cvv" className='tb' placeholder='CVV' id="" onChange={change} /> <br />
              <p style={{color:'black'}}>Valid till : </p>
  
              <select name="month" id="" onChange={change} className='drop'>
                <option value="">Select month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
             <option value="April">April</option>
             <option value="May">May</option>
             <option value="June">June</option>
             <option value="July">July</option>
             <option value="August">August</option>
             <option value="September">September</option>
             <option value="October">October</option>
             <option value="November">November</option>
             <option value="December">December</option>
              </select>
  
              <select name="Year" id="" onChange={change} className='drop'>
                <option value="">Select year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
             <option value="2027">2027</option>
             <option value="2028">2028</option>
             <option value="2029">2029</option>
             <option value="2030">2030</option>
             <option value="2031">2031</option>
             <option value="2032">2032</option>
             <option value="2033">2033</option>
             <option value="2034">2034</option>
             <option value="2035">2035</option>
              </select>
                </span>
            :''
            }
            </td>
            </tr>
           
            <tr>
            <td><input type="radio" name="pay" id="" value="cod"  onClick={selection}/><img src="/image/rupee.png" alt=""  className='icon'/>Cash On Delivery</td>
            </tr>
            <button className='orderbutton' >Place Order</button>
            
        </table>
        </form>

      </div>
      <div style={{float:'right'}}>
        <img src="/image/payment.png" alt="pay"  style={{width:'400px',height:'300px'}}/>
      </div>
        </div>
    
    </>
  )
}

export default Payment
