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
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../state';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditProfileModal from './EditProfileModal';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const MobileNavbar = () => {
  const [avatarKey, setAvatarKey] = useState(0);
  const [openModal, setOpenModal] = useState(false);

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
        backgroundColor: 'white',
        zIndex: 1000,
        display: { xs: 'block', md: 'none' },
        flexGrow: 1,
        boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
      }}
    >
      <Toolbar>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: 0
          }}
        >
          <ListItemButton
            component={Link}
            to="/"
            sx={{
              alignItems: 'center',
              flexDirection: 'column',
              padding: 0,
              position: 'relative'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'linear-gradient(19deg, #21D4FD 0%, #1c305c 100%)'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <HomeIcon sx={{ color: '#21D4FD', fontSize: '1.5rem' }} />{' '}
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: '#21D4FD'
                        }}
                      >
                        Home
                      </Typography>
                    }
                  />
                </Box>
              </ListItemIcon>
            </Box>
          </ListItemButton>

          {user && user.isAdmin && (
            <ListItemButton
              component={Link}
              to="/dashboard"
              sx={{ alignItems: 'center', flexDirection: 'column', padding: 0 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <ListItemIcon>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <DashboardIcon
                      sx={{ color: '#21D4FD', fontSize: '1.5rem' }}
                    />
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: '#21D4FD'
                          }}
                        >
                          Dashboard
                        </Typography>
                      }
                    />
                  </Box>
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
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <DirectionsCarIcon
                    sx={{ color: '#21D4FD', fontSize: '1.5rem' }}
                  />
                  <ListItemText
                    primary="MyRides"
                    primaryTypographyProps={{
                      variant: 'subtitle2',
                      color: '#21D4FD'
                    }}
                  />
                </Box>
              </ListItemIcon>
            </Box>
          </ListItemButton>

          {/* <ListItemButton
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
                <WhatsAppIcon sx={{ color: '#25d366' }} />
              </ListItemIcon>
            </Box>
          </ListItemButton> */}

          {user && (
            <ListItemButton
              onClick={handleOpenModal}
              sx={{ alignItems: 'center', flexDirection: 'column', padding: 0 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <ListItemIcon>
                  <Avatar
                    key={avatarKey}
                    src={user.picture}
                    alt={user.firstName}
                    sx={{
                      border: '2px solid #25d366',
                      cursor: 'pointer'
                    }}
                  />
                </ListItemIcon>
              </Box>
            </ListItemButton>
          )}

          <ListItemButton
            onClick={handleLogout}
            sx={{
              alignItems: 'center',
              flexDirection: 'column',
              padding: 0
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 0
              }}
            >
              <ListItemIcon>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <ExitToAppIcon
                    sx={{ color: '#21D4FD', fontSize: '1.5rem' }}
                  />
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      variant: 'subtitle2',
                      color: '#21D4FD'
                    }}
                  />
                </Box>
              </ListItemIcon>
            </Box>
          </ListItemButton>
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
