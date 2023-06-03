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
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

const colors = ['orange', 'pink', 'green', 'red', 'purple'];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [randomColor, setRandomColor] = useState(
    colors[Math.floor(Math.random() * 6)]
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  console.log(user);

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

  const drawer = (
    <List>
      <ListItemButton onClick={handleDrawerClose}>
        <ListItemIcon>
          <MenuIcon />
        </ListItemIcon>
        <ListItemText primary="Close" />
      </ListItemButton>
      {user.isAdmin && (
        <ListItemButton>
          <Link href="/dashboard" color="inherit" underline="none">
            <ListItemText primary="Dashboard" />
          </Link>
        </ListItemButton>
      )}
      <ListItemButton>
        <Link href="/booking" color="inherit" underline="none">
          <ListItemText primary="Book a ride" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <Link href="/myrides" color="inherit" underline="none">
          <ListItemText primary="My Rides" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <Link href="" color="inherit" underline="none">
          <ListItemText primary="About" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <Link href="" color="inherit" underline="none">
          <ListItemText primary="Contact" />
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Carpooler
        </Typography>
        {user && (
          <>
            <Avatar
              alt={user.firstName}
              src={user.picture}
              sx={{ ml: 2, mr: 1, bgcolor: randomColor }}
            />
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
