import { Avatar, IconButton, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const UserItem = ({user,handler,handlerIsLoading}) => {

   const {name,_id,avatar,isAdded}=user

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
        {name}
    </Typography>
    <IconButton size={"small"}
      sx={{
        bgcolor:isAdded?"error.main":"primary.main" ,
        color:"white",
        "&:hover":{
            bgcolor:isAdded?"error.dark":"primary.dark"
        }
      }}
    onClick={()=>handler(_id)} disabled={handlerIsLoading} >
{
  isAdded?<RemoveIcon/>:<AddIcon/>
}

       
    </IconButton>
   </Stack>
  </ListItem>
  )
}

export default memo(UserItem)