/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchDrafts } from './draftsSlice'
import { fetchEmails } from './emailListSlice'
import type { RootState } from './store'

interface IUtilsState {
  inSearch: boolean
  isLoading: boolean
  serviceUnavailable: string
  isSilentLoading: boolean
  isSettingsOpen: boolean
  isAvatarVisible: boolean
  emailFetchSize: number
  showIntroduction: boolean | null
  settingsLabelId: string | null
}

const initialState: IUtilsState = Object.freeze({
  inSearch: false,
  isLoading: false,
  serviceUnavailable: '',
  isSilentLoading: false,
  isSettingsOpen: false,
  isAvatarVisible: true,
  emailFetchSize: 20,
  showIntroduction: null,
  settingsLabelId: null,
})

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setInSearch: (state, { payload }: PayloadAction<boolean>) => {
      state.inSearch = payload
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setServiceUnavailable: (state, { payload }: PayloadAction<string>) => {
      state.serviceUnavailable = payload
    },
    setIsSilentLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isSilentLoading = payload
    },
    setIsSettingsOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isSettingsOpen = payload
    },
    setSettings: (state, { payload }) => {
      state.isAvatarVisible = payload.isAvatarVisible
      state.emailFetchSize = payload.emailFetchSize
      state.showIntroduction = payload.showIntroduction
    },
    setShowAvatar: (state, { payload }: PayloadAction<boolean>) => {
      state.isAvatarVisible = payload
    },
    setEmailFetchSize(state, { payload }: PayloadAction<number>) {
      state.emailFetchSize = payload
    },
    setSettingsLabelId(state, { payload }: PayloadAction<string>) {
      state.settingsLabelId = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrafts.rejected, (state, { meta }) => {
      if (!meta.aborted) {
        state.serviceUnavailable = 'Something went wrong whilst loading data.'
      }
    })
    builder.addCase(fetchEmails.pending, (state, { meta: { arg } }) => {
      const { silentLoading } = arg
      if (!state.isLoading && !silentLoading) {
        state.isLoading = true
      }
      if (!state.isSilentLoading && silentLoading) {
        state.isSilentLoading = true
      }
    })
    builder.addCase(fetchEmails.fulfilled, (state) => {
      state.isLoading = false
      state.isSilentLoading = false
    })
    builder.addCase(fetchEmails.rejected, (state, { meta }) => {
      state.isLoading = false
      state.isSilentLoading = false
      if (!meta.aborted) {
        state.serviceUnavailable = 'Something went wrong whilst loading data.'
      }
    })
  },
})

export const {
  setInSearch,
  setIsLoading,
  setServiceUnavailable,
  setIsSilentLoading,
  setIsSettingsOpen,
  setSettings,
  setShowAvatar,
  setEmailFetchSize,
  setSettingsLabelId,
} = utilsSlice.actions

export const selectIsSettingsOpen = (state: RootState) =>
  state.utils.isSettingsOpen
export const selectAvatarVisibility = (state: RootState) =>
  state.utils.isAvatarVisible
export const selectInSearch = (state: RootState) => state.utils.inSearch
export const selectIsLoading = (state: RootState) => state.utils.isLoading
export const selectServiceUnavailable = (state: RootState) =>
  state.utils.serviceUnavailable
export const selectIsSilentLoading = (state: RootState) =>
  state.utils.isSilentLoading
export const selectEmailListSize = (state: RootState) =>
  state.utils.emailFetchSize
export const selectShowIntroduction = (state: RootState) =>
  state.utils.showIntroduction
export const selectSettingsLabelId = (state: RootState) =>
  state.utils.settingsLabelId

export default utilsSlice.reducer
