import dotenv from "dotenv";
dotenv.config({
    quiet:true,
    path:"./.env"

})

import express from "express"
import router from "./routes/user.routes.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import chatRoute from "./routes/chat.routes.js";
import { createUser } from "./seeders/user.js";
import { createGroupChats, createMessagesInAChat, createSingleChats } from "./seeders/chat.js";
import adminRoutes from "./routes/admin.routes.js";







const mongoURI=process.env.MONGO_URI
const PORT=process.env.PORT||3000


connectDB(mongoURI)





const app=express()


app.use(express.json())
app.use(cookieParser())
app.use(errorMiddleware)


app.use("/auth/user",router)
app.use("/api/chat",chatRoute)
app.use("/api/admin",adminRoutes)



app.listen(PORT,()=>{
    console.log("server is statred");
    
})

