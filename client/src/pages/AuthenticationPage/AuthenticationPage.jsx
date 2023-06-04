import React, { useState } from 'react';
import Login from '../../components/login';
import Register from '../../components/register';
import { Box, Container } from '@mui/material';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
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
