import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.models.js";
import { deletFilesFilesFromCloudinary, emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

export const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2)
    return next(new ErrorHandler("for group alteat 2 member is required", 400));

  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `welcome to ${name} group`);
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(201).json({
    success: true,
    message: "group chat created",
  });
});

export const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name avatar",
  );

  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMember(members, req.user);

    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      name: groupChat ? name : otherMember.name,

      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }

        return prev;
      }, []),
    };
  });

  return res.status(200).json({
    success: true,
    message: transformedChats,
  });
});

export const getMyGroup = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const group = chats.map(({ members, _id, groupChat, name }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));

  return res.status(200).json({
    success: true,
    group,
  });
});

export const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  console.log("log chat id", chatId);

  if (!members) return next(new ErrorHandler("Please provide members", 400));

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 404));

  if (chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are mot allowed to add members", 403));

  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers);

  if (chat.members.length > 100)
    return next(new ErrorHandler("Group members limit reached", 400));

  await chat.save();

  const allUsersName = allNewMembers.map((i) => i.name).join(",");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUsersName} has been added in the group`,
  );

  return res.status(200).json({
    success: true,
    message: "member added successfully",
  });
});

export const removeMembers = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;

  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) return next(next(ErrorHandler("Chat not found", 404)));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 404));

  if (chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are mot allowed to add members", 403));

  if (chat.members.length <= 3) {
    return next(new ErrorHandler("Group must have at least 3 members", 400));
  }

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString(),
  );

  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${userThatWillBeRemoved} has been removed from the group`,
  );

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});

export const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 404));

  chat.member = chat.members.filter(
    (member) => member.toString() !== req.user.tpString(),
  );

  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString(),
  );

  if (chat.creator.toString() === req.user.toString()) {
    const randomeNumber = Math.floor(Math.random() * remainingMembers.length);

    const newCreator = remainingMembers[0];

    chat.creator = newCreator;
    await chat.save();
  }

  const user = await Promise.all([
    User.findById(req.user, "name"),
    chat.save(),
  ]);

  await chat.save();

  emitEvent(req, ALERT, chat.members, `  User ${user.name} has left the group`);

  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});

export const sendAttachemnt = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;


   const files = req.files || [];
   
   if(files.length<1) return next(new ErrorHandler("please upload aatachments",400))

    if(files.length>5) return next(new ErrorHandler("file can not be more than 5",400))
  
      



  //  const chat=await Chat.findById(chatId)

  const [chats, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name"),
  ]);

 

  if (files.length < 1)
    return next(new ErrorHandler("please provide attachment", 400));

  if (!chats) return next(new ErrorHandler("please provide attachment", 400));

  if (!chats) return next(new ErrorHandler("chat is not found", 404));

  //upload files here

  const attachemnts = [];

  const messageForDb = {
    content: "",
    attachemnts,
    sender: me._id,
    chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDb,
    sender: {
      _id: me._id,
      name: me.name,
    },
  };

  const message = await Message.create(messageForDb);

  emitEvent(req, NEW_ATTACHMENT, chats.members, {
    message: messageForRealTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
    chatId,
  });

  return res.status(200).json({
    message,
  });
});

export const getChatDetails = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();

    if (!chat) return next(new ErrorHandler("chat not found", 404));

    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);

    if (!chat) return next(new ErrorHandler("chat not found", 404));

    return 
      res.status(200),
      json({
        success: true,
        chat,
      })
    ;
  }
});

export const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("you are not allowed", 403));
  }

  chat.name = name;
  await chat.save();

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Group renamed successfully",
  });
});

export const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  const members = chat.members;

  if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler("your are not allowed to delte the group chat", 403),
    );
  }

  if (!chat.groupChat && !chat.members.includes(req.user.toString())) {
    return next(
      new ErrorHandler("your are not allowed to delte the group chat", 403),
    );
  }

  //here e have to delte message and file and image from cloudinary

  const messageWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  messageWithAttachments.forEach(({ attachments }) => {
    attachments.forEach((attachment) => {
      public_ids.push(attachment.public_id);
    });
  });

  await Promise.all([
    //delete fille from cloudinary

    deletFilesFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({chat:chatId})

  ]);


   emitEvent(req,REFETCH_CHATS,members)

  return res.status(200).json({
    success:true,
    message:"Chat deleted successfully"
  })


});


export const getMessage=TryCatch(async(req,res,next)=>{

  const chatId=req.params.id

  const {page=1}=req.query
  
const resultPerPage=20

  const skip=(page-1)*resultPerPage



  const [messages,totalMessageCount]=await Promise.all([

     Message.find({chat:chatId})
  .sort({createdAt:-1})
  .skip(skip)
  .limit(resultPerPage)
  .populate("sender","name")
  .lean(),
  Message.countDocuments({chat:chatId})

  ])



  

const totalPages=Math.ceil(totalMessageCount/resultPerPage)||0
 

   return res.status(200).json({
    success:true,
    message:messages.reverse(),
    totalPages
   })


})
