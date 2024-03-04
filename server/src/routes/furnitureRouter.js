const express=require('express')
const furnitureRouter = express.Router()
const multer = require('multer')
const furnitureModel = require('../model/furnitureModel')
const storage = multer.diskStorage({
    destination : function(req,file,cb)
    {
        cb(null,'../client/public/image/')
    },
    filename: function(req,file,cb)
    {
        cb(null,file.originalname)
    }
})
const upload= multer({storage:storage})

furnitureRouter.post('/viewAll-admin',async(req,res)=>
{
    try {
        const data = await furnitureModel.find({status:'0'})
        console.log(data);
        if(data)
        {
            res.status(200).json({
                success:true,
                error:false,
                details:data
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
        
    }
})


furnitureRouter.post('/view-by-category/:category', async (req,res)=>{
    try {
    
        const category =req.params.category
        const data= await furnitureModel.find({category:category})
        if(data)
        {
            res.status(200).json({
                success:true,
                error:false,
                details:data
            })
        }
        else
        {
            res.status(400).json({
                success:false,error:true,
                message:error.message
            })
        }
    } 
    
    catch (error) {
        console.log(error);
        
    }
})

furnitureRouter.post('/viewAll',async(req,res)=>
{
    try {
        const data = await furnitureModel.find({status:'1'})
        console.log(data);
        if(data)
        {
            res.status(200).json({
                success:true,
                error:false,
                details:data
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
        
    }
})

furnitureRouter.post('/viewOne/:id', async(req,res)=>{
    const id =req.params.id
    const data = await furnitureModel.findOne({_id:id})
    console.log(data);
    if(data)
        {
            res.status(200).json({
                success:true,
                error:false,
                details:data
            })
        }
        else{
            res.status(400).json({
                success:false,
                error:true,
                message:'can not be deleted'
        })
        
    } 
})

furnitureRouter.post('/viewMyProducts/:id', async(req,res)=>{
    try {
        const user_id= req.params.id
        console.log(user_id,'id');
        const data= await furnitureModel.find({user_id:user_id})
        console.log(data,'data');
        if(data)
        {
            res.status(200).json({
                success:true,
                error:false,
                details:data
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

furnitureRouter.post('/add/:id', upload.single('image'),async(req,res)=>
{
    try 
    {
        const user_id=req.params.id
        const data={
            name:req.body.name,
            type:req.body.type,
            category:req.body.category,
            price:req.body.price,
            description:req.body.description,
            age:req.body.age,
            image:req.file.filename,
            status:'0',
            user_id:user_id
        }
        const fdata= await furnitureModel(data).save()
        if(fdata){
            res.status(200).json({
                success:true,
                error:false,
                message:'furniture added successfully'
            })
        }
        else
        {
            res.status(400).json({
                success:false,
                error:true,
                message:'furniture can not be added'

            })
        }
    } 
    catch (error) 
    {
        console.log(error);
    }
})
furnitureRouter.post('/delete/:id', async(req,res)=>
{
    try {
        
        const id = req. params.id
        console.log(id);
        const data= await furnitureModel.findOne({_id:id})
        console.log(data);
        const deleteData = await furnitureModel.deleteOne({_id:id})
        console.log(deleteData);
        if(deleteData)
        {
            res.status(200).json({
                success:true,
                error:false,
                message: 'deleted successfully'
            })
        }
        else
        {
            res.status(400).json({
                success:false,
                error:true,
                message:'can not be deleted'
            })
        }
        
    } 
    catch (error) {
        console.log(error);
        
    }
})
furnitureRouter.post('/edit/:id/:uid',upload.single('image'),async(req,res)=>{
    try 
    {
        const id= req.params.id
        const user_id= req.params.uid
        const data = await furnitureModel.findOne({_id:id})
        console.log(data,'update data');
        const newData={
            name:req.body.name?req.body.name:data.name,
            type:req.body.type?req.body.type:data.type,
            category:req.body.category?req.body.type:data.category,
            price:req.body.price?req.body.price:data.price,
            description:req.body.description?req.body.description:data.description,
            age:req.body.age?req.body.age:data.age,
            image:req.file?.filename?req.file.filename:data.image,
            status:'0',
            user_id:user_id
            
        }
        console.log('newdata',newData);
        const update =await furnitureModel.updateOne({_id:id},{$set : newData})
        console.log('update',update);
        if(update)
        {
            res.status(200).json({
                success:true,
                error:false,
                message:'updated successfully',
                details:newData
            })
        }
        else{
            res.status(400).json({
                success:false,
                error:true,
                message:'can not be updated',
                message:error.message
            })
        }
        
    } 
    catch (error) {
        console.log(error);
    }
})
// admin set status as approved
furnitureRouter.post('/set-status/:fid/:uid', async(req,res)=>{
    try {
        const fid= req.params.fid
        console.log('fur-id',fid);
        const uid = req.params.uid
        console.log('user id',uid);
    //const status='1'
    const statusUpdate= await furnitureModel.updateOne({_id:fid,user_id:uid},{$set:{status:1}})
    console.log(statusUpdate,'status update');
    if(statusUpdate)
    {
        res.status(200).json({
            success:true,
            error:false,
            message:'status updated'
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
        
    } catch (error) {
        console.log(error);
        
    }
})
//admin removes a product
furnitureRouter.post('/remove-product/:fid/:uid', async(req,res)=>{
    try {
        const fid= req.params.fid
        const uid=req.params.uid
        const remove = await furnitureModel.deleteOne({_id:fid,user_id:uid})
        if(remove)
        {
            res.status(200).json({
                success:true,
                error:false,
                message:'removed product'
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

    } catch (error) {
        console.log(error);
    }
})
module.exports =furnitureRouter;