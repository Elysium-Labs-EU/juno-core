/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface UtilsState {
  isLoading: boolean
  serviceUnavailable: string
  isSilentLoading: boolean
}

const initialState: UtilsState = Object.freeze({
  isLoading: false,
  serviceUnavailable: '',
  isSilentLoading: false,
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
    setIsSilentLoading: (state, action: PayloadAction<boolean>) => {
      state.isSilentLoading = action.payload
    },
  },
})

export const { setIsLoading, setServiceUnavailable, setIsSilentLoading } =
  utilsSlice.actions

export const selectIsLoading = (state: RootState) => state.utils.isLoading
export const selectServiceUnavailable = (state: RootState) =>
  state.utils.serviceUnavailable
export const selectIsSilentLoading = (state: RootState) =>
  state.utils.isSilentLoading

export default utilsSlice.reducer
