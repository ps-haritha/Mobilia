const express = require ('express')
const userRouter= express.Router()
const bcrypt = require('bcryptjs')
const loginModel = require('../model/loginModel')
const userModel = require('../model/userModel')

userRouter.post('/register',async (req,res)=>
{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,8)
       
      
        const logData =
        {
            email:req.body.email,
            password:hashedPassword,
            role:'user'
        }
     
        console.log('logData',logData);

        const oldEmail = await loginModel.findOne({ email: req.body.email })
        //console.log(oldEmail);
        const oldMobile = await userModel.findOne({ mobile: req.body.mobile })
        //console.log('oldmb',oldMobile);
       
        if (oldEmail) 
        {
           return res.status(400).json({
                success: false,
                error: true,
                message: 'Email already exist!'
            })
        }
         if (oldMobile) 
         {
           return res.status(400).json({
                success: false,
                error: true,
                message: 'mobile number already exist!'
            })
        }

       
            
            const logDataSave = await loginModel(logData).save()
            const data =
            {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                address:req.body.address,
                mobile:req.body.mobile,
                login_id:logDataSave._id
            }
            const dataSave= await userModel(data).save()        
            console.log('datasave',dataSave);
            console.log('logdatasave',logDataSave);
            if(dataSave && logDataSave)
        {
            res.status(200).json({
                success :true,
                error:false,
                message:'success'
            })
        }
        else
        {
            res.status(400).json({
                success :false,
                error:true,
                message:'error.message'
        })
        
    
        }
        
        
        

        
}
    catch (error)
     {
     console.log(error);   
    }
})
 userRouter.get('/viewUser', async(req,res)=>{
    try {
       
const userData= await userModel.aggregate(
  [
    {
      '$lookup': {
        'from': 'login_tbs', 
        'localField': 'login_id', 
        'foreignField': '_id', 
        'as': 'result'
      }
    }, {
      '$unwind': {
        'path': '$result'
      }
    }, {
      '$group': {
        '_id': '$_id', 
        'firstName': {
          '$first': '$firstName'
        }, 
        'lastName': {
          '$first': '$lastName'
        }, 
        'address': {
          '$first': '$address'
        }, 
        'mobile': {
          '$first': '$mobile'
        }, 
        'email': {
          '$first': '$result.email'
        }, 
        'login_id': {
          '$first': '$result._id'
        }
      }
    }
  ]
)
console.log(userData);
       
        if(userData)
        {
            res.status(200).json({
                success:true,
                error:false,
                details:userData
            })
        }
        else
        {
            res.status(400).json({
                success:false,
                error:true,
                message:error.message
            })
        }


    } 
    
    catch (error) {
        console.log(error);
    }
 })
 userRouter.post('/remove/:id',async(req,res)=>{
    try {
        const id = req.params.id
        console.log(id,'id');
        const deleteUser= await userModel.deleteOne({login_id:id})
        console.log(deleteUser,'from usertb');
        const deleteLogin= await loginModel.deleteOne({_id:id})
        console.log(deleteLogin,'from loginb');
        if(deleteUser && deleteLogin)
        {
            res.status(200).json({
                success:true,
                error:false,
                message:'removed successfully'
            })
        }
        else{
            res.status(400).json({
                success:false,
                error:true,
                message:error.message
            })
        }
    } 
    catch (error) {
        console.log(error);
    }
 })
//shipment details

userRouter.get('/myDetails/:uid',async (req,res)=>{
  try {
  
    const id= req.params.uid
    const user= await userModel.find({login_id:id})
    console.log(user);
    if(user)
    {
      res.status(200).json({
        success:true,
        error:false,
        details:user
      })
    }
    else{
      res.status(400).json({
        success:false,
      error:true,
      message:error.message
      })
    }


  }
  
  catch (error) {
    console.log(error);
  }
})
module.exports = userRouter;