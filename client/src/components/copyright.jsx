import { Link, Typography } from '@mui/material';

export function Copyright(props) {
  return (
    <Typography variant="body2" color="#D3D3D2" align="center" {...props}>
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://oliver-garcia.onrender.com"
        target="_blank"
      >
        Oliver Garcia
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
