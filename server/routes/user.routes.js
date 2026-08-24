import express from "express"
import { acceptFriendRequest, getMyFriend, getMyNotifications, getMyProfile, login, logout, newUser, searchUser, sendFriendRequest } from "../controllers/user.controllers.js"
import {  singleAvatar } from "../middlewares/multer.js"
import { isAuthenticated } from "../middlewares/auth.js"
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandler } from "../lib/validator.js"



const router=express.Router()


router.post("/new",singleAvatar,registerValidator(),validateHandler,registerValidator,newUser)
router.post("/login",loginValidator(),validateHandler,login)


//after that we must logged in access the routes

 router.use(isAuthenticated)

 router.get("/me",isAuthenticated,getMyProfile)

 router.get("/logout",logout)

 router.get("/search",searchUser)

 router.put("/sendRequest",sendRequestValidator(),validateHandler,sendFriendRequest)

 
 router.put("/acceptRequest",acceptRequestValidator(),validateHandler,acceptFriendRequest)

 router.get("/notification",getMyNotifications)

 router.get("/freinds",getMyFriend)


export default router