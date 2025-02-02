import express from "express"
import {regisiterContoller ,loginController , logoutController} from '../controllers/authContoller.js'
const router = express.Router()

// routes

router.post("/register" , regisiterContoller )
router.post("/login" , loginController)
router.post("/logout" , logoutController)

export default  router