import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  isOnline,
  sameSender,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link sx={{padding:"",textDecoration:"none"}} to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)} >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin:"0.5rem",
          padding: "1rem",
       backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        
    

       <Stack direction="row" sx={{alignItem:"center"}}  spacing={10}>
    <AvatarCard avatar={avatar}/>
    
    <Stack>

        <Typography sx={{marginRight:"30px"}}>
      {
        name
      }
    </Typography>

  {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}

             
       {isOnline && <Box sx={{

         width:"10px",
         height:"10px",
         borderRadius:"50%",
         bgcolor:"green",
         position:"absolute",
         top:"50%",
         
         right:"1rem",
         transform:"translateY(-50%)"           

       }}
           
       /> 
       
       
        
      }





    </Stack>

  

       </Stack>


      </div>
    </Link>
  );
};

export default memo(ChatItem) ;
