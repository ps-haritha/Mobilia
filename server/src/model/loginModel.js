const mongoose = require('mongoose')


const schema = mongoose.Schema

const loginSchema={
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String},
}
const loginModel = mongoose.model('login_tb',loginSchema);
module.exports=loginModel;

