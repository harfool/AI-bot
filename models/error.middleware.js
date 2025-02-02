import errorResponse from "../utils/errorResponse";

const errorHandler = (err , res, req , next) =>{
    let err = {...err}
    err.message = err.message
    
}