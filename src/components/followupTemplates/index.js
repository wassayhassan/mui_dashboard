import { Typography, Box } from "@mui/material";
import React from "react";
import FollowTemplateModalCreate from "./followuptemplatecreate";

export const FollowUpPage = () => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", padding: 4, width: "100%"}}>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 2}}>
                <Typography variant="h3">FollowUp Templates</Typography>
                <FollowTemplateModalCreate  />
               {/* <Button sx={{backgroundColor: theme.palette.secondary[300],marginLeft: 2, ":hover": {backgroundColor: theme.palette.secondary[200]}}}>Create New Template</Button> */}
            </Box>
            <Box sx={{}}>
                {/* <DataTable messageTemplates={messageTemplates} setMessageTemplates={setMessageTemplates} /> */}
            </Box>
        </Box>
    )
}