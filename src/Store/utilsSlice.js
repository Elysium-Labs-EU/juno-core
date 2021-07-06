/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const utilsSlice = createSlice({
  name: 'utils',
  initialState: {
    isLoading: false,
    serviceUnavailable: null,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setServiceUnavailable: (state, action) => {
      state.serviceUnavailable = action.payload
    },
  },
})

export const { setIsLoading, setServiceUnavailable } = utilsSlice.actions

export const selectIsLoading = (state) => state.utils.isLoading
export const selectServiceUnavailable = (state) =>
  state.utils.serviceUnavailable

export default utilsSlice.reducer
