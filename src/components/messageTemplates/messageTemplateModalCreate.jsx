import * as React from 'react';
import {FiEdit} from "react-icons/fi";
import { useState } from 'react';
import {Button,TextField, Typography, Modal, Box, useTheme } from '@mui/material';
import { SERVER_BASE_URL, saveTemplate } from 'utils';
import { useSelector } from 'react-redux';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 590,
  bgcolor: 'background.paper',
  borderRadius: 2,
  // border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export default function MessageTemplateModalCreate({setMessageTemplates}) {
    const {user} = useSelector((state)=> state.userState);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState({name: "", text: "", createdBy: user?._id});


  async function handleFormValueChange(e){
    let name = e.target.name;
    let value = e.target.value;
     setFormValues((pre)=> ({...pre, [name]: value}))
  }
  async function handleSave(){
    if(formValues.name.length > 0 && formValues.text.length > 0){
        let res = await saveTemplate(formValues);
        console.log(res);
        if(res.status === 200){
            setMessageTemplates(pre=> [...pre, res.data]);
        }

    }
    handleClose();
  }


  return (
    <div>
     <FiEdit onClick={handleOpen} className='cursor-pointer m-2' size="1.5rem" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
             <Typography sx={{fontWeight: "bold", fontSize:"1.3em"}}>Edit Template</Typography>
          </Box>
          <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 2}}>
            <Box sx={{width: "47%", margin: 1}} >
              <Typography>
                Name
              </Typography>
              <TextField value={formValues.name} onChange={handleFormValueChange} name="name"/>
            </Box>
            <Box sx={{width: "100%", margin: 1}} >
            <Typography>
              Content
            </Typography>
            <TextField multiline value={formValues.text} sx={{width: "91%"}} onChange={handleFormValueChange} name="text" />
            </Box>
          </Box>
          <Box sx={{display: "flex", flexDirection: "row", justifyContent: "flex-end", padding: 2, marginRight: 4}}>
          <Box sx={{margin: 1}}>
              <Button color="error" sx={{backgroundColor: "error"}} onClick={handleClose}>Cancel</Button>
            </Box>
            <Box sx={{margin: 1}} >
              <Button onClick={()=> handleSave()}  sx={{backgroundColor:theme.palette.secondary[300], ":hover": {backgroundColor: theme.palette.secondary[200]} }} >Save</Button>
            </Box>
          </Box>


          
        </Box>
      </Modal>
    </div>
  );
}