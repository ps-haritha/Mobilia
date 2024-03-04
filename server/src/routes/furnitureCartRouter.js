const express = require('express');
const furnitureCartModel = require('../model/furnitureCartModel');
const { default: mongoose } = require('mongoose');
const furnitureModel = require('../model/furnitureModel');
const furnitureCartRouter = express.Router()

//furniture adding to cart
furnitureCartRouter.post('/add-to-cart/:user_id/:furniture_id', async(req,res)=>{
    const user_id = req.params.user_id
   // console.log(user_id);
    const furniture_id= req.params.furniture_id
    //console.log(furniture_id);
    const addedItem = await furnitureCartModel.findOne({furniture_id:furniture_id,user_id:user_id})
    console.log(addedItem,'aditem');
    if(!addedItem)
    {
      const data = {
        furniture_id:furniture_id,
        user_id:user_id,
        quantity:'1',
        status: '0'
        }
    const saveData= await furnitureCartModel(data).save()
    if(saveData)
    {
        res.status(200).json({
            success: true,
            error: false,
            message:'added to cart'
        })
    }
    else
    {
        res.status(400).json({
            success:false,
            error:true,
            message: ' can not be added to cart'
        })
    }
    }
    else
    {
      res.status(400).json({
        success:false,
        error:true,
        message:'item already added to cart'
      })
    }
    
    
//     if(addedItem)
//     {
//       res.status(400).json({
//         message:'Item already added to card'
//       })
//     }

//     else{
//       const data = {
//         furniture_id:furniture_id,
//         user_id:user_id,
//         quantity:'1',
//         status: '0'
//     }
//     const saveData= await furnitureCartModel(data).save()
//     if(saveData)
//     {
//         res.status(200).json({
//             success: true,
//             error: false,
//             message:'added to cart'
//         })
//     }
//     else
//     {
//         res.status(400).json({
//             success:false,
//             error:true,
//             message: ' can not be added to cart'
//         })
//     }
// }
    })
    

// view cart products

furnitureCartRouter.get('/viewCart/:user_id', async (req,res)=>{
   const user_id = req.params.user_id
   console.log(user_id);
//    const furniture_id = req.params.furniture_id
//    console.log(furniture_id);
//    const data = await furnitureCartModel.findOne({user_id:user_id})
const data = await furnitureCartModel.aggregate(
    [
        {
          '$lookup': {
            'from': 'furniture_tbs', 
            'localField': 'furniture_id', 
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
            'furniture_id': {
              '$first': '$furniture_id'
            }, 
            'user_id': {
              '$first': '$user_id'
            }, 
            'quantity': {
              '$first': '$quantity'
            }, 
            'status': {
              '$first': '$status'
            }, 
            'name': {
              '$first': '$result.name'
            }, 
            'type': {
              '$first': '$result.type'
            }, 
            'category':{
              '$first': '$result.category'
            },
            'price': {
              '$first': '$result.price'
            }, 
            'description': {
              '$first': '$result.description'
            }, 
            'age': {
              '$first': '$result.age'
            }, 
            'image': {
              '$first': '$result.image'
            },
            'status':{
              '$first' : '$result.status'
            }
          }
        },{
            $match:{
               user_id:new mongoose.Types.ObjectId(user_id)
            }
        }
      ]
)


//total price of products added in cart

let total=0;
data.map(item=>{
  console.log(item.price);
  return  total=total+item.price
})

console.log('total',total);


if(data)
   {
    res.status(200).json({
        success:true,
        error:false,
        details: data,
        total:total
        
    })
   }
   else
   {
    res.status(400).json({
        error:true,
        success:false,
        error:error.message
    })
   }
})

//aggregation sample - not using 
furnitureCartRouter.get('/view-cart2/:user_id',async(req,res)=>{
    try {
        const user_id= req.params.user_id

        const data= await furnitureModel.aggregate(
            [
                {
                  '$lookup': {
                    'from': 'furniture_cart_tbs', 
                    'localField': '_id', 
                    'foreignField': 'furniture_id', 
                    'as': 'result'
                  }
                }, {
                  '$unwind': {
                    'path': '$result'
                  }
                }, {
                  '$group': {
                    '_id': '$_id', 
                    'name': {
                      '$first': '$name'
                    }, 
                    'type': {
                      '$first': '$type'
                    }, 
                    'price': {
                      '$first': '$price'
                    }, 
                    'description': {
                      '$first': '$description'
                    }, 
                    'age': {
                      '$first': '$age'
                    }, 
                    'image': {
                      '$first': '$image'
                    }, 
                    'user_id': {
                      '$first': '$result.user_id'
                    }
                  }
                },
                {$match:{
                    user_id : new mongoose.Types.ObjectId(user_id)
                }

                }
              ]
        )
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
                success:false,
                error:true,
                message:error.message
            })
        }
    } 
    
    catch (error) {
        
    }
})

//delete cart products

furnitureCartRouter.post('/delete/:uid/:fid',async (req,res)=>{
    const user_id = req.params.uid
   console.log(user_id,'user-id');
    const furniture_id =req.params.fid
    console.log(furniture_id,'furniture_id');
const data= await furnitureModel.find({_id:furniture_id})
   console.log(data);
    const deleteData = await furnitureCartModel.deleteOne({furniture_id:furniture_id,user_id:user_id})
    console.log(deleteData);
    if(deleteData)
    {
        res.status(200).json({
            success:true,
            error:false,
            message:'deleted successfully',
            details:data
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
})

//order placed - status = 1

furnitureCartRouter.post('/set-order-status/:uid', async (req,res)=>{

  try {
    const user_id = req.params.uid
    console.log('uid',user_id);
    const statusUpdate= await furnitureCartModel.updateOne({user_id:user_id},{$set:{status:'1'}})
    console.log(statusUpdate);
    if(statusUpdate)
    {
      res.status(200).json({
        success:true,
        error:false,
        message:'Order placed successfully'
      })
    }
    else{
      res.status(400).json({
        success:false,
        error:true,message:error.message
      })
    }
    
  } 
  catch (error) {
    
  }
})

//view order

furnitureCartRouter.post('/view-order/:uid', async (req,res)=>{

  try {
    
    const user_id = req.params.uid
    const order= await furnitureModel.find({user_id:user_id, status:1})
    console.log(order);
    if(order)
    {
      res.status(200).json({
        success:true,
        error:false,
        details:order
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
    
  }
})
module.exports = furnitureCartRouter;