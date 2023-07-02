import React, { useEffect, useState } from 'react';
import Login from '../../components/login';
import Register from '../../components/register';
import { Box, Container } from '@mui/material';
import { wakeApi } from '../../services/api';

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
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <Box flexGrow={0}>
        {isLogin ? (
          <Login isLogin={isLogin} setIsLogin={setIsLogin} />
        ) : (
          <Register isLogin={isLogin} setIsLogin={setIsLogin} />
        )}
      </Box>
    </Container>
  );
};

export default AuthForm;
