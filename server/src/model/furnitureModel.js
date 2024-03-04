
const mongoose = require('mongoose')
const schema= mongoose.Schema


const furnitureSchema={
    name:{type:String,required:true},
    type:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String},
    age:{type:String,required:true},
    image:{type:String,required:true},
    status:{type:Number,required:true},
    user_id:{type:mongoose.Types.ObjectId,ref:'user_tb'}

}

const furnitureModel=mongoose.model('furniture_tb',furnitureSchema)
module.exports=furnitureModel;