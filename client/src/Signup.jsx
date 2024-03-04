import React, { useEffect, useState } from 'react'
import NavHead from './NavHead'
import Form from 'react-bootstrap/Form';
import './Signup.css';
import toast,{Toaster} from 'react-hot-toast';
import axios from 'axios';
import {Navigator, useNavigate } from 'react-router-dom';
import Footer from './Footer';


function Signup() 
{
  const [value,setValue] = useState({firstName:'',lastName:'',address:'',mobile:'',email:'',password:''})

  const [formError,setFormError] = useState({})
  console.log(formError, value);

  const navigate = useNavigate()


  const change = (event)=>{
    setValue({...value,[event.target.name]:event.target.value})
  }
  const validate = (values)=>{
    const error = {}        //initializing constant  error -(obj)
    if(values.firstName=='')
    {
      error.firstName=' Please enter your name'
    }
    if(values.address=='')
    {
      error.address='Please enter your address'
    }
    if(values.mobile=='')
    {
      error.mobile=' Please enter your mobile number'
    }
    if(values.email=='')
    {
      error.email=' Please enter your valid email'
    }
    if(values.password=='')
    {
      error.password='  Enter a password'
    }
    return error
    
  }
  const addData = (event)=>
  {
   
    event.preventDefault()
    setFormError(validate(value))
    console.log('form error',formError);
   if(Object.keys(formError).length===0)
   {
    console.log(Object.keys(formError));
    axios.post('http://localhost:2000/api/register/register',value).then((response)=>
    {
      console.log('response',response.data.message);
      toast.success(response.data.message)
      setTimeout(() => {

        navigate('/login')
       }, 1000);
      //alert(response.data.message)
      
    navigate('/login')
    }).catch((error)=>
    {
      toast.error(error.response.message)
      //console.log(error);
      //console.log(error.response.data.message);
    })
   }
    
   
  }

  
  return (
    <>
    <div>
    <NavHead />
    </div>
      
     <Toaster/>
     
      <div style={{marginTop:'20px',display:'flex'}}>
        <div className='signup'>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <span style={{color:'red'}}>{formError.firstName}</span>
        <Form.Control type="text" placeholder="Enter first name" name='firstName' onChange={change} onClick={()=>setFormError({...formError,firstName :''})}/>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control type="text" placeholder="Enter last name" name='lastName' onChange={change}/>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
       <span style={{color:'red'}}>{formError.address}</span>
        <Form.Control type="text" placeholder="Enter address " name='address' onChange={change} onClick={()=>setFormError({...formError,address:''})}/>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
       <span style={{color:'red'}}>{formError.mobile}</span>
        <Form.Control type="text" placeholder="Enter mobile number" name='mobile' onChange={change} onClick={()=>setFormError({...formError,mobile:''})}/>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
       <span style={{color:'red'}}>{formError.email}</span>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={change} onClick={()=>setFormError({...formError,email:''})}/>
       </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      <span style={{color:'red'}}>{formError.password}</span>
       <Form.Control type="password" placeholder="Enter a password"  name='password' onChange={change} onClick={()=>setFormError({...formError,password:''})}/>
      </Form.Group>

      <button className='signbtn' onClick={addData}> Sign Up</button>

    </Form>
        </div>
      
    <div>
        <img src="/image/a.png" alt=""  style={{float:'right'}}/>
      </div>
      </div>
      
      
      
      
    
    </>
  )
}

export default Signup
