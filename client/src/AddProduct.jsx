import React, { useState } from 'react'
import UserNavigation from './UserNavigation'
import Form from 'react-bootstrap/Form';
import toast,{Toaster} from 'react-hot-toast';
import NavHead from './NavHead'
import axios from 'axios';
import {Navigator, useNavigate } from 'react-router-dom';
import './AddProduct.css'
import Footer from './Footer';
function AddProduct() 
{

    const user_id= JSON.parse(localStorage.getItem('user_id'))
    const [value,setValue] = useState({name:'',type:'',category:'',price:'',description:'',age:'',image:'',user_id:''})
    const [formError,setFormError] = useState({})

    const navigate = useNavigate()

    const change = (event)=>{
        setValue({...value,[event.target.name]:event.target.value})
      }

      const validate = (values)=>{
        const error = {}        //initializing constant object-->  error -(obj)
        if(values.name=='')
        {
          error.name='Enter name of furniture'
        }
        // if(values.type=='')
        // {
        //   error.type='Enter type of product'
        // }
        // if(values.category=='')
        // {
        //   error.category='Enter category of product'
        // }
        if(values.price=='')
        {
          error.price=' Enter price'
        }
        
        if(values.image=='')
        {
          error.image='  Upload an image'
        }
       
        return error
        
      }
      const addImage=(event=>{
        setValue({...value,image:event.target.files[0]})
      })

      const addData = (event)=>
      {
       
        event.preventDefault()
        setFormError(validate(value))
        //console.log(value.type,'type');
        console.log('form error',formError);
        const formData= new FormData()
        formData.append('name',value.name)
        formData.append('type',value.type)
        formData.append('category',value.category)
        formData.append('price',value.price)
        formData.append('description',value.description)
        formData.append('age',value.age)
        formData.append('image',value.image)
        formData.append('user_id',value.user_id)
        //for displaying formData
        for (var pair of formData.entries()) {
              console.log(pair[0]+ ', ' + pair[1],'formdata'); 
      }

// if formError have no value, then :
       if(Object.keys(formError).length===0)
       {
        console.log(Object.keys(formError));
        axios.post(`http://localhost:2000/api/furniture/add/${user_id}`,formData).then((response)=>
        {
          console.log('response',response.data.message);
          toast.success(response.data.message)
          setTimeout(() => {
    
            navigate('/userHome')
           }, 1000);
          
          
        
        }).catch((error)=>
        {
          toast.error(error.response.message)
        
        })
       }
    }

  return (
    <>
    <div>
      <UserNavigation />
      </div>
    <div>
    
     <Toaster/>
     <div className='addp'>
     <div ><img src="/image/icon1.webp" alt=""  className='fImage' /></div>
      <div  className='form'>
<center>
      <Form onSubmit={addData} encType='multipart/form-data'  >
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Furniture Name </Form.Label>
        <span style={{color:'red'}}>{formError.name}</span>
        <Form.Control type="text" placeholder="" name='name' onChange={change} onClick={()=>setFormError({...formError,name :''})} />
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Type</Form.Label> <br />
       
       <select name="type" id="" className='dropdown'  onChange={change}>
       <option value="">Select a type</option>
<option value="wooden">Wooden</option>
<option value="Steel">Steel</option>
<option value="Glass">Glass</option>
<option value="Plywood">Plywood</option>
<option value="Plastic">Plastic</option>
<option value="MDF">MDF</option>
<option value="Bamboo">Bamboo</option>
<option value="Rosewood">Rosewood</option>
<option value="Wrought iron">Wrought Iron</option>



        </select>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Category </Form.Label> <br />
       <span style={{color:'red'}}>{formError.category}</span>
      
        <select name="category" id="" className='dropdown'  onChange={change}>
          <option value="">Select a category</option>
<option value="Sofa">Sofas</option>
<option value="Bed">Bed</option>
<option value="Dining Set">Dining Sets</option>
<option value="Study table">Study tables</option>
<option value="Chair">Chair</option>
<option value="Recliners">Recliners</option>
<option value="Centre table">Centre table</option>
<option value="Wardrobe">Wardrobe</option>
<option value="Office furniture">Office Furniture</option>
<option value="Shoe racks">Shoe racks</option>
<option value="Bar furniture">Bar Furniture</option>


        </select>
       </Form.Group>


       <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Price </Form.Label>
       <span style={{color:'red'}}>{formError.price}</span>
        <Form.Control type="number" placeholder="" name='price' onChange={change} onClick={()=>setFormError({...formError,price :''})}/>
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Description </Form.Label>
       <span style={{color:'red'}}>{formError.description}</span>
        <Form.Control type="text" placeholder="" name='description' onChange={change} onClick={()=>setFormError({...formError,description :''})} />
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
       <span style={{color:'red'}}>{formError.age}</span>
       <Form.Label>Age </Form.Label>
        <Form.Control type="text" placeholder="" name='age' onChange={change} onClick={()=>setFormError({...formError,age :''})} />
       </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      <span style={{color:'red'}}>{formError.image}</span>
      <input type="file" name="image" id="" onChange={addImage} onClick={()=>setFormError({...formError,image :''})}/>
      </Form.Group>

      <button className='btn' > Add Product</button>

    </Form>
    </center>
    </div>
    </div>
    </div>
    
    </>
  )
}


export default AddProduct;
