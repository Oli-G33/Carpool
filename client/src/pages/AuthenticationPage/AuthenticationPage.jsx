import React, { useState } from 'react';
import Login from '../../components/login';
import Register from '../../components/register';
import { Box } from '@mui/material';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box flexGrow={0}>
      {isLogin ? (
        <Login isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <Register isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </Box>
  );
};

export default AuthForm;
