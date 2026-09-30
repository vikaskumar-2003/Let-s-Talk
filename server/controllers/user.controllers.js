import { User } from "../models/user.models.js";
import { cookieOption, emitEvent, sendToken } from "../utils/features.js";
import bcrypt from "bcryptjs";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "../middlewares/error.js";
import { Request } from "../models/request.model.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { Chat } from "../models/chat.model.js";
import { getOtherMember } from "../lib/helper.js";

//create a user and save a cookie
export const newUser = TryCatch(async (req, res,next) => {
 
    const { name, username, bio, password } = req.body;

    if (!name || !username || !bio || !password) {
      return res.status(400).json({
        success: false,
        message: "enter all feild",
      });
    }

    if(!req.file){
      return next(new ErrorHandler("pease upload avatar",400 ))
    }

    const avatar = {
      public_id: "sdf",
      url: "tututut",
    };

    const user = await User.create({ name, password, username, bio, avatar });

    sendToken(res, user, 201, "User created");
   
})

export const login = TryCatch( async (req, res, next) => {

    console.log("body", req.body);

    const { username, password } = req.body;


        if (req.cookies["chattu-token"]) {
      return next(new ErrorHandler("you are already login",400))
    }


    const user = await User.findOne({ username }).select("+password");

    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Ivalid password",404));
    }

   

    sendToken(res, user, 200, "Welcome Back");
  
})

export const getMyProfile = async (req, res) => {
 

   const user=  await User.findById(req.user).select("-password")

    res.status(200).json({
        success:true,user
    })

};



export const logout =TryCatch(async(req,res,next)=>{

    return res.status(200).cookie("chattu-token","",{...cookieOption,maxAge:0}).json({
        success:true,
        message:"user logout successfully"
    })

})



export const   searchUser=TryCatch(async (req,res)=>{


   const {name}=req.query

   const myChats=await Chat.find({groupChat:false,members:req.user})
   
   const allUsersFromMyChats=myChats.map((chat)=>chat.members).flat()

   //
   const allUsersExceptMeAndFriends=await User.find({
    _id:{$nin:allUsersFromMyChats},
     name:{$regex:name,$options:"i"}
   })

   const users=allUsersExceptMeAndFriends.map(({_id,name,avatar})=>({_id,name,avatar:avatar.url}))

    return res.status(200).json({
        success:true,
        users
    })

} )



export const sendFriendRequest =TryCatch(async(req,res,next)=>{


   const {userId}=req.body

   const request=await Request.findOne({
    $or:[{sender:req.user,receiver:userId},{sender:userId,receiver:req.user}]
   })

   if(request) return next(new ErrorHandler("Request already sent",400))

    await Request.create({
      sender:req.user,
      receiver:userId
    })

    emitEvent(req,NEW_REQUEST,[userId])

    return res.status(200).json({
        success:true,
        message:"freind request sent"
    })

})


export const acceptFriendRequest=TryCatch(async(req,res,next)=>{

  

   const {requestId,accept}=req.body

   const request=await Request.findById(requestId)
   .populate("sender","name")
   .populate("receiver","name")


   if(!request) return next(new ErrorHandler("Request not found",404))


   if(request.receiver.toString()!==req.user.toString()){
    return next(
      new ErrorHandler("you are not authorized to accept this request",401)
    )
   }

if(!accept){

  await request.delete()

  return res.status(200).json({
    success:true,
    message:"Friend Request Rejected"
  })
}


const members=[request.sender._id,request.receiver._id]

 await Promise.all([
  Chat.create({
    members,
    name:`${request.sender.name}-${request.receiver.name}`
  }),
  request.deleteOne()
 ])

 emitEvent(req,REFETCH_CHATS,members)

    return res.status(200).json({
        success:true,
        message:"freind request acept"
    })


})


export const getMyNotifications=TryCatch(async(req,res,next)=>{


    const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));

  return res.status(200).json({
    success: true,
    allRequests,
  });

})

export const getMyFriend=TryCatch(async(req,res,nex)=>{

  const chatId=req.query.chatId

  const chats=await Chat.find({
    members:req.user,
    groupChat:false,

  }).populate("members","name avatar")

  const friends=chats.map(({members})=>{
    
       const otherUser=getOtherMember(members,req.user)

       return{
        _id:otherUser._id,
        name:otherUser.name,
        avatar:otherUser.avatar.url
       }

  })

  if(chatId){
const chat =await Chat.findById(chatId)

  const availableFriend=friends.filter(
    (friend)=>!chat.members.includes(friend.public_id)
  )

  return res.status(200).json({
      success:true,
      friends:availableFriend
    })

  }
  else{
    return res.status(200).json({
      success:true,
      friends
    })
  }




})

