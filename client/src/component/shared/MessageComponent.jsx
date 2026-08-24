import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import { lightGlow } from '../../Constant/color'
import moment from 'moment'
import { fileFormat } from '../../lib/features'
import RenderAttachment from './RenderAttachment'

const MessageComponent = ({message,user}) => {

   const{sender,content,attachments=[],createdAt}=message
  
   const sameSender=sender?._id===user?._id

   console.log(attachments);
   

   const timeAgo=moment(createdAt).fromNow()
  //  console.log("timeago",timeAgo);
   

  return (
    <div
   
    style={{
      alignSelf:sameSender?"flex-end":"flex-start",
      background:"white",
      color:"black",
      borderRadius:"5px",
      padding:"0.5rem",
      width:"fit-content"
    }}
     
    >

       

     {
      !sameSender && <Typography sx={{color:lightGlow,fontWeight:"600" }} variant='caption' >{sender?.name}</Typography>

     }


     {content&& <Typography>{content}</Typography>}

     {/* Arrachment */}

     

     {
      attachments.length>0&& attachments.map((attach,index)=>{
 
         const url= attach.url
         const file=fileFormat(url)


             {console.log("i amm");
             }
         return<Box key={index}>
          <a href={url} target='_blank' download style={{color:"black"}} >
            
            <RenderAttachment file={file} url={url}/>
            {RenderAttachment(file,url)}
          </a>
         </Box>

      })
     }


    <Typography variant='caption' color={"text.secondary"} >{timeAgo}</Typography>


    </div>
  )
}

export default memo(MessageComponent)