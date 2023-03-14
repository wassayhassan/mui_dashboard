import React, {useState, useEffect} from "react";
import { Box } from "@mui/material";
import {Typography} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import {useTheme }from "@mui/material";
import {InputAdornment} from "@mui/material";
import {AiOutlineUser, AiOutlineMail} from 'react-icons/ai';
import {RiLockPasswordLine} from 'react-icons/ri';
import {Alert} from "@mui/material";
import { SERVER_BASE_URL } from "utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export const SignUpPage = () => {
    const [formValues, setFormVlaues] = useState({email: "", password: "", password2:"", firstname: "", lastname: ""});
    const theme = useTheme();
    const [error, setError] = useState('');
    const navigate = useNavigate();


  
    async function handleValueChange(e){
        let name = e.target.name;
        let value = e.target.value;
        console.log(name);
        console.log(value)
        setFormVlaues(pre => ({...pre, [name]: value}))
    }
    async function handleSignUp(){
        console.log(formValues)
        if(formValues.password !== formValues.password2){
            setError("Your Password dont match");
        }else{
            setError("")
            try{
                let response = await axios.post(SERVER_BASE_URL+ "user/signup", formValues);
                console.log(response);
                if(response.status === 200){
                   navigate('/login');
                }
            }catch(err){
                setError("An error encountered! Try again");
            }

        }
        
    }


    return (
        <Box sx={{display: "grid", placeItems: "center", width: "100dvw", height: "100dvh", backdropFilter: "blue(10px)", backgroundColor: theme.palette.background.alt}}>
            <Box sx={{backgroundColor: "white", width: "400px", borderRadius: "2px", display: "flex", flexDirection: "column"}}>
               <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 3}}>
                   <Typography variant="h4" sx={{color: "black", fontWeight: "bold"}}>Create an Account</Typography>
               </Box>
               <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                {error && <Alert sx={{width: "18rem", marginTop: 2}} severity="error">{error}</Alert>}
               
               </Box>
               <Box sx={{margin: 2, marginTop: 4, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box sx={{marginRight: 1}}>
                    <Typography sx={{color: "black", fontWeight: "semibold" ,fontSize: "small"}}>First Name</Typography>
                   <Box>
                    <TextField variant="standard" name="firstname" sx={{borderBottom: "1px solid gray",width: "8.5rem" }} onChange={handleValueChange}  value={formValues.firstname} InputProps={{startAdornment: <InputAdornment position="start"><AiOutlineUser color="black" /></InputAdornment>}}>

                    </TextField>
                   </Box>
                 </Box>
                 <Box sx={{marginLeft: 1}} >
                <Typography sx={{color: "black", fontWeight: "semibold" ,fontSize: "small"}}>Last Name</Typography>
                   <Box>
                    <TextField variant="standard" name="lastname" sx={{borderBottom: "1px solid gray",width: "8.5rem" }} onChange={handleValueChange}  value={formValues.lastname} InputProps={{startAdornment: <InputAdornment position="start"><AiOutlineUser color="black" /></InputAdornment>}}>

                    </TextField>
                   {/* <input className="w-[90%] rounded-md border-gray-200 border-[1px] h-8 outline-none p-1 text-black" onChange={handleValueChange} name="email" value={formValues.email} /> */}
                   </Box>
                </Box>

                </Box>

               </Box>
               <Box sx={{margin: 2, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Box >
                <Typography sx={{color: "black", fontWeight: "semibold" ,fontSize: "small"}}>Email</Typography>
                   <Box>
                    <TextField variant="standard" sx={{borderBottom: "1px solid gray",width: "18rem" }} onChange={handleValueChange} name="email" value={formValues.email} InputProps={{startAdornment: <InputAdornment position="start"><AiOutlineMail color="black" /></InputAdornment>}}>

                    </TextField>
                   {/* <input className="w-[90%] rounded-md border-gray-200 border-[1px] h-8 outline-none p-1 text-black" onChange={handleValueChange} name="email" value={formValues.email} /> */}
                   </Box>
                </Box>

               </Box>
               
               <Box sx={{marginTop: 2, marginX: 2, marginBottom: 1, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Box >
                <Typography sx={{color: "black", fontWeight: "semibold", fontSize: "small"}}>Password</Typography>
                  <Box>
                    <TextField variant="standard" sx={{borderBottom: "1px solid gray", width: "18rem"}} onChange={handleValueChange} name="password" value={formValues.password}  InputProps={{startAdornment: <InputAdornment position="start"><RiLockPasswordLine color="black" /></InputAdornment>}}>

                    </TextField>
                  {/* <input className="w-[90%] rounded-md border-gray-200 border-[1px] h-8 outline-none p-1 text-black" onChange={handleValueChange} name="password" value={formValues.password} /> */}
                  </Box>
                </Box>
               </Box>
               <Box sx={{marginTop: 2, marginX: 2, marginBottom: 1, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Box >
                <Typography sx={{color: "black", fontWeight: "semibold", fontSize: "small"}}>Confirm Password</Typography>
                  <Box>
                    <TextField variant="standard" sx={{borderBottom: "1px solid gray", width: "18rem"}} onChange={handleValueChange} name="password2" value={formValues.password2}  InputProps={{startAdornment: <InputAdornment position="start"><RiLockPasswordLine color="black" /></InputAdornment>}}>

                    </TextField>
                  {/* <input className="w-[90%] rounded-md border-gray-200 border-[1px] h-8 outline-none p-1 text-black" onChange={handleValueChange} name="password" value={formValues.password} /> */}
                  </Box>
                </Box>
               </Box>
               {/* <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Typography color="red">{error}</Typography>
               </Box> */}
               <Box  sx={{display: "flex", flexDirection: "row", justifyContent: "center", marginY: 2}}>
                 <Button sx={{backgroundColor: theme.palette.secondary[400], fontSize: "small", width: "14rem",borderRadius: "15px" ,color: "white", "&:hover": {backgroundColor: theme.palette.secondary[600]}}} onClick={handleSignUp} >Sign Up</Button>
               </Box>
            </Box>
        </Box>
    )
}

