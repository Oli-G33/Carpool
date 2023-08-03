import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  Avatar,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../state';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditProfileModal from './EditProfileModal';

const MobileNavbar = () => {
  const [avatarKey, setAvatarKey] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const isMobileScreen = useMediaQuery('(max-width:600px)');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    setAvatarKey(key => key + 1);
  }, [user.picture]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: '#c0c0c0',
        zIndex: 1000,
        display: { xs: 'block', md: 'none' },
        flexGrow: 1
      }}
    >
      <Toolbar>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%'
          }}
        >
          <ListItemButton
            component={Link}
            to="/"
            sx={{ alignItems: 'center', flexDirection: 'column' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
            </Box>
          </ListItemButton>

          {user &&
            user.isAdmin && ( // Conditionally render for admin user
              <ListItemButton
                component={Link}
                to="/dashboard"
                sx={{ alignItems: 'center', flexDirection: 'column' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                </Box>
              </ListItemButton>
            )}

          <ListItemButton
            component={Link}
            to="/myrides"
            sx={{ alignItems: 'center', flexDirection: 'column' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <ListItemIcon>
                <DirectionsCarIcon />
              </ListItemIcon>
            </Box>
          </ListItemButton>

          <ListItemButton
            component="a"
            href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}`}
            target="_blank"
            sx={{ alignItems: 'center', flexDirection: 'column' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <ListItemIcon>
                <WhatsAppIcon />
              </ListItemIcon>
            </Box>
          </ListItemButton>

          {user && (
            <Link
              component="button"
              onClick={handleOpenModal}
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
                  border: '2px solid #d9dcde',
                  cursor: 'pointer'
                }}
              />
            </Link>
          )}
        </List>
      </Toolbar>
      <EditProfileModal
        user={user}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        openModal={openModal}
      />
    </AppBar>
  );
};

export default MobileNavbar;
