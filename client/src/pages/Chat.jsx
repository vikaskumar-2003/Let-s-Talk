import React, { Fragment, useRef } from "react";
import AppLayout from "../component/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { grayColor, orange } from "../Constant/color";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { InputBox } from "../component/styles/StyledComponents";
import SendIcon from "@mui/icons-material/Send";
import FileMenu from "../component/dialogs/FileMenu";
import { sampleMessage } from "../Constant/sampleData";
import MessageComponent from "../component/shared/MessageComponent";

const user={
  _id:"sdfsdfsd",
  name:"abhi"
}

const Chat = () => {

  const containerRef = useRef(null);
  
  const fileMenuRef=useRef(null)



  return (
    <Fragment>
      <Stack
        spacing={1}
        ref={containerRef}
        sx={{
          boxSizing: "border-box",
          padding: "1rem",
          
          bgcolor: grayColor,
          height: "90%",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >

        {
            
          sampleMessage.map(i=>(
            <MessageComponent key={i._id} message={i} user={user} />
          ))

        }
      </Stack>

      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            height: "90%",
            padding: "1rem",
            alignItems: "center",
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type Message Here... " />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu  />
    </Fragment>
  );
};

export default AppLayout()(Chat);
