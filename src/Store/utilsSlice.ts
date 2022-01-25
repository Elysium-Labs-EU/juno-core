/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface IUtilsState {
  isSearching: boolean
  isLoading: boolean
  serviceUnavailable: string
  isSilentLoading: boolean
  isSettingsOpen: boolean
  isAvatarVisible: boolean
}

const initialState: IUtilsState = Object.freeze({
  isSearching: false,
  isLoading: false,
  serviceUnavailable: '',
  isSilentLoading: false,
  isSettingsOpen: false,
  isAvatarVisible: localStorage.getItem("showAvatar") === "true"
})

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
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
    setIsSettingsOpen: (state, action: PayloadAction<boolean>) => {
      state.isSettingsOpen = action.payload
    },
    setShowAvatar: (state, action: PayloadAction<boolean>) => {
      state.isAvatarVisible = action.payload
    }
  },
})

export const {
  setIsSearching,
  setIsLoading,
  setServiceUnavailable,
  setIsSilentLoading,
  setIsSettingsOpen,
  setShowAvatar,
} = utilsSlice.actions

export const selectIsSearching = (state: RootState) => state.utils.isSearching
export const selectIsSettingsOpen = (state: RootState) => state.utils.isSettingsOpen
export const isAvatarVisible = (state: RootState) => state.utils.isAvatarVisible
export const selectIsLoading = (state: RootState) => state.utils.isLoading
export const selectServiceUnavailable = (state: RootState) =>
  state.utils.serviceUnavailable
export const selectIsSilentLoading = (state: RootState) =>
  state.utils.isSilentLoading

export default utilsSlice.reducer
