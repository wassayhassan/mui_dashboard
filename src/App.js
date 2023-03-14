import { CssBaseline, ThemeProvider } from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import { themeSettings } from 'theme';
import Layout from 'components/Layout';
import Dashboard from 'components/dashboard';
import './App.css';
import { LoginPage } from 'components/Login';
import { SignUpPage } from 'components/Signup';
import MessageTemplates from 'components/messageTemplates';
import { FollowUpPage } from 'components/followupTemplates';

function App() {
  const mode  = useSelector((state)=> state.global.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode), [mode]))
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path = "/" element={<Layout />} >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/messagetemplates" element={<MessageTemplates/>} />
            <Route path="/followuptemplates" element={<FollowUpPage/>} />
          </Route>
        </Routes>
      </ThemeProvider>
       
    </div>
  );
}

export default App;
