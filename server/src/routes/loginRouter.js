const express = require('express');

const loginRouter=express.Router()
const bcrypt = require('bcryptjs');
const loginModel = require('../model/loginModel')

loginRouter.post('/',async(req,res)=>
{
    
try 
{
    
    const oldUser = await loginModel.findOne({email:req.body.email})
    if(!oldUser)
    {
        res.status(400).json({
            success:false,
            error:true,
            message:'user not found'
        })
    }
    else
    {
        const user= await loginModel.findOne({email:req.body.email})
        const matchPassword = bcrypt.compare(req.body.password,user.password)

        if(!matchPassword)
        {
            res.status(400).json({
                success:false,
                error:true,
                message:'password not matching'
            })
        }
        else
        {
            res.status(200).json({
                success:true,
                error:false,
                message:'successfully logged in',
                details:user
            })
        }
    }
} 
catch (error) 
{
    res.status(500).json({
        success:false,
        error:true,
        message:error.message
    })
}


})




module.exports= loginRouter;

