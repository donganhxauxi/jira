import { createSlice } from '@reduxjs/toolkit';

const AuthContext = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const AuthReducer = AuthContext.reducer;

export const AuthActions = AuthContext.actions;
