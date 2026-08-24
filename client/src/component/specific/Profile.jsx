import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import FaceIcon from '@mui/icons-material/Face';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment"


const Profile = () => {
  return (
    <Stack>

    <Avatar
      sx={{
        width:200,
        height:200,
      "& img": { objectFit: "contain", },
        marginBottom:"1rem",
        border:"5px solid white"
      }}
    />
    <ProfileCard heading={"bio"} text={"sada dasdasd anssdasd sad"} />
     <ProfileCard heading={"username"} text={" dasdasd  sad"} icon={ <AlternateEmailIcon/>} />
      <ProfileCard heading={"name"} text={"vikas"} icon={<FaceIcon/>} />
 <ProfileCard heading={"name"}   text={moment('Mon Aug 10 2026 00:00:00 GMT+0530').fromNow()} icon={<CalendarMonthIcon/>} />
    </Stack>
  )
}

const ProfileCard=({text,icon,heading})=>{

  return(
  <div>
    <Stack direction="row"  sx={{ textAlign:"center" }} spacing={1}   >


     {icon &&icon}

     <Stack>
      <Typography>{text}</Typography>
        <Typography color={"gray"} variant={"caption"} >{heading}</Typography>
     </Stack>

    </Stack>
  </div>)
}

export default Profile