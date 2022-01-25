/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface IUtilsState {
  inSearch: boolean
  isLoading: boolean
  serviceUnavailable: string
  isSilentLoading: boolean
}

const initialState: IUtilsState = Object.freeze({
  inSearch: false,
  isLoading: false,
  serviceUnavailable: '',
  isSilentLoading: false,
})

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setInSearch: (state, action: PayloadAction<boolean>) => {
      state.inSearch = action.payload
    },
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

export const {
  setInSearch,
  setIsLoading,
  setServiceUnavailable,
  setIsSilentLoading,
} = utilsSlice.actions

export const selectInSearch = (state: RootState) => state.utils.inSearch
export const selectIsLoading = (state: RootState) => state.utils.isLoading
export const selectServiceUnavailable = (state: RootState) =>
  state.utils.serviceUnavailable
export const selectIsSilentLoading = (state: RootState) =>
  state.utils.isSilentLoading

export default utilsSlice.reducer
