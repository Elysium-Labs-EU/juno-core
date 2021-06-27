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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIsLoading = (state) => state.isLoading
export const selectServiceUnavailable = (state) => state.serviceUnavailable

export default utilsSlice.reducer
