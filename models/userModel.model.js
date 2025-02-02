import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken";
import cookie from 'cookie'
// models

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : [true , "UserName is Required"]
    },
    email : {
        type : String ,
        unique : true,
        required : [true , "Email is Required"]

    },
    password :{
        type : String ,
        required : [ true , "Password is required"],
        minlength : [ 6, "Password should be 6 character long"]
    },
    customerId : {
        type : String ,
        default : ""
    },
    subscription :{
        type : String,
        default : ""
    }

},{timestamps : true})

// hash password
userSchema.pre("save"   ,  async function  (next){
    // update 
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt);
    next()
})

// match password
userSchema.methods.matchPassword = async  function(password){
    return  await bcrypt.compare(password , this.password)
}

//Sign Token 
userSchema.methods.getSignedToken =  function(res) {
     
    const accessToken = JWT.sign({id : this._id} , process.env.JWT_ACCESS_SECRET , {expiresIn :process.env.JWT_ACCESS_EXPIREIN} )

    const refreshToken = JWT.sign({id : this._id } , process.env.JWT_REFRESH_TOKEN ,{expiresIn : process.env.JWT_REFRESH_EXPIREIN })

    res.cookie("refreshToken" , refreshToken , {
        maxAge : 86400 * 7000,
        httpOnly : true
    }) 
    
const User = mongoose.model("User" , userSchema)
export default User;