/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = Object.freeze({
  isLoading: false,
  serviceUnavailable: null,
})

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    resetUtils: () => {
      return initialState
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setServiceUnavailable: (state, action) => {
      state.serviceUnavailable = action.payload
    },
  },
})

export const { resetUtils, setIsLoading, setServiceUnavailable } =
  utilsSlice.actions

export const selectIsLoading = (state) => state.utils.isLoading
export const selectServiceUnavailable = (state) =>
  state.utils.serviceUnavailable

export default utilsSlice.reducer
