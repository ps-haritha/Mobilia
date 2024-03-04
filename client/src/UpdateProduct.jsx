import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import UserNavigation from './UserNavigation'
import Form from 'react-bootstrap/Form';
import Footer from './Footer'


function UpdateProduct() {
    const user_id= JSON.parse(localStorage.getItem('login_id'))
    const {id}= useParams()
    console.log(id);
   
    const [value,setValue]= useState({name:'',type:'',price:'',description:'',age:'',image:'',user_id:''})
    

    const navigate = useNavigate()
    useEffect(()=>
    {
        axios.post(`http://localhost:2000/api/furniture/viewOne/${id}`).then(response=>{
            const data =response.data.details
            console.log(data);
            setValue(data)
            
        })
    },[])


    const update = (event)=>{
        setValue({...value,[event.target.name]:event.target.value})
      }

      
      const updateImage=(event=>{
        setValue({...value,image:event.target.files[0]})
      })

      const updateData = (event)=>
      {
       
        event.preventDefault()
        
        const formData= new FormData()
        formData.append('name',value.name)
        formData.append('type',value.type)
        formData.append('price',value.price)
        formData.append('description',value.description)
        formData.append('age',value.age)
        formData.append('image',value.image)
        formData.append('user_id',value.user_id)
       
         
         axios.post(`http://localhost:2000/api/furniture/edit/${id}/${user_id}`,formData).then((response)=>
         {
           console.log('response',response.data.message);
           toast.success(response.data.message)
           setTimeout(() => {
     
             navigate('/manageProducts')
            }, 1000);
           
           
         
         }).catch((error)=>
         {
           toast.error(error.response.message)
         
         })
        }
     
 
  return (
    <>
    <div>
        <UserNavigation/>
    </div>
    <Toaster/>
    <div style={{marginTop:'20px',marginLeft:'20px'}}>
<center>
<Form onSubmit={updateData} encType='multipart/form-data'>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Furniture Name </Form.Label>
  
  <Form.Control type="text" value={value.name}  name='name' onChange={update}  />
 </Form.Group>

 <Form.Group className="mb-3" controlId="formBasicEmail">
 <Form.Label>Type ( wooden/steel...) </Form.Label>
 
  <Form.Control type="text" value={value.type}  name='type' onChange={update} />
 </Form.Group>

 <Form.Group className="mb-3" controlId="formBasicEmail">
 <Form.Label>Price </Form.Label>
 
  <Form.Control type="number" value={value.price}  name='price' onChange={update} />
 </Form.Group>

 <Form.Group className="mb-3" controlId="formBasicEmail">
 <Form.Label>Description </Form.Label>
 
  <Form.Control type="text" value={value.description}  name='description' onChange={update} />
 </Form.Group>

 <Form.Group className="mb-3" controlId="formBasicEmail">
 
 <Form.Label>Age </Form.Label>
  <Form.Control type="text" value={value.age}  name='age' onChange={update}  />
 </Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">

<img src={`/image/${value.image}`} alt=""  style={{width:'150px',height:'150px'}}/>
<input type="file" name="image" id="" onChange={updateImage} />
</Form.Group>

<button className='btn' > Update</button>

</Form>
</center>
</div>
<Footer/>
    </>
  )
}

export default UpdateProduct
