import React, {useState} from 'react';
import { Box, Typography,InputBase, useTheme } from '@mui/material';

const EditEvent = ({ev, formValues, setFormValues})=> {
    const theme = useTheme();

    async function handleChangeInterval(id, val){
        let evs = formValues.events;
        evs = evs.map((event)=> {
          if(event.id === id){
            return {...event, interval: val };
          }else{
            return event;
          }
        })
        let dat = {...formValues, events: evs};
        setFormValues(dat);
      }



    return (
        <Box sx={{backgroundColor: theme.palette.background.alt,padding: 2,margin: 1, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Box>
          <Typography>{ev.name || ev._id.name}</Typography>
        </Box>
        <Box>
          <InputBase value={ev.interval || ""} placeholder="Days: Hours: Minutes: Seconds" onChange={(e)=> handleChangeInterval(ev.id, e.target.value)} sx={{backgroundColor: "#fff", padding: 1, borderRadius: "5px", color: "#000"}} />
        {/* <Typography>Set Interval</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

           <TimePicker />
           </LocalizationProvider> */} 
        </Box>
      
    </Box>
    )
}
export default EditEvent;