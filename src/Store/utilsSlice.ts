/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { push } from 'redux-first-history'
import { fetchDrafts, openDraftEmail } from './draftsSlice'
import { fetchEmails } from './emailListSlice'
import type { AppThunk, RootState } from './store'
import RouteConstants from '../constants/routes.json'
import * as global from '../constants/globalConstants'
import { cleanUpComposerAndDraft } from './composeSlice'
import {
  setCoreStatus,
  setIsForwarding,
  setIsReplying,
  setSessionViewIndex,
  setViewIndex,
} from './emailDetailSlice'
import labelURL from '../utils/createLabelURL'
import labelMap from '../constants/labelMapConstant'
import { findLabelById } from '../utils/findLabel'
import filterIllegalLabels from '../utils/filterIllegalLabels'

interface IUtilsState {
  inSearch: boolean
  isLoading: boolean
  isProcessing: boolean
  serviceUnavailable: string
  isSilentLoading: boolean
  isSettingsOpen: boolean
  isAvatarVisible: boolean
  emailFetchSize: number
  showIntroduction: boolean | null
  settingsLabelId: string | null
  showKeyboardCombos: boolean
}

const initialState: IUtilsState = Object.freeze({
  inSearch: false,
  isLoading: false,
  isProcessing: false,
  serviceUnavailable: '',
  isSilentLoading: false,
  isSettingsOpen: false,
  isAvatarVisible: true,
  emailFetchSize: 20,
  showIntroduction: null,
  settingsLabelId: null,
  showKeyboardCombos: false,
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
    setIsProcessing: (state, { payload }: PayloadAction<boolean>) => {
      state.isProcessing = payload
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
    setShowKeyboardCombos(state, { payload }: PayloadAction<boolean>) {
      state.showKeyboardCombos = payload
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
  setIsProcessing,
  setServiceUnavailable,
  setIsSilentLoading,
  setIsSettingsOpen,
  setSettings,
  setShowAvatar,
  setEmailFetchSize,
  setSettingsLabelId,
  setShowKeyboardCombos,
} = utilsSlice.actions

export const closeMail = (): AppThunk => (dispatch, getState) => {
  const { labelIds, storageLabels } = getState().labels
  const foundLabel = findLabelById({ storageLabels, labelIds })
  if (foundLabel.length > 0) {
    dispatch(push(labelMap[foundLabel[0].name]))
    return
  }
  dispatch(push(RouteConstants.HOME))
}

export const openEmail =
  ({ email, id }: { email?: any; id: string }): AppThunk =>
  (dispatch, getState) => {
    const { labelIds, storageLabels } = getState().labels
    const { inSearch } = getState().utils

    const onlyLegalLabels = filterIllegalLabels(labelIds, storageLabels)

    if (!onlyLegalLabels.includes(global.DRAFT_LABEL) && !inSearch) {
      dispatch(push(`/mail/${labelURL(onlyLegalLabels)}/${id}/messages`))
      return
    }
    if (onlyLegalLabels.includes(global.DRAFT_LABEL) && email) {
      const messageId = email.messages[email.messages.length - 1].id
      dispatch(openDraftEmail({ id, messageId }))
    }
  }

export const navigateTo =
  (destination: string): AppThunk =>
  (dispatch, getState) => {
    const { composeEmail } = getState().compose
    if (Object.keys(composeEmail).length > 0) {
      dispatch(cleanUpComposerAndDraft())
      if (getState().emailDetail.isReplying) {
        dispatch(setIsReplying(false))
      }
      if (getState().emailDetail.isForwarding) {
        dispatch(setIsForwarding(false))
      }
    }
    dispatch(push(destination))
  }

export const navigateBack = (): AppThunk => (dispatch, getState) => {
  const { coreStatus } = getState().emailDetail
  const { composeEmail } = getState().compose
  const { labelIds } = getState().labels
  if (!coreStatus) {
    // if (Object.keys(composeEmail).length > 0) {
    //   dispatch(cleanUpComposerAndDraft())
    // }
    if (labelIds.includes(global.INBOX_LABEL)) {
      dispatch(push(RouteConstants.INBOX))
      return
    }
    if (labelIds.includes(global.DRAFT_LABEL)) {
      dispatch(push(RouteConstants.DRAFTS))
      return
    }
    dispatch(push(RouteConstants.HOME))
  }
  if (coreStatus === global.CORE_STATUS_FOCUSED) {
    dispatch(push(RouteConstants.HOME))
    return
  }
  if (coreStatus === global.CORE_STATUS_SORTING) {
    dispatch(push(RouteConstants.INBOX))
    return
  }
  if (coreStatus) {
    dispatch(setCoreStatus(null))
  }
}

export const navigateNextMail = (): AppThunk => (dispatch, getState) => {
  const { emailList, activeEmailListIndex } = getState().email
  const { coreStatus, sessionViewIndex, viewIndex } = getState().emailDetail
  const { labelIds } = getState().labels

  dispatch(setViewIndex(viewIndex + 1))
  if (coreStatus) {
    dispatch(setSessionViewIndex(sessionViewIndex + 1))
  }

  const nextID = emailList[activeEmailListIndex]?.threads[viewIndex + 1]?.id
  if (nextID) {
    return dispatch(push(`/mail/${labelURL(labelIds)}/${nextID}/messages`))
  }
  return dispatch(navigateBack())
}

export const navigatePreviousMail = (): AppThunk => (dispatch, getState) => {
  const { emailList, activeEmailListIndex } = getState().email
  const { viewIndex } = getState().emailDetail
  const { labelIds } = getState().labels

  dispatch(setViewIndex(viewIndex - 1))

  const prevID = emailList[activeEmailListIndex]?.threads[viewIndex - 1]?.id
  if (prevID) {
    return dispatch(push(`/mail/${labelURL(labelIds)}/${prevID}/messages`))
  }
  return dispatch(navigateBack())
}

export const selectIsSettingsOpen = (state: RootState) =>
  state.utils.isSettingsOpen
export const selectAvatarVisibility = (state: RootState) =>
  state.utils.isAvatarVisible
export const selectInSearch = (state: RootState) => state.utils.inSearch
export const selectIsProcessing = (state: RootState) => state.utils.isProcessing
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
export const selectShowKeyboardCombos = (state: RootState) =>
  state.utils.showKeyboardCombos

export default utilsSlice.reducer
