import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  htmlContent: '',
  imgPlaceholder: 'https://cdn.uc.assets.prezly.com/ffa042ce-acc3-42d3-b36a-7d0b55558d21/image.png',
  themeMode: true,
  defaultAlert: {
    visible: false,
    duration: 0,
    message: undefined,
    variant: "solid",
    color: "neutral",
    size: "sm",
    heading: undefined
  },
  confirmDialog: {
    visible: false,
    message: undefined
  }
}

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setHTMLContent: (state, { payload }) => {
      state.htmlContent = payload
    },
    setThemeMode: (state, { payload }) => {
      state.themeMode = payload
    },
    setConfirmDialog: (state, { payload }) => {
      state.confirmDialog = { ...state.confirmDialog, ...payload }
    },

  },
})

// Action creators are generated for each case reducer function
export const { setLoading, setHTMLContent, setThemeMode, setConfirmDialog } = appSlice.actions

export default appSlice.reducer