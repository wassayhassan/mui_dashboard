import * as React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import {useTheme} from '@mui/material';
import {FiEdit} from "react-icons/fi";
import {AiOutlineDelete} from 'react-icons/ai';
import MessageTemplateModal from './messageTemplateModalEdit';
import { handleDeleteTemplate } from 'utils';
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'text', headerName: 'Content', width: 130 },
  {
    field: 'createdBy',
    headerName: 'Created By',
    width: 90,
  },
  {
    field: "createdAt",
    headerName: "created At",
    type: "date",
    width: "90",
  }
];



export default function DataTable({messageTemplates, setMessageTemplates}) {
  const theme = useTheme();


  async function handleDeleteItem(id){
    let res = await handleDeleteTemplate(id);
    if(res.status === 200){
      let newTemps = messageTemplates.filter((templat)=> {
        if(templat._id !== id){
           return templat;
        }
      })
      setMessageTemplates(newTemps);
    }
  
  }


  return (
    <div style={{ width: '700px',height: "500px" }}>
      <div>
         {messageTemplates.map((temp, idx)=> {
           return (
            <Box key={"templatebox-"+idx} sx={{backgroundColor: theme.palette.background.alt, borderRadius: "5px",margin: 1, padding: 2, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Box>
                <Box>
                    <Typography variant='h5' sx={{fontWeight: "bold"}}> {temp.name}</Typography>
                </Box>
                <Box>
                    <Typography>{temp.text}</Typography>
                </Box>
              </Box>
              <Box sx={{display: "flex", flexDirection: "row"}}>
                <IconButton onClick={()=> handleDeleteItem(temp._id)} > <AiOutlineDelete  className='cursor-pointer m-2' size="1.5em" /> </IconButton>
                  <MessageTemplateModal messageTemplates={messageTemplates} setMessageTemplates={setMessageTemplates} temp={temp} />
                  {/* <FiEdit className='cursor-pointer m-2' size="1.5rem" /> */}
              </Box>
            </Box>
           )
         })}
      </div>
      {/* <DataGrid
        rows={messageTemplates}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      /> */}
    </div>
  );
}