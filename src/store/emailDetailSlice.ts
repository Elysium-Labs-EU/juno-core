/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEmailDetailState } from './storeTypes/emailDetailTypes'
import type { RootState } from './store'
import threadApi from '../data/threadApi'

export const fetchEmailDetail = createAsyncThunk(
  'emailDetail/fetchEmailDetail',
  async (
    {
      threadId,
      labelIds,
      q,
    }: { threadId: string; labelIds: string[]; q?: string },
    { signal }
  ) => {
    const response = await threadApi({ signal }).getThreadDetail(threadId)
    // Convert the output to facilite the current code to update and email in the emaillist.
    return { response: { threads: [response] }, labels: labelIds, q }
  },
  {
    condition: (arg, { getState }) => {
      const { fetchStatus } = getState().emailDetail
      // Don't retry a request that's currently in-flight
      if (fetchStatus === 'pending') {
        return false
      }
      return true
    },
    dispatchConditionRejection: true,
  }
)

const initialState: IEmailDetailState = Object.freeze({
  coreStatus: null,
  currEmail: '',
  currMessage: '',
  viewIndex: -1,
  sessionViewIndex: -1,
  isReplying: false,
  isForwarding: false,
  fetchStatus: 'idle',
})

export const emailDetailSlice = createSlice({
  name: 'emailDetail',
  initialState,
  reducers: {
    resetEmailDetail: () => initialState,
    setCoreStatus: (state, { payload }: PayloadAction<string | null>) => {
      state.coreStatus = payload
    },
    setCurrentEmail: (state, { payload }: PayloadAction<string>) => {
      state.currEmail = payload
    },
    setCurrentMessage: (state, { payload }: PayloadAction<string>) => {
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
  extraReducers: (builder) => {
    builder.addCase(fetchEmailDetail.pending, (state) => {
      state.fetchStatus = 'pending'
    })
    builder.addCase(fetchEmailDetail.rejected, (state) => {
      state.fetchStatus = 'rejected'
    })
    builder.addCase(fetchEmailDetail.fulfilled, (state) => {
      state.fetchStatus = 'idle'
    })
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
