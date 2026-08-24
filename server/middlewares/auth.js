import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken"

export const isAuthenticated=TryCatch(async(req,res,next)=>{


   const token=req.cookies["chattu-token"]

   if(!token){
    return next(new ErrorHandler("please provide token",400))
   }

   const decodedData=jwt.verify(token,process.env.JWT_SECRET)

   req.user=decodedData._id

    console.log(decodedData);
    
   

   next()

})