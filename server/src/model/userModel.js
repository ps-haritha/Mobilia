
const mongoose =require('mongoose')

 const schema = mongoose.schema
 
 const userSchema=
  {
    firstName:{type:String,required:true},
    lastName:{type:String},
    address:{type:String,required:true},
    mobile:{type:Number,required:true},
    login_id:{type:mongoose.Types.ObjectId,ref:'login_tb'},

  }
  const userModel=mongoose.model('user_tb',userSchema)

  module.exports=userModel