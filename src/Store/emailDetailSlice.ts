/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmailDetailState } from './storeTypes/emailDetailTypes'
import type { RootState } from './store'

const initialState: EmailDetailState = Object.freeze({
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
  setCurrentEmail,
  setCurrentMessage,
  setViewIndex,
  setSessionViewIndex,
  setIsReplying,
  setIsForwarding,
} = emailDetailSlice.actions

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
