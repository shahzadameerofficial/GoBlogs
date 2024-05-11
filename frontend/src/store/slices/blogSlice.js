import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allBlogs: [],
  searchResults: [],
  searchQuery: ''
}

export const userSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
    updateBlogs: (state, {payload}) => {
      state.allBlogs = payload
    },
    updateSearchResults: (state, {payload}) => {
      state.searchResults = payload
    },
    updateSearchQuery: (state, {payload}) => {
      state.searchQuery = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateBlogs, updateSearchResults, updateSearchQuery } = userSlice.actions

export default userSlice.reducer