import { useState } from 'react';
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
  ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { setLogout } from '../state';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const colors = ['orange', 'pink', 'green', 'red', 'purple'];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [randomColor] = useState(colors[Math.floor(Math.random() * 6)]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const handleDrawerOpen = () => {
    setOpen(true);
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
    <AppBar position="sticky">
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
          variant="h6"
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
                src={user.picture}
                alt={user.firstName}
                sx={{
                  ml: 2,
                  mr: 1,
                  bgcolor: randomColor,
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
        sx={{ width: 250 }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
