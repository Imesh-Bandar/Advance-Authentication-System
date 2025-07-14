import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    // Additional fields for password reset and email verification
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    verificationToken:String,
    verificationExpires:Date


},{
    timestamps:true
})


const User=mongoose.model("User",userSchema);



export default User;