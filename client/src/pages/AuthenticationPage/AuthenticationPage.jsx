import React, { useEffect, useState } from 'react';
import Login from '../../components/login';
import Register from '../../components/register';
import { Box, Container, Typography, Grid } from '@mui/material';
import { wakeApi } from '../../services/api';
import MinorCrashTwoToneIcon from '@mui/icons-material/MinorCrashTwoTone';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // Starts backend server on pageload
    wakeApi()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Box
          sx={{
            width: '92%',
            marginTop: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(200, 200, 200, 0.6)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '36px',
            px: { xs: '2rem', sm: '4rem', md: '6rem' }
          }}
        >
          <Typography
            variant="h3"
            color="white"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              lineHeight: { xs: '2.5rem', sm: '3rem', md: '4.5rem' },
              marginRight: '10px'
            }}
          >
            Carpooler
          </Typography>
          <MinorCrashTwoToneIcon
            htmlColor="#D3D3D2"
            sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}
          />
        </Box>

        <Box width="100%" flexGrow={0}>
          {isLogin ? (
            <Login isLogin={isLogin} setIsLogin={setIsLogin} />
          ) : (
            <Register isLogin={isLogin} setIsLogin={setIsLogin} />
          )}
        </Box>
      </Container>
    </>
  );
};

export default AuthForm;
