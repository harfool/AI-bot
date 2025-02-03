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

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Method to match password
  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

//Sign Token 
userSchema.methods.getSignedToken = function (res) {
    const accessToken = JWT.sign({ id: this._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIREIN });
    const refreshToken = JWT.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_EXPIREIN });

    res.cookie("refreshToken", refreshToken, {
        maxAge: 86400 * 7000,
        httpOnly: true
    });

    return { accessToken, refreshToken };
};

    export const User = mongoose.model("User", userSchema)
