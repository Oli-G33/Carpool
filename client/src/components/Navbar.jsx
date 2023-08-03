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
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { setLogout } from '../state';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Navbar = ({ isNonMobileScreens, isMobileScreen }) => {
  const [open, setOpen] = useState(false);
  const [avatarKey, setAvatarKey] = useState(0);

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

  const drawer = (
    <List>
      <ListItemButton onClick={handleDrawerClose}>
        <ListItemIcon>
          <MenuIcon />
        </ListItemIcon>
        <ListItemText primary="Close" />
      </ListItemButton>
      {user && user.isAdmin && (
        <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/dashboard" color="inherit" underline="none">
            <ListItemText primary="Dashboard" />
          </Link>
        </ListItemButton>
      )}
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/booking" color="inherit" underline="none">
          <ListItemText primary="Book a ride" />
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/myrides" color="inherit" underline="none">
          <ListItemText primary="My Rides" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <Link
          href={`https://wa.me/${phoneNumber}`}
          color="inherit"
          underline="none"
          target="_blank"
        >
          <ListItemIcon
            sx={{ display: 'flex', justifyContent: 'center', ml: 5 }}
          >
            <WhatsAppIcon sx={{ color: '#25D366' }} />
          </ListItemIcon>
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/terms" color="inherit" underline="none">
          <ListItemText primary="Terms & Conditions" />
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
            Export Carpooler
          </Link>
        </Typography>
        {user && (
          <>
            {' '}
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
      </Toolbar>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        sx={{ width: isNonMobileScreens ? 500 : 250 }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
