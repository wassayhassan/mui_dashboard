import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from 'styleComponents/FlexBetween'
import { Box, Divider, IconButton, Drawer, List, ListItem, ListItemButton, lostItemIcon, ListItemText, Typography, useTheme, ListItemIcon } from '@mui/material'
import { SettingsOutlined, ChevronLeft, ChevronRightOutlined, HomeOutlined, ShoppingCartOutlined, Groups2Outlined, ReceiptLongOutlined, PublicOutlined, PointOfSaleOutlined, TodayOutlined, CalendarMonthOutlined, AdminPanelSettingsOutlined, TrendingOutlined, PieChartOutlined, TrendingUpOutlined } from '@mui/icons-material';
import {BiMessageSquareEdit} from 'react-icons/bi';
const navItems = [
    {
      text: 'Dashboard',
      icon: <HomeOutlined />
    },
    // {
    //     text: 'ClientFacing',
    //     icon: null
    //   },
    {
      text: "MessageTemplates",
      icon: <BiMessageSquareEdit />
    },
      {
        text: 'followuptemplates',
        icon: <Groups2Outlined />
      },
      // {
      //   text: 'Transactions',
      //   icon: <ReceiptLongOutlined />
      // },
      // {
      //   text: 'Geography',
      //   icon: <PublicOutlined/>
      // },
      {
        text: 'Sales',
        icon: null
      },
      {
        text: 'Overview',
        icon: <PointOfSaleOutlined />
      },
      {
        text: 'Daily',
        icon: <TodayOutlined />
      },
      {
        text: 'Monthly',
        icon: <CalendarMonthOutlined />
      },
      {
        text: 'Breakdown',
        icon: <PieChartOutlined/>
      },
      {
        text: 'Management',
        icon: null
      },

      {
        text: 'Admin',
        icon: <AdminPanelSettingsOutlined />
      },
      
      {
        text: 'Performance',
        icon: <TrendingUpOutlined/>
      },

    
]

const Sidebar = ({drawerWidth, isSidebarOpen, setSidebarOpen, isNonMobile}) => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const theme = useTheme()
    const [active, setActive] = useState("")
    useEffect(()=> {
      setActive(pathname.substring(1))
    }, [pathname])
    
  return (
    <Box component="nav">
        {isSidebarOpen &&  (<Drawer open={isSidebarOpen}  onClose={()=> setSidebarOpen(false)} variant="persistent" anchor="left"sx={{width: drawerWidth, 
         "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSizing: 'border-box',
            borderWidth: isNonMobile? 0: '2px',
            width: drawerWidth
         }
        
        }} >
            <Box width="100%">
                <Box m="1.5rem 2rem 2rem 3rem">
                    <FlexBetween color={theme.palette.secondary.main}>
                        <Box display="flex" alignItems="center" gap="0.5rem">
                            <Typography variant='h4' fontWeight="bold">ECOMMMVISION</Typography>
                        </Box>
                        {!isNonMobile && <IconButton onClick={()=> setSidebarOpen((prev)=> !prev)} >
                              <ChevronLeft/>
                            </IconButton>}
                    </FlexBetween>

                </Box>
                <List>
                    {navItems.map(({text, icon})=> {
                        if(!icon){
                            return (<Typography key={text} sx={{m: "2.25rem 0 1rem 3rem"}}>
                                {text}
                            </Typography>)
                        }
                        const lc = text.toLowerCase();
                        return(
                            <ListItem key={text} disablePadding >
                                <ListItemButton onClick={()=> {
                                navigate(`/${lc}`);
                                setActive(lc);
                                }} sx={{backgroundColor: active === lc? theme.palette.secondary[300]: 'transparent', color: active === lc?  theme.palette.primary[600]: theme.palette.secondary[100]}}>
                              <ListItemIcon sx={{ml: '2rem', color: active === lc?  theme.palette.primary[600]: theme.palette.secondary[200]}}>
                                 {icon}
                              </ListItemIcon>
                              <ListItemText primary={text}>
                                {active === lc && (<ChevronRightOutlined sx={{ml: 'auto'}} />)}
                              </ListItemText>

                                </ListItemButton>


                            </ListItem>
                        )

                    })}

                </List>

            </Box>
        </Drawer>)}

    </Box>
  )
}

export default Sidebar