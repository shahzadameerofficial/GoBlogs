import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userCredentials: {
    _id: null,
    name: null,
    email: null,
    auth: false
  },
  userDetails: {}
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserCredentials: (state, {payload}) => {
      state.userCredentials = payload
    },
    setUserDetails: (state, {payload}) => {
      state.userDetails = payload
    },
    resetUserCredentials: (state) => {
      state.userCredentials._id = null;
      state.userCredentials.name = null;
      state.userCredentials.email = null;
      state.userCredentials.auth = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserCredentials, setUserDetails, resetUserCredentials } = userSlice.actions

export default userSlice.reducer