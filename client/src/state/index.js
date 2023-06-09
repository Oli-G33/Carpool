import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log('Updated state:', state.user);
    },
    setLogout: state => {
      state.user = null;
      state.token = null;
    }
  }
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
