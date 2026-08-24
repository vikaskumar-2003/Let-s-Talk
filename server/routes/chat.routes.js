import expess from "express"
import { isAuthenticated } from "../middlewares/auth.js"
import { addMembers, deleteChat, getChatDetails, getMessage, getMyChats, getMyGroup, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachemnt } from "../controllers/chat.conrtollers.js"
import { attachmentMulter } from "../middlewares/multer.js"
import { addMemberValidator, chatIdValidator, leaveGroupValidaotr, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, validateHandler } from "../lib/validator.js"


const chatRoute=expess.Router()

chatRoute.use(isAuthenticated)

chatRoute.post("/new",newGroupValidator(),validateHandler,newGroupChat)
chatRoute.get("/my",getMyChats)
chatRoute.get("/my/groups",getMyGroup)
chatRoute.put("/addmember",addMemberValidator,validateHandler,addMembers)
chatRoute.put("/removemember",removeMemberValidator(),validateHandler,removeMembers)
chatRoute.delete("/leave/:id",chatIdValidator(),validateHandler,leaveGroup)
//send attachments

chatRoute.post("/message",sendAttachmentsValidator(),validateHandler,attachmentMulter,sendAttachemnt)



//get message
chatRoute.get("/message/:id",chatIdValidator(),validateHandler,getMessage)




//get chat details,rename,delete
chatRoute.route("/:id").get(chatIdValidator(),validateHandler,getChatDetails).put(renameValidator(),validateHandler,renameGroup).delete(deleteChat)




export default chatRoute