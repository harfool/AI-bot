import errorHandler from "../middleware/error.middleware.js";
import { User } from "../models/userModel.model.js";
import errorResponse from "../utils/errorResponse.js";

const genrateToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

const regisiterContoller = async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;
    // check exisiting Email
    const exisitingEmail = await User.findOne({ email });
    if (exisitingEmail) {
      return next(new errorResponse("Email is already register", 500));
    }
    const user = await User.create({ userName, password, email });
    genrateToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const loginController = async (req , res , next) => {
    try {
        const {email , password} = req.body
        //validation
        if (!email || !password) {
            return next(new errorResponse("Please provide email or password"))
        }

    const user = await User.findOne({email})
    
    if (!email) {
        return next(new errorResponse("invalid Creditial" , 401))
    }
      
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return next(new errorResponse("Invalid credentials", 401));
    }

    //res 
    genrateToken(user , 200 , res)
    } catch (error) {
        console.log(error)
        next(error)
    }
};

const logoutController = async (req , res) => {
    res.clearCookie("refreshToken")
    return res.status(200).json({
        success : true ,
        message : "Logout Successfully",
    })
};


export { regisiterContoller, loginController, logoutController, genrateToken };
