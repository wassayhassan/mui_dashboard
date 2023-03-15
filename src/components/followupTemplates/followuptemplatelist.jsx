import React from "react"
import { Box, Typography, IconButton, useTheme } from "@mui/material"
import { AiOutlineDelete } from "react-icons/ai"
import FollowTemplateModalEdit from "./followupTemplateEdit"
import { deleteFollowUp } from "utils"

export const FollowupTemplateList = ({followupTemplates, idx, setFollowupTemplates})=> {
    const theme = useTheme();

    async function handleDeleteItem(id){
      let res = await deleteFollowUp(id);
      console.log(res);
      let newtemp = followupTemplates.filter((t)=> {
        if(t._id !== id)
        return t;
      })
      setFollowupTemplates(newtemp);

    }
    return (
       <Box>
         {followupTemplates.map((temp, idx)=> {
                   return(     <Box key={"followuptemplatebox-"+idx} sx={{backgroundColor: theme.palette.background.alt, borderRadius: "5px",margin: 1, padding: 2, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Box>
                          <Box>
                              <Typography variant='h5' sx={{fontWeight: "bold"}}> {temp.name}</Typography>
                          </Box>
                          <Box>
                              {/* <Typography>{temp.text}</Typography> */}
                          </Box>
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "row"}}>
                          <IconButton onClick={()=> handleDeleteItem(temp._id)} > <AiOutlineDelete  className='cursor-pointer m-2' size="1.5em" /> </IconButton>
                          <FollowTemplateModalEdit id={temp._id} followupTemplates={followupTemplates} setFollowupTemplates={setFollowupTemplates} />
                            {/* <MessageTemplateModal messageTemplates={messageTemplates} setMessageTemplates={setMessageTemplates} temp={temp} /> */}
                            {/* <FiEdit className='cursor-pointer m-2' size="1.5rem" /> */}
                        </Box>
                      </Box>)
         })}
       </Box>
    )
}