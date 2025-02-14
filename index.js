import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import colors from 'colors'
import bodyParser   from 'body-parser'
import dotenv from 'dotenv'
import dbConnection from './config/DB.js'
import authRoutes from './routes/authRoutes.js'
import JarvusRoutes from './routes/JarvusRoutes.js'
import errorHandler from './middleware/error.middleware.js'
dotenv.config({ path: './.ENV' })


const app = express()
const PORT = process.env.PORT || 8000

// mongo connection
dbConnection()

//middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(morgan("dev"))
app.use(errorHandler)

// API routes
app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/jarvus/ai" , JarvusRoutes )
app.listen(PORT , ()=>{
    console.log(`app listen on port in ${process.env.PORT}`.bgCyan.white)
})