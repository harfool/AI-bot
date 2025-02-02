import mongoose from "mongoose";
import colors from 'colors'

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`connect mongodb database ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`mongodb connection error ${error}`.bgRed.white)
    }
}

export default dbConnection