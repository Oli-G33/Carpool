import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Avatar,
  ListItemButton,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { setLogout } from '../state';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import MinorCrashTwoToneIcon from '@mui/icons-material/MinorCrashTwoTone';
import EditProfileModal from './EditProfileModal';

const Navbar = ({ isNonMobileScreens, isMobileScreen }) => {
  const [open, setOpen] = useState(false);
  const [avatarKey, setAvatarKey] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    setAvatarKey(key => key + 1);
  }, [user.picture]);

  const handleDrawerOpen = () => {
    if (!isNonMobileScreens) {
      setOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    navigate('/');
    dispatch(setLogout());
  };
  const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const drawer = (
    <List>
      <ListItemButton onClick={handleDrawerClose}>
        <ListItemIcon>
          <CloseIcon />
        </ListItemIcon>
      </ListItemButton>
      {user && user.isAdmin && (
        <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/dashboard" color="inherit" underline="none">
            <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
          </Link>
        </ListItemButton>
      )}
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/booking" color="inherit" underline="none">
          <ListItemText primary="Book a ride" sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/myrides" color="inherit" underline="none">
          <ListItemText primary="My Rides" sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link
          href={`https://wa.me/${phoneNumber}`}
          color="inherit"
          underline="none"
          target="_blank"
        >
          <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
            <WhatsAppIcon sx={{ color: '#25D366' }} />
          </ListItemIcon>
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>

      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText primary="Terms & Conditions" sx={{ color: 'white' }} />
        </Link>
      </ListItemButton>
    </List>
  );

  return (
    <AppBar
      position={isMobileScreen ? 'fixed' : 'sticky'}
      sx={{
        bottom: isMobileScreen ? 0 : 'unset',
        top: isMobileScreen ? 'unset' : 0,
        left: 0,
        width: '100%',
        zIndex: 1000
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography
            variant={isMobileScreen ? 'h7' : 'h6'}
            component="div"
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            <Link
              component={RouterLink}
              to="/booking"
              color="inherit"
              underline="none"
            >
              Carpooler{' '}
              <MinorCrashTwoToneIcon
                htmlColor="#A0A0A0"
                sx={{
                  fontSize: '1.5rem',
                  marginLeft: '0.5rem'
                }}
              />
            </Link>
          </Typography>
        </Box>
        {user && (
          <>
            {' '}
         
               <Link href="#" onClick={handleOpenModal}  color="inherit" underline="none">
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
      </Toolbar>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            width: isMobileScreen ? '100vw' : 250,
            height: '100%',
            backgroundColor: '#1976D2'
          }
        }}
      >
        {drawer}
      </Drawer>

      <EditProfileModal
            user={user}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            openModal={openModal}
          />
    </AppBar>
  );
};

export default Navbar;
