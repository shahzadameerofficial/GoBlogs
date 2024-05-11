import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import blogSlice from './slices/blogSlice'
import appSlice from './slices/appSlice'


export const store = configureStore({
  reducer: {
    user: userSlice,
    blogs: blogSlice,
    app: appSlice
  },
})