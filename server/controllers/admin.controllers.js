import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.models.js";
import { Chat } from "../models/chat.model.js";
import { ErrorHandler } from "../utils/utility.js";
import { Message } from "../models/message.model.js";
import jwt from "jsonwebtoken"
import { cookieOption } from "../utils/features.js";

export const allUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  const transformedUsers = await Promise.all( users.map(async({ name, username, avatar, _id }) => {


    const[groups,friends]=await Promise.all([Chat.countDocuments({groupChat:true,members:_id}),
    Chat.countDocuments({groupChat:false,members:_id})
    ]
  )


    return { name, username, avatar: avatar.url, _id ,groups,friends};
  }));

  return res.status(200).json({
    message: "success",
    users:transformedUsers,
  });
});


export const allChats=TryCatch(async(req,res,next)=>{

  const chats=await Chat.find({}).populate("members","name avatar").populate("creator","name avatar")




  if(!chats) return next(new ErrorHandler("chat not found",404))

  const transformedChat=await Promise.all(chats.map(async({members,_id,groupChat,name,creator})=>{

  const totalMessages=await Message.countDocuments({chat:_id})


    return {
      _id,
      groupChat,
      name,
      avatar:members.slice(0,3).map((member)=>member.avatar.url),
      members:members.map(({_id,name,avatar})=>{
        return{
          _id,
          name,
          avatar:avatar.url
        }
      }),
      creator:{
  
        name:creator?.name||"Npne",
        avatar:creator?.avatar.url||""
      },
      totalMembers:members.length,
      totalMessages,
    }

  }))


 return res.status(200).json({
  status:"success",
  chats:transformedChat
 })

})


export const allMessages=TryCatch(async(req,res,next)=>{

const messages=await Message.find({}).populate("sender","name avatar").populate("chat","groupChat")

console.log("messagess",messages);


const transformedMessages=messages.map(({content,attachments,_id,sender,createdAt,chat})=>({

   _id,attachments,content,createdAt,
   chat:chat._id,
   groupChat:chat.groupChat,
   sender:{
    _id:sender._id,
    name:sender.name,
    avatar:sender.avatar.url
   }

}))


return res.status(200).json({
  success:true,
  messages:transformedMessages
})



})


export const getDashboard=TryCatch(async(req,res)=>{

  const [groupsCount,totalChatsCounts,messagesCount,usersCount]=await Promise.all([
    Chat.countDocuments({groupChat:true}),
    Chat.countDocuments(),
    Message.countDocuments(),
    User.countDocuments()
  ])


  const today=new Date()

  const last7D=new Date()
last7D.setDate(last7D.getDate()-7)

 const last7Daysmessages=await Message.find({
  createdAt:{$gte:last7D,
    $lte:today
  }
 }).select("createdAt")

 const messages=new Array(7).fill(0)
  const daysInMilisecond=1000*60*60*24


 last7Daysmessages.forEach(message=>{

  const indexApprox=(today.getTime()-message.createdAt.getTime())/
  daysInMilisecond

  const index=Math.floor(indexApprox)

  messages[6-index]++



 })


  const stats={
    groupsCount,totalChatsCounts,messagesCount,usersCount,messaheChart:messages
  }


  return res.status(200).json({
    success:true,
    stats,
    
  })



})



export const adminLogin=TryCatch((req,res,next)=>{


  const{secretKey}=req.body

  const adminSecretKey=process.env.ADMIN_SECRET_KEY||"POKEMON"

  const isMatch=secretKey===adminSecretKey
  
  if(!isMatch) return next(new ErrorHandler("Invalid admin key",401))


  const token=jwt.sign(secretKey,process.env.JWT_SECRET)

   return res.status(200).cookie("chattue-admin-token",token,{...cookieOption,maxAge:1000*60*15}).json({
    success:true,
    message:"Authenticated successfully admin"
   })


})


export const adminLogout=TryCatch((req,res,next)=>{



   return res.status(200).cookie("chattue-admin-token","",{...cookieOption,maxAge:0}).json({
    success:true,
    message:"Logout successfully"
   })


})


export const getAdminData=TryCatch((req,res,next)=>{

  return res.status(200).json({
    admin:true
  })
 


})







