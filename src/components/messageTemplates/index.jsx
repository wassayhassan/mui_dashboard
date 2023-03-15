import React, {useState, useEffect} from "react";
import { Box, Typography } from "@mui/material";
import DataTable from "./templatetable";
import { getAllMessageTemplates } from "utils";
import {Button} from "@mui/material";
import {useTheme} from "@mui/material";
import MessageTemplateModalCreate from "./messageTemplateModalCreate";
const MessageTemplates = () => {
    const [messageTemplates, setMessageTemplates] = useState([]);
    const theme = useTheme();
    async function getData(){
        let data = await getAllMessageTemplates();
        let newData = data.map((obj)=> {
          let id = obj._id;
          obj.id = id;
          return obj;
        })
        setMessageTemplates(newData);
    }
    useEffect(()=> {
      getData();

    }, [])
    return (
        <Box sx={{display: "flex", flexDirection: "column", padding: 4, width: "100%"}}>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 2}}>
                <Typography variant="h3" color={theme.palette.secondary[200]}>Message Templates</Typography>
                <MessageTemplateModalCreate setMessageTemplates={setMessageTemplates} />
               {/* <Button sx={{backgroundColor: theme.palette.secondary[300],marginLeft: 2, ":hover": {backgroundColor: theme.palette.secondary[200]}}}>Create New Template</Button> */}
            </Box>
            <Box sx={{}}>
                <DataTable messageTemplates={messageTemplates} setMessageTemplates={setMessageTemplates} />
            </Box>
        </Box>
    )

}
export default MessageTemplates;