import { Typography, Box, useTheme} from "@mui/material";
import React, {useState, useEffect} from "react";
import FollowTemplateModalCreate from "./followuptemplatecreate";
import { getAllFollowups } from "utils";
import { FollowupTemplateList } from "./followuptemplatelist";

export const FollowUpPage = () => {
    const theme = useTheme();
    const [followupTemplates, setFollowupTemplates] = useState([]);
    async function getFollowUps(){
        let res = await getAllFollowups();
        if(res.status === 200){
            console.log(res.data)
            setFollowupTemplates(res.data);
        }
    }
    useEffect(()=> {
        getFollowUps(); 
    }, [])


    return (
        <Box sx={{display: "flex", flexDirection: "column", padding: 4, width: "100%"}}>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 2}}>
                <Typography variant="h3" color={theme.palette.secondary[200]}>FollowUp Templates</Typography>
                <FollowTemplateModalCreate setFollowupTemplates={setFollowupTemplates} />
            </Box>
            <Box sx={{}}>
                <FollowupTemplateList setFollowupTemplates={setFollowupTemplates} followupTemplates={followupTemplates} />
            </Box>
        </Box>
    )
}