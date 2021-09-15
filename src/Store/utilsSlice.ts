/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface UtilsState {
  isLoading: boolean
  serviceUnavailable: string
}

const initialState: UtilsState = Object.freeze({
  isLoading: false,
  serviceUnavailable: '',
})

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setServiceUnavailable: (state, action: PayloadAction<string>) => {
      state.serviceUnavailable = action.payload
    },
  },
})

export const { setIsLoading, setServiceUnavailable } = utilsSlice.actions

export const selectIsLoading = (state: RootState) => state.utils.isLoading
export const selectServiceUnavailable = (state: RootState) =>
  state.utils.serviceUnavailable

export default utilsSlice.reducer
