import React from 'react';
import NavHead from './NavHead';
import './Login.css';
//import Button from 'react-bootstrap/Button';
import toast,{Toaster} from 'react-hot-toast';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { Navigator, useNavigate } from 'react-router-dom';
import Footer from './Footer';


function Login() {
  const [input, setInput] = useState({
    email: '',
    password: ''
  })


  const [formError, setFormError] = useState({})
  console.log(formError, input);


  const navigate = useNavigate()

  const change = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }

  const validate = (values) => {
    const error = {}
    if (values.email == '') 
    {
      error.email = 'Enter an email'
    }
    if (values.password == '') {
      error.password = 'enter a password'
    }
    return error

  }

  const loginData = (event) => 
  {
    event.preventDefault()
    setFormError(validate(input))
    
    if(Object.keys(formError).length===0)
    {
      console.log(input,'input');
      axios.post('http://localhost:2000/api/login', input).then(response => 
      {
       console.log(response.data.details._id);
        localStorage.setItem('login_id',JSON.stringify(response.data.details._id))
        localStorage.setItem('role',JSON.stringify(response.data.details.role))
       const role= response.data.details.role
        console.log('role',role);
       // navigate('/userNavigation')

        
        if(role=='admin')
        {
          navigate('/admin')
        }
        else if(role=='user')
        {
          navigate('/userHome')
        }




         // toast.success(response.data.message)
      //   setTimeout(()=>{
      //   navigate('/userHome')
      // },1000)
        
      }).catch(error => {
        //toast.error(error.response.data.message)
        console.log(error);
      })
    }

     
    



  }


  return (
    <div>
      <NavHead />
      <Toaster />
      <div style={{ marginTop: '50px' }}>
        <center>
          <div className='form'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <span style={{ color: "red" }}>{formError.email}</span>
              <Form.Control style={{ borderColor: formError.email ? 'red' : '' }} type="email" placeholder="Enter email" name='email' onChange={change} onClick={() => { setFormError({ ...formError, email: '' }) }} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">

              <Form.Control style={{borderColor:formError.password?'red':''}} type="password" placeholder="Password" name='password' onChange={change}  onClick={()=>{setFormError({...formError,password: '' })}}/>
            </Form.Group>

            <button className='loginbtn' onClick={loginData}>Login</button>
          </Form>
          </div>
          
        </center>
        <img src="/image/3.png" alt=""  style={{width:'500px',height:'300px'}}/>
        <img src="/image/7.png" alt="" style={{width:'300px',height:'200px',float:'right'}}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Login;
