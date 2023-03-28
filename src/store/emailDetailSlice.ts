import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { push } from 'redux-first-history'

import {
  CORE_STATUS_MAP,
  INBOX_LABEL,
  TODO_LABEL_NAME,
} from 'constants/globalConstants'
import threadApi from 'data/threadApi'
import type { AppThunk, RootState } from 'store/store'
import type { TEmailDetailState } from 'store/storeTypes/emailDetailTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import labelURL from 'utils/createLabelURL'
import { findLabelByName } from 'utils/findLabel'

import type { TEmailListState } from './storeTypes/emailListTypes'

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

interface IStartSort {
  toUseActiveEmailListIndex: number
  toUseLabelURL: string
  toUseSelectedEmails: TEmailListState['selectedEmails'] | undefined
}

export const startSort =
  ({
    toUseActiveEmailListIndex,
    toUseLabelURL,
    toUseSelectedEmails,
  }: IStartSort): AppThunk =>
  (dispatch, getState) => {
    const { emailList } = getState().email
    if (toUseLabelURL && emailList && toUseActiveEmailListIndex > -1) {
      if (toUseSelectedEmails && toUseSelectedEmails.selectedIds?.length > 0) {
        dispatch(
          push(
            `/mail/${toUseLabelURL}/${toUseSelectedEmails.selectedIds[0]}/messages`
          )
        )
      } else {
        const firstThreadObject =
          emailList[toUseActiveEmailListIndex]?.threads[0]
        if (firstThreadObject) {
          dispatch(
            push(`/mail/${toUseLabelURL}/${firstThreadObject.id}/messages`)
          )
        }
      }
    } else {
      toast.error('Unable to start sorting.')
    }
  }

export const activateInboxSort =
  ({
    alternateEmailListIndex,
    onActivateAdditionalFns,
  }: {
    alternateEmailListIndex?: number
    onActivateAdditionalFns?: () => void
  }): AppThunk =>
  (dispatch, getState) => {
    const staticLabelURL = labelURL([INBOX_LABEL])
    if (!staticLabelURL) {
      toast.error('Unable to start sorting.')
      return
    }
    const { activeEmailListIndex, selectedEmails } = getState().email
    const toUseSelectedEmails = selectedEmails.labelIds.includes(INBOX_LABEL)
      ? selectedEmails
      : undefined
    if (onActivateAdditionalFns) {
      onActivateAdditionalFns()
    }
    dispatch(
      startSort({
        toUseLabelURL: staticLabelURL,
        toUseActiveEmailListIndex:
          alternateEmailListIndex !== undefined
            ? alternateEmailListIndex
            : activeEmailListIndex,
        toUseSelectedEmails,
      })
    )

    dispatch(setCoreStatus(CORE_STATUS_MAP.sorting))
    dispatch(setSessionViewIndex(0))
    dispatch(setViewIndex(0))
  }

export const activateTodo = (): AppThunk => (dispatch, getState) => {
  const { labelIds } = getState().labels
  const staticLabelURL = labelURL(labelIds)
  if (!staticLabelURL) {
    toast.error('Unable to start focus mode.')
    return
  }

  const { activeEmailListIndex, selectedEmails } = getState().email
  const { storageLabels } = getState().labels

  const toUseSelectedEmails = selectedEmails.labelIds.includes(
    findLabelByName({
      storageLabels,
      LABEL_NAME: TODO_LABEL_NAME,
    })?.id ?? ''
  )
    ? selectedEmails
    : undefined

  dispatch(
    startSort({
      toUseActiveEmailListIndex: activeEmailListIndex,
      toUseLabelURL: staticLabelURL,
      toUseSelectedEmails,
    })
  )

  dispatch(setCoreStatus(CORE_STATUS_MAP.focused))
  dispatch(setSessionViewIndex(0))
  dispatch(setViewIndex(0))
}

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
