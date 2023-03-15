import React, {useState} from 'react';
import { Box, Typography,InputBase, useTheme } from '@mui/material';

const Event = ({ev})=> {
    const [interv, setInterv] = useState(ev.interval? ev.interv: "");
    const theme = useTheme();

    return (
        <Box sx={{backgroundColor: theme.palette.background.alt,padding: 2,margin: 1, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Box>
          <Typography>{ev.name}</Typography>
        </Box>
        <Box>
          <InputBase value={interv} placeholder="Days: Hours: Minutes: Seconds" onChange={(e)=> setInterv(e.target.value)} sx={{backgroundColor: "#fff", padding: 1, borderRadius: "5px", color: "#000"}} />
        {/* <Typography>Set Interval</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

           <TimePicker />
           </LocalizationProvider> */}
        </Box>
      
    </Box>
    )
}
export default Event;