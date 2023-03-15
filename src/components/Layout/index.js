import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const {user, logged_in} = useSelector((state)=> state.userState);
    useEffect(()=> {
      if(!logged_in){
        navigate("/login")
      }

    }, [logged_in])
  return (
    <Box display={isNonMobile? 'flex': 'block'} width="100%" height="100%">
        <Sidebar isNonMobile={isNonMobile} drawerWidth="250px" isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Box sx={{width:"100%"}}>
            <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Outlet />
        </Box>

    </Box>
  )
}

export default Layout;