import React, {useState, useEffect} from "react";
import { Box } from "@mui/material";
import {Typography} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import {useTheme }from "@mui/material";
import {InputAdornment} from "@mui/material";
import {AiOutlineUser} from 'react-icons/ai';
import {RiLockPasswordLine} from 'react-icons/ri';
import { borderBottom } from "@mui/system";
import { login } from "state/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {Alert} from "@mui/material";


export const LoginPage = () => {
     const {user, logged_in, errorMessage} = useSelector(state=> state.userState);
     const [validationError, setValidateError] = useState('');
    const [formValues, setFormVlaues] = useState({email: "", password: ""});
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();


  
    async function handleValueChange(e){
        let name = e.target.name;
        let value = e.target.value;
        setFormVlaues(pre => ({...pre, [name]: value}))
    }
    async function handleLogin(){
        if(formValues.email.length <= 7){
           setValidateError("Enter a valid Email Address");
           return;
        }
        setValidateError("");
        let data = await dispatch(login(formValues));
        if(data.payload._id.length > 5){
          navigate("/");
        }
    }
    // useEffect(()=> {
      //  navigate("/");
    // }, [logged_in])


    return (
        <Box sx={{display: "grid", placeItems: "center", width: "100dvw", height: "100dvh", backdropFilter: "blue(10px)", backgroundColor: theme.palette.background.alt}}>
            <Box sx={{backgroundColor: "white", width: "370px", borderRadius: "2px", display: "flex", flexDirection: "column"}}>
               <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 3}}>
                   <Typography variant="h4" sx={{color: "black", fontWeight: "bold"}}>Welcome back!</Typography>
               </Box>
               <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                {(errorMessage || validationError.length > 1) && <Alert sx={{width: "18rem", marginTop: 2}} severity="error">{errorMessage ||validationError}</Alert>}
               
               </Box>
               <Box sx={{margin: 2, marginTop: 5, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Box >
                <Typography sx={{color: "black", fontWeight: "semibold" ,fontSize: "small"}}>Email</Typography>
                   <Box>
                    <TextField variant="standard" sx={{borderBottom: "1px solid gray",width: "16rem" }} onChange={handleValueChange} name="email" value={formValues.email} InputProps={{startAdornment: <InputAdornment position="start"><AiOutlineUser color="black" /></InputAdornment>}}>

                    </TextField>
                   {/* <input className="w-[90%] rounded-md border-gray-200 border-[1px] h-8 outline-none p-1 text-black" onChange={handleValueChange} name="email" value={formValues.email} /> */}
                   </Box>
                </Box>

               </Box>
               <Box sx={{marginTop: 2, marginX: 2, marginBottom: 1, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Box >
                <Typography sx={{color: "black", fontWeight: "semibold", fontSize: "small"}}>Password</Typography>
                  <Box>
                    <TextField variant="standard" sx={{borderBottom: "1px solid gray", width: "16rem"}} onChange={handleValueChange} name="password" value={formValues.password}  InputProps={{startAdornment: <InputAdornment position="start"><RiLockPasswordLine color="black" /></InputAdornment>}}>

                    </TextField>
                  {/* <input className="w-[90%] rounded-md border-gray-200 border-[1px] h-8 outline-none p-1 text-black" onChange={handleValueChange} name="password" value={formValues.password} /> */}
                  </Box>
                </Box>
               </Box>
               <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
               <Box sx={{display: "flex", flexDirection: "row", width: "16rem", justifyContent: "flex-end"}}>
                <Typography sx={{':hover': {textDecorationLine: "underline"}, cursor: "pointer"}}>Forgot Password?</Typography>
               </Box>
               </Box>

               <Box  sx={{display: "flex", flexDirection: "row", justifyContent: "center", marginY: 2}}>
                 <Button sx={{backgroundColor: theme.palette.secondary[400], fontSize: "small", width: "14rem",borderRadius: "15px" ,color: "white", "&:hover": {backgroundColor: theme.palette.secondary[600]}}} onClick={handleLogin}>Login</Button>
               </Box>
            </Box>
        </Box>
    )
}

