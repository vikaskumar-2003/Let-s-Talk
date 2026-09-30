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


export const isAdmin=TryCatch(async(req,res,next)=>{


   const token=req.cookies["chattue-admin-token"]

   if(!token){
    return next(new ErrorHandler("only admin can access this routes",400))
   }

   const secretKey=jwt.verify(token,process.env.JWT_SECRET)

    
  const adminSecretKey=process.env.ADMIN_SECRET_KEY||"POKEMON"

  const isMatch=secretKey===adminSecretKey

    if(!isMatch) return next(new ErrorHandler("only admin can access",401))


  

    
   

   next()

})