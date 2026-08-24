import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { matBlack, orange } from "../Constant/color";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from '@mui/icons-material/Edit';

import DoneIcon from '@mui/icons-material/Done';
import AvatarCard from "../component/shared/AvatarCard";
import { sampleChats } from "../Constant/sampleData";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ConfirmDeleteDialog=lazy(()=>import("../component/dialogs/ConfirmDeleteDialog"))

const Group = () => {
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const[confirmDeleteDialog,setConfirmDeleteDialog]=useState(false)
 

  const [groupName,setGroupName]=useState("")
  const[groupNameUdatedValue,setGroupNameUpdatedValue]=useState("")

  const updateGroupName=()=>{
    setIsEdit(false)
    console.log(groupNameUdatedValue);
    
  }

   const openConfirmDeleteHandle=()=>{
    setConfirmDeleteDialog(true)
   }

   const closeConfirmDeleteHandle=()=>{
    setConfirmDeleteDialog(false)
   }

   const openAddMemberHandler=()=>{}

  console.log(chatId);
  

  useEffect(()=>{

    console.log("hiiii");
    
     setGroupName(`Group Name ${chatId}`)
      setGroupNameUpdatedValue(`Group Name ${chatId}`)

      return()=>{
        setGroupName("")
      setGroupNameUpdatedValue("")
      setIsEdit(false)
      }
  },[chatId])

  const GroupName = (
    <Stack direction={'row'} sx={{alignItems:"center",justifyContent:"center",padding:'3rem'}} spacing={1} >
      {isEdit ? (
        <>
         <TextField value={groupNameUdatedValue} onChange={(e)=>setGroupNameUpdatedValue(e.target.value)} />
         <IconButton onClick={updateGroupName}>
          <DoneIcon/>
         </IconButton>
        
        </>
      ) : (
        <>
          <Typography   variant="h4">{groupName}</Typography>
          <IconButton onClick={()=>setIsEdit(true)} ><EditIcon/></IconButton>
        </>
      )}
    </Stack>
  );

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <Tooltip title="menu">
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            color: "white",
            left: "2rem",
            bgcolor: matBlack,
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );


  const BtnGroup=<Stack
    direction={{sm:"row",xs:"column-reverse"}} spacing={1} sx={{p:{sm:"1rem",xs:"0",md:"1rem 4rem"}}}
  >

   <Button  size="large" variant="contained" startIcon={<DeleteIcon/>} color="error" onClick={closeConfirmDeleteHandle} >Delete Group</Button>
   <Button size="large" variant="contained" startIcon={<AddIcon/>} onClick={openConfirmDeleteHandle} >Add Member</Button>

  </Stack>

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        size={{ sm: 4 }}
        sx={{
          height: "100%",
          bgcolor: orange,
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <GroupList myGroups={sampleChats} />
      </Grid>

      <Grid
        size={{ xs: 12, sm: 8 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
        {groupName&&<>{
GroupName

}
<Typography sx={{margin:"2rem",alignSelf:"flex-start"}} variant="body1">
  Memebers
</Typography>


    <Stack  
    spacing={2}
    
     sx={{
      maxWidth:"45rem",
      width:"100%",
      boxSizing:"border-box",
      bgcolor:"bisque",
      height:"50vh",
      padding:{
        sm:"1rem",
        xs:"0",
        md:"1rem 4rem"
      },
      overflow:"auto"
     }}
    >

    </Stack>
{
  BtnGroup
}

        </>}
      </Grid>


      {
        confirmDeleteDialog&& <>
        <Suspense fallback={<Backdrop open />}>

           <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandle} />
        </Suspense>
         </>
      }

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupList myGroups={sampleChats} chatId={chatId} w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack sx={{ width: w }}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography sx={{ textAlign: "center", padding: "1rem" }}>
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
      to={`?group=${_id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Stack direction={"row"} spacing={10} sx={{ alignItems: "center" }}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Group;
