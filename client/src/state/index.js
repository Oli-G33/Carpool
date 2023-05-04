import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    user: null
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setLogout: state => {
      state.isLoggedIn = false;
      state.user = null;
    }
  }
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
