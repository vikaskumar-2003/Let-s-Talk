import mongoose from "mongoose"
import jwt from "jsonwebtoken"

 const connectDB=async(uri)=>{
    try {
        

    const data=  await mongoose.connect(uri,{dbName:"let's_Talk"})
  console.log("connect to db",data.connection.host);
  
    } catch (error) {
   console.log(error);
   
    }
}


 const cookieOption={maxAge:15*24*60*60*1000,sameSite:"none",httpOnly:true,secure:true}

 const sendToken=(res,user,code,message)=>{
  



    const token=jwt.sign({_id:user._id,},process.env.JWT_SECRET,)


    return res.status(code).cookie("chattu-token",token,cookieOption).json({
        success:true,
        token,
        message,
        
    })


}

const emitEvent=(req,event,users,data)=>{
console.log("emiting event");

}


const deletFilesFilesFromCloudinary=async(punlic_ids)=>{
    
}


export {connectDB,cookieOption,sendToken,emitEvent,deletFilesFilesFromCloudinary}






