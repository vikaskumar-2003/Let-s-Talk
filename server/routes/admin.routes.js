import express from "express"
import { allChats, allMessages, allUsers, getDashboard } from "../controllers/admin.controllers.js"

const adminRoutes=express.Router()


// adminRoutes.get("/")

// adminRoutes.post("/verfiy")

// adminRoutes.get("/logout")

adminRoutes.get("/users",allUsers)

adminRoutes.get("/chats",allChats)

adminRoutes.get("/message",allMessages)

adminRoutes.get("/stats",getDashboard)

export  default adminRoutes