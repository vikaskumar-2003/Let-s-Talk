import { Avatar, Button, Dialog, DialogTitle, IconButton, InputAdornment, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material'
import React, { memo } from 'react'
import { samplNotification } from '../../Constant/sampleData'
import AddIcon from '@mui/icons-material/Add';

const Notification = () => {


   const friendRequestHandler=({_id,accept})=>{
   
    

   }

  return (
   <Dialog
      open
      PaperProps={{
        sx: {
          width: "25rem",
          maxWidth: "90vw",
        },
      }}
    >
<Stack p={{xs:"1rem",sm:"2rem" }}  >
  <DialogTitle>
    {
      samplNotification.length>0?(
      
      samplNotification.map((i)=><NotificationItem key={i._id} _id={i._id} sender={i._id}  handler={friendRequestHandler} />)
      
      ):(
        <Typography sx={{textAlign:center}}>
          No  Notification
        </Typography>

      )
    }
  </DialogTitle>
</Stack>
    </Dialog>
  )
}


const NotificationItem=memo(({sender,_id,handler})=>{


  const {name,avatar}=sender

 return (
  <ListItem sx={{
 
   


  }} >
   <Stack direction={"row"} 
    spacing={1}
     sx={{
        alignItems:"center",
        spacing:"1rem",
        width:"100%",
        
     }}
   >
    <Avatar/>
    <Typography variant='boady1' sx={{flexGrow:1,display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis",width:"100%"}}>
        {`${name} sent you a freind request`}
    </Typography>
    

    <Stack direction={{
      xm:"column",
      sm:"row"
    }} >
      <Button onClick={()=>handler({_id,accept:true})} >Accept</Button>
        <Button color="error" onClick={()=>handler({_id,accept:false})} >Reject</Button>
    </Stack>

   </Stack>
  </ListItem>
  )


})

export default Notification