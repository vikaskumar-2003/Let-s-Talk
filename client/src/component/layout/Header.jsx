import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orange } from "../../Constant/color";

const Search=lazy(()=>import("../specific/Search"))
const Notification=lazy(()=>import("../specific/Notification"))
const NewGroupDialog=lazy(()=>import("../specific/NewGroupDialog"))


const Header = () => {
  const navigate = useNavigate();

  const [isMobile,setIsMobile]=useState(false)
    const [isSearch,setIsSearch]=useState(false)
      const [isNewGroup,setIsNewGroup]=useState(false)
            const [isNotification,setIsNotification]=useState(false)

  const handleMobile = () => {
    console.log("mobile");
    setIsMobile(prev=>!prev)
  };

  const openSearcGrouph = () => {
    console.log("seach");
    setIsSearch(!isSearch)
  };

  const openNewGroup = () => {
    setIsNewGroup(prev=>!prev)
  };

  const naviagetToGroup = () => {
    navigate("/group");
  };

  const openNotification=()=>{
    setIsNotification(prev=>!prev)
  }

   const logoutHandler=()=>{
    console.log("logout");
    
   }

  return (<>
    <Box sx={{ flexGrow: 1, height: "4rem" }}>
      <AppBar position="static" sx={{ bgcolor: orange }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Let's Talk
          </Typography>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" onClick={handleMobile}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <ToolBtn
              toolbar={"search"}
              icon={<SearchIcon />}
              onclick={openSearcGrouph}
            />

            <ToolBtn
              toolbar={"New Group"}
              icon={<AddIcon />}
              onclick={openNewGroup}
            />

            <ToolBtn
              toolbar={"Manage Group"}
              icon={<GroupIcon />}
              onclick={naviagetToGroup}
            />
 
            <ToolBtn
              toolbar={"Logout"}
              icon={<LogoutIcon/>}
              onclick={logoutHandler}
            />

            <ToolBtn
              toolbar={"Notification"}
              icon={<NotificationsIcon/>}
              onclick={openNotification}
            />
              

          </Box>
        </Toolbar>
      </AppBar>
    </Box>

      {
      isSearch&&(
       
       <Suspense fallback={<Backdrop open />} >
           <Search/>
       </Suspense>
      
      )
    }

     {
      isNotification&&(
       
       <Suspense fallback={<Backdrop open />} >
           <Notification/>
       </Suspense>
      
      )
    }
     {
      isNewGroup&&(
       
       <Suspense fallback={<Backdrop open />} >
         <NewGroupDialog/>
       </Suspense>
      
      )
    }
     

</>
    

  );
};

const ToolBtn = ({ toolbar, icon, onclick }) => {
  return (
    <Tooltip title={toolbar}>
      <IconButton color="inherit" size="large" onClick={onclick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
