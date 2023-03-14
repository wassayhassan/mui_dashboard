import * as React from 'react';
import {FiEdit} from "react-icons/fi";
import { useState } from 'react';
import {Button,TextField, Typography, Modal, Box, useTheme } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SERVER_BASE_URL, saveTemplate, searchMessageTemplates } from 'utils';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers';


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

export default function FollowTemplateModalCreate({setMessageTemplates}) {
    const {user} = useSelector((state)=> state.userState);
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState({name: "", text: "", createdBy: user._id});


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
             <Typography sx={{fontWeight: "bold", fontSize:"1.3em"}}>Create Follow Up</Typography>
          </Box>
          <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 2}}>
            <Box sx={{width: "47%", margin: 1}} >
              <Typography sx={{fontWeight: "bold"}} >
                Name
              </Typography>
              <TextField value={formValues.name} onChange={handleFormValueChange} name="name"/>
            </Box>


          </Box>
          <Box sx={{margin: 1}}>
                <Typography variant="h6" fontWeight="bold">Actions</Typography>
                <Box sx={{width: "100%", margin: 1}} >
                  {events.map(ev=> {
                    return (
                        <Box sx={{backgroundColor: theme.palette.background.alt, padding: 2, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <Box>
                              <Typography>{ev.name}</Typography>
                            </Box>
                            <Box>
                            <Typography>Set Interval</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                               <TimePicker />
                               </LocalizationProvider>
                            </Box>
                          
                        </Box>
                    )
                  })}
                </Box>
            <ChildModal setEvents={setEvents} />
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

function ChildModal({setEvents}) {
    const [searchval, setSearchVal] = useState('');
    const [open, setOpen] = React.useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [templates, setTemplates] = useState([]);
    const theme = useTheme();
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    React.useEffect(()=> {
        if(searchval.length > 0){
            handleSearch();
        }else{
            setTemplates([]);
        }

    }, [searchval])
    async function handleSearch(){
        let res = await searchMessageTemplates(searchval);
        console.log(res)
        if(res.status === 200){
            setTemplates(res.data);
        }
    }
    async function handleInsert() {
         setEvents((pre)=> [...pre, selectedTemplate])
         handleClose();
    }
  
    return (
      <React.Fragment>
        <Button onClick={handleOpen} sx={{color: theme.palette.secondary[200]}}>Add a message</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 400, height: 300 }}>
            <h2 id="child-modal-title">Search Templates</h2>
            <Box>
                <TextField sx={{width: 300}} value={searchval} onChange={(e)=> setSearchVal(e.target.value)} />
            </Box>
        
            <Box>
               {templates.map((tem)=> {
                return (
                    <Box sx={{backgroundColor: selectedTemplate._id === tem._id? theme.palette.secondary[600]: theme.palette.background.alt, cursor: "pointer", margin: 1, borderRadius: 1, padding: 1}} onClick={()=> setSelectedTemplate(tem)}>
                        <Typography variant='h5'>{tem.name}</Typography>
                     </Box>
                )
               })}
            </Box>
            <Box sx={{marginTop: 2}}>
                <Button onClick={handleClose} color="error">Cancel</Button>
                <Button onClick={handleInsert} sx={{backgroundColor: theme.palette.secondary[200]}}>Insert</Button>
            </Box>

          </Box>
        </Modal>
      </React.Fragment>
    );
  }