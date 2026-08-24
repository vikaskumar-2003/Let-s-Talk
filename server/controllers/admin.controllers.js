import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.models.js";
import { Chat } from "../models/chat.model.js";
import { ErrorHandler } from "../utils/utility.js";
import { Message } from "../models/message.model.js";

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


const transformedMessages=messages.map((content,attachments,_id,sender,createdAt,chat)=>({

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


  const stats={
    groupsCount,totalChatsCounts,messagesCount,usersCount
  }


  return res.status(200).json({
    success:true,
    stats
  })



})
