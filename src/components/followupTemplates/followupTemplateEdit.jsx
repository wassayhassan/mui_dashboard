import * as React from 'react';
import {FiEdit} from "react-icons/fi";
import { useState } from 'react';
import {Button,TextField, Typography, Modal, Box, useTheme,IconButton, InputBase } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import FlexBetween from 'styleComponents/FlexBetween'
import {Search} from "@mui/icons-material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import update from "immutability-helper";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { createFollowUp, searchMessageTemplates, getFollowUpById, editFollowUp } from 'utils';
import Event from './event';
import { useEffect } from 'react';
import EditEvent from './editEvents';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 590,
  maxHeight: window.innerHeight -100,
  overflowY: "scroll",
  bgcolor: 'background.paper',
  borderRadius: 2,
  // border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export default function FollowTemplateModalEdit({setFollowupTemplates, followupTemplates, id }) {
    const {user} = useSelector((state)=> state.userState);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState({});

  async function getfollowData(){
    let res = await getFollowUpById(id);
    console.log(res);
    if(res.status === 200){
        setFormValues(res.data);
    }
  }

  React.useEffect(()=>  {
    getfollowData();
  }, [])
  useEffect(()=> {
     console.log(formValues)
  }, [formValues])
//   async function addEvent(data){
//      setFormValues(()=> ({...data}));
//   }


  async function handleFormValueChange(e){
    let name = e.target.name;
    let value = e.target.value;
     setFormValues((pre)=> ({...pre, [name]: value}))
  }
  async function handleSave(){
    if(formValues.name.length > 0 && formValues.events.length > 0){
    //   let dat = {...formValues, events: events};
    //   console.log(dat);
        let res = await editFollowUp(formValues._id,formValues);
        console.log(res);
        // setFollowupTemplates((pre)=> [...pre, dat]);
        // console.log(res);
        // if(res.status === 200){
        //     setFollowupTemplates(pre=> [...pre, res.data]);
        // }

    }
    handleClose();
  }

  return (
    <div>
        <IconButton>
        <FiEdit onClick={handleOpen} className='cursor-pointer m-2' size="1.5rem" />
        </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
             <Typography sx={{fontWeight: "bold", fontSize:"1.3em"}}>Edit Follow Up</Typography>
          </Box>
          <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 2}}>
            <Box sx={{width: "100%", margin: 1}} >
              <Typography sx={{fontWeight: "bold", width: "70%"}} >
                Name
              </Typography>
              <TextField value={formValues.name} onChange={handleFormValueChange} name="name"/>
            </Box>


          </Box>
          <Box sx={{margin: 1}}>
                <Typography variant="h6" fontWeight="bold">Actions</Typography>
                <Box sx={{width: "100%", margin: 1}} >
                  {formValues?.events?.map((ev, index)=> {
                    return <EditEvent ev={ev} formValues={formValues} setFormValues={setFormValues} />
                  })}
                </Box>
            <ChildModal setFormValues={setFormValues} formValues={formValues} />
        </Box>
          <Box sx={{display: "flex", flexDirection: "row", justifyContent: "flex-end", padding: 2}}>
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

function ChildModal({setFormValues, formValues}) {
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
    useEffect(()=> {
      console.log(formValues)
    }, [formValues])
    async function handleInsert() {
        let id = uuidv4();
              console.log(formValues)
              let dat = formValues;
              let newEvens = formValues.events;
              newEvens = [...newEvens, {id, ...selectedTemplate,interval: "00:00:00:00"}]; 
             dat.events = newEvens;
             setFormValues({...dat});

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
            <FlexBetween backgroundColor={theme.palette.background.alt} borderRadius="9px" gap="3rem" p="0.1rem 1.5rem">
                    <InputBase value={searchval} onChange={(e)=> setSearchVal(e.target.value)} placeholder='Search...' />
                    <IconButton>
                        <Search/>
                    </IconButton>

                </FlexBetween>
            </Box>
        
            <Box>
               {templates.map((tem, idx)=> {
                return (
                    <Box key={"eve-"+idx} sx={{backgroundColor: selectedTemplate._id === tem._id? theme.palette.secondary[600]: theme.palette.background.alt, cursor: "pointer", margin: 1, borderRadius: 1, padding: 1}} onClick={()=> setSelectedTemplate(tem)}>
                        <Typography variant='h5'>{tem.name}</Typography>
                     </Box>
                )
               })}
            </Box>
            <Box sx={{marginTop: 2, display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Button onClick={handleClose} color="error">Cancel</Button>
                <Button onClick={handleInsert} sx={{backgroundColor: theme.palette.secondary[300], ":hover": {
                  backgroundColor: theme.palette.secondary[100]
                }}}>Insert</Button>
            </Box>

          </Box>
        </Modal>
      </React.Fragment>
    );
  }
