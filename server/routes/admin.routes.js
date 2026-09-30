import express from "express"
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboard } from "../controllers/admin.controllers.js"
import { adminLoginValidator, validateHandler } from "../lib/validator.js"
import { isAdmin } from "../middlewares/auth.js"

const adminRoutes=express.Router()




 adminRoutes.post("/verify",adminLoginValidator(),validateHandler,adminLogin)

adminRoutes.get("/logout",adminLogout)

//only admin can access this routes

adminRoutes.use(isAdmin)

adminRoutes.get("/",getAdminData)

adminRoutes.get("/users",allUsers)

adminRoutes.get("/chats",allChats)

adminRoutes.get("/message",allMessages)

adminRoutes.get("/stats",getDashboard)

export  default adminRoutes