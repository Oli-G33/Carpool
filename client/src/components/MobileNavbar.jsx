import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  Avatar,
  Link
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../state';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const MobileNavbar = () => {
  const [avatarKey, setAvatarKey] = useState(0);
  const isMobileScreen = useMediaQuery('(max-width:600px)');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    setAvatarKey(key => key + 1);
  }, [user.picture]);

  const handleLogout = () => {
    navigate('/');
    dispatch(setLogout());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: '#c0c0c0',
        zIndex: 1000
      }}
    >
      {user && (
        <>
          <Link
            component={RouterLink}
            to="/myrides"
            color="inherit"
            underline="none"
          >
            <Avatar
              key={avatarKey}
              src={user.picture}
              alt={user.firstName}
              sx={{
                ml: 2,
                mr: 1,
                border: '2px 	#d9dcde solid'
              }}
            />
          </Link>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </>
      )}
      {/* <Toolbar>
        {isMobileScreen && (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" align="center">
            Your App Name
          </Typography>
        </Box>
      </Toolbar> */}
    </AppBar>
  );
};

export default MobileNavbar;
