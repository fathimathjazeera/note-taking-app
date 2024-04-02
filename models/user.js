import mongoose from 'mongoose'




const userSchema=new mongoose.Schema({
    username:String,
    email:{type:String, required:true},
    password:{type:String, required:true},
})


const UserModel = mongoose.model('users',userSchema)

export default UserModel