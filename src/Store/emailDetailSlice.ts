/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEmailDetailState } from './storeTypes/emailDetailTypes'
import type { RootState } from './store'

const initialState: IEmailDetailState = Object.freeze({
  coreStatus: null,
  currEmail: '',
  currMessage: '',
  viewIndex: -1,
  sessionViewIndex: -1,
  isReplying: false,
  isForwarding: false,
})

export const emailDetailSlice = createSlice({
  name: 'emailDetail',
  initialState,
  reducers: {
    resetEmailDetail: () => initialState,
    setCoreStatus: (state, { payload }: PayloadAction<string | null>) => {
      state.coreStatus = payload
    },
    setCurrentEmail: (state, { payload }) => {
      state.currEmail = payload
    },
    setCurrentMessage: (state, { payload }) => {
      state.currMessage = payload
    },
    setViewIndex: (state, { payload }: PayloadAction<number>) => {
      state.viewIndex = payload
    },
    setSessionViewIndex: (state, { payload }: PayloadAction<number>) => {
      state.sessionViewIndex = payload
    },
    setIsReplying: (state, { payload }: PayloadAction<boolean>) => {
      state.isReplying = payload
    },
    setIsForwarding: (state, { payload }: PayloadAction<boolean>) => {
      state.isForwarding = payload
    },
  },
})

export const {
  resetEmailDetail,
  setCoreStatus,
  setCurrentEmail,
  setCurrentMessage,
  setViewIndex,
  setSessionViewIndex,
  setIsReplying,
  setIsForwarding,
} = emailDetailSlice.actions

export const selectCoreStatus = (state: RootState) =>
  state.emailDetail.coreStatus
export const selectCurrentEmail = (state: RootState) =>
  state.emailDetail.currEmail
export const selectCurrentMessage = (state: RootState) =>
  state.emailDetail.currMessage
export const selectViewIndex = (state: RootState) => state.emailDetail.viewIndex
export const selectSessionViewIndex = (state: RootState) =>
  state.emailDetail.sessionViewIndex
export const selectIsReplying = (state: RootState) =>
  state.emailDetail.isReplying
export const selectIsForwarding = (state: RootState) =>
  state.emailDetail.isForwarding

export default emailDetailSlice.reducer
