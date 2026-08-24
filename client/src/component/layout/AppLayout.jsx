import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import Grid from "@mui/material/Grid";

import ChatList from "../specific/ChatList";
import { sampleChats } from "../../Constant/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {

   const params=useParams()
    const chatID=params.chatId

    const handleDeleteChat=(e,_id,groupChat)=>{
      e.preventDefault()
      console.log("delte");
      
    }

    return (
      <>
        <Title />
        <Header />

        <Grid
          container
          sx={{
            height: "calc(100vh - 4rem)",
          }}
        >
          <Grid
            size={3}
              sx={{display:{sm:"block",xs:"none"}}}
          >
            <ChatList chats={sampleChats} chatId={chatID} 
             handleDeleteChat={handleDeleteChat}
            onlineUsers={["1","2"]}
            
            />
            
          </Grid>

          <Grid
            size={7}
           
          >
            <WrappedComponent {...props} />
          </Grid>

          <Grid
            size={2}
            sx={{display:{xs:"none",md:"block"},padding:"2rem",bgcolor:"black", color:"white"}}
          >
           <Profile/>
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;