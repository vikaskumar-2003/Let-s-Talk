import React, { useState } from 'react'
import { Avatar, Button, Dialog, DialogTitle, IconButton, InputAdornment, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material'
import  {sampleUser} from "../../Constant/sampleData"
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp'

const NewGroupDialog = () => {

 

  const [members,setMembers]=useState(sampleUser)
  const [selectedMemeber,setSelectedMemeber]=useState([])

  const submitHandler=()=>{

     

  }

   const selectMemebrHandler=(id)=>{


   setMembers(prev=>prev.map(user=>user._id===id?{...user,isAdded:!user.isAdded}:user))


setSelectedMemeber(prev=>prev.includes(id)?prev.filter((i)=>i!==id):[...prev,id])
   
  }


  const closeHandler=()=>{

    

  }

  console.log(selectedMemeber);

  const groupName=useInputValidation("")

  return (
    <Dialog
      open 
      onClose={closeHandler}
      PaperProps={{
        sx: {
          width: "25rem",
        
        },
      }}
    >
<Stack p={{xs:"1rem",sm:"2rem" }} sx={{width:'25rem'}} spacing={"2rem"} >
  <DialogTitle sx={{textAlign:"center"}} variant='h4' >New Group </DialogTitle>
  
  <TextField label={"Group Name"} value={groupName.value} onChange={groupName.changeHandler}/>

  <Typography variant='body1' >
    members
  </Typography>

  <Stack>
   {members.map((i) => {
               return (
                 <UserItem
                 isAdded={selectedMemeber.includes(i._id)}
                   user={i}
                   key={i._id}
                   handler={selectMemebrHandler}
                  //  handlerIsLoading={IsLoadingFriendRequest}
                 />
               );
             })}
 
   </Stack>

   <Stack direction={"row"} sx={{justifyContent:"space-evenly",m:"20px"}} >
         <Button  variant='text' color="error" size={'large'}>
          Cancel
         </Button>
         <Button  variant="contained" onClick={submitHandler} >
          Create
         </Button>
   </Stack>

</Stack>
    </Dialog>
  )
}

export default NewGroupDialog