
const mongoose = require('mongoose')


const schema = mongoose.Schema


const furnitureCartSchema=
{
    furniture_id: {type:mongoose.Types.ObjectId,ref:'furniture_tb'},         //foreign key
    user_id: {type:mongoose.Types.ObjectId,ref:'user_tb'},                   //foreign key
    quantity: {type:Number,required:true},
    status: {type:Number,required:true}
}
const furnitureCartModel = mongoose.model('furniture_cart_tb',furnitureCartSchema)


 module.exports =furnitureCartModel;