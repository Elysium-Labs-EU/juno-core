import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import threadApi from 'data/threadApi'
import type { RootState } from 'store/store'
import type { TEmailDetailState } from 'store/storeTypes/emailDetailTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

/* eslint-disable no-param-reassign */

export const fetchEmailDetail = createAsyncThunk(
  'emailDetail/fetchEmailDetail',
  async (
    {
      threadId,
      labelIds,
      q,
    }: { threadId: string; labelIds: TLabelState['labelIds']; q?: string },
    { signal }
  ) => {
    const response = await threadApi({ signal }).getThreadDetail({ threadId })
    // Convert the output to facilite the current code to update and email in the emaillist.
    if ('data' in response) {
      return { response: { threads: [response.data] }, labels: labelIds, q }
    }
    return { response: { threads: [] }, labels: labelIds, q }
  },
  {
    condition: (arg, { getState }: { getState: any }) => {
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

const initialState: TEmailDetailState = Object.freeze({
  coreStatus: null,
  currEmail: '',
  fetchStatus: 'idle',
  isForwarding: false,
  isReplying: false,
  sessionViewIndex: -1,
  viewIndex: -1,
})

const emailDetailSlice = createSlice({
  name: 'emailDetail',
  initialState,
  reducers: {
    resetEmailDetail: () => initialState,
    setCoreStatus: (
      state,
      { payload }: PayloadAction<TEmailDetailState['coreStatus']>
    ) => {
      state.coreStatus = payload
    },
    setCurrentEmail: (
      state,
      { payload }: PayloadAction<TEmailDetailState['currEmail']>
    ) => {
      state.currEmail = payload
    },
    setViewIndex: (
      state,
      { payload }: PayloadAction<TEmailDetailState['viewIndex']>
    ) => {
      state.viewIndex = payload
    },
    setSessionViewIndex: (
      state,
      { payload }: PayloadAction<TEmailDetailState['sessionViewIndex']>
    ) => {
      state.sessionViewIndex = payload
    },
    setIsReplying: (
      state,
      { payload }: PayloadAction<TEmailDetailState['isReplying']>
    ) => {
      state.isReplying = payload
    },
    setIsForwarding: (
      state,
      { payload }: PayloadAction<TEmailDetailState['isForwarding']>
    ) => {
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
  setViewIndex,
  setSessionViewIndex,
  setIsReplying,
  setIsForwarding,
} = emailDetailSlice.actions

export const selectCoreStatus = (state: RootState) =>
  state.emailDetail.coreStatus
export const selectCurrentEmail = (state: RootState) =>
  state.emailDetail.currEmail
export const selectViewIndex = (state: RootState) => state.emailDetail.viewIndex
export const selectSessionViewIndex = (state: RootState) =>
  state.emailDetail.sessionViewIndex
export const selectIsReplying = (state: RootState) =>
  state.emailDetail.isReplying
export const selectIsForwarding = (state: RootState) =>
  state.emailDetail.isForwarding
export const selectFetchStatus = (state: RootState) =>
  state.emailDetail.fetchStatus

export default emailDetailSlice.reducer
