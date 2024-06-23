import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: { user: { uid: null, lastServer: null } },
  reducers: {
    loginUser: (state, action) => {
      state.user.uid = action.payload.uid;
    },
    logoutUser: state => {
      state.user.uid = null;
    },
    updateLastServer: (state, action) => {
      state.user.lastServer = action.payload.lastServer;

    },
  },
});

export const { loginUser, logoutUser, updateLastServer } = userSlice.actions;

export const selectUser = state => state.userSlice.user?.uid;
export const lastSelectedServer = state => state.userSlice.user?.lastServer?.serverID;

export default userSlice.reducer;


