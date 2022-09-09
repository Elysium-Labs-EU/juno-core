/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { push } from 'redux-first-history'
import { fetchDrafts, openDraftEmail } from './draftsSlice'
import { fetchEmailsFull, fetchEmailsSimple } from './emailListSlice'
import type { AppThunk, RootState } from './store'
import RouteConstants from '../constants/routes.json'
import * as global from '../constants/globalConstants'
import {
  setCoreStatus,
  setIsForwarding,
  setIsReplying,
  setSessionViewIndex,
  setViewIndex,
} from './emailDetailSlice'
import labelURL from '../utils/createLabelURL'
import { getRouteByLabelMap } from '../constants/labelMapConstant'
import { findLabelById } from '../utils/findLabel'
import filterIllegalLabels from '../utils/filterIllegalLabels'
import { IEmailListThreadItem } from './storeTypes/emailListTypes'

interface IUtilsState {
  inSearch: boolean
  isLoading: boolean
  isProcessing: boolean
  serviceUnavailable: string | null
  isSilentLoading: boolean
  isAvatarVisible: boolean
  isFlexibleFlowActive: boolean
  alternateActions: boolean
  emailFetchSize: number
  settingsLabelId: string | null
  activeModal: null | string
}

export const initialState: IUtilsState = Object.freeze({
  inSearch: false,
  isLoading: false,
  isProcessing: false,
  serviceUnavailable: null,
  isSilentLoading: false,
  isAvatarVisible: true,
  isFlexibleFlowActive: false,
  alternateActions: true,
  emailFetchSize: 20,
  settingsLabelId: null,
  activeModal: null,
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
    setSettings: (state, { payload }) => {
      state.isAvatarVisible = payload.isAvatarVisible
      state.emailFetchSize = payload.emailFetchSize
      state.activeModal = payload.showIntroduction
        ? global.ACTIVE_MODAL_MAP.intro
        : null
      state.isFlexibleFlowActive = payload.isFlexibleFlowActive
      state.alternateActions = payload.alternateActions
    },
    setShowAvatar: (state, { payload }: PayloadAction<boolean>) => {
      state.isAvatarVisible = payload
    },
    setFlexibleFlow: (state, { payload }: PayloadAction<boolean>) => {
      state.isFlexibleFlowActive = payload
    },
    setAlternateActions: (state, { payload }: PayloadAction<boolean>) => {
      state.alternateActions = payload
    },
    setEmailFetchSize(state, { payload }: PayloadAction<number>) {
      state.emailFetchSize = payload
    },
    setSettingsLabelId(state, { payload }: PayloadAction<string>) {
      state.settingsLabelId = payload
    },
    setActiveModal(state, { payload }: PayloadAction<string | null>) {
      state.activeModal = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrafts.rejected, (state, { meta }) => {
      if (!meta.aborted) {
        state.serviceUnavailable = global.SOMETHING_WRONG
      }
    })
    builder.addCase(fetchEmailsSimple.pending, (state, { meta: { arg } }) => {
      const { silentLoading } = arg
      if (!state.isLoading && !silentLoading) {
        state.isLoading = true
      }
      if (!state.isSilentLoading && silentLoading) {
        state.isSilentLoading = true
      }
    })
    builder.addCase(fetchEmailsSimple.fulfilled, (state) => {
      state.isLoading = false
      state.isSilentLoading = false
    })
    builder.addCase(fetchEmailsSimple.rejected, (state, { meta }) => {
      state.isLoading = false
      state.isSilentLoading = false
      if (!meta.aborted) {
        state.serviceUnavailable = global.SOMETHING_WRONG
      }
    })
    builder.addCase(fetchEmailsFull.pending, (state, { meta: { arg } }) => {
      const { silentLoading } = arg
      if (!state.isLoading && !silentLoading) {
        state.isLoading = true
      }
      if (!state.isSilentLoading && silentLoading) {
        state.isSilentLoading = true
      }
    })
    builder.addCase(fetchEmailsFull.fulfilled, (state) => {
      state.isLoading = false
      state.isSilentLoading = false
    })
    builder.addCase(fetchEmailsFull.rejected, (state, { meta }) => {
      state.isLoading = false
      state.isSilentLoading = false
      if (!meta.aborted) {
        state.serviceUnavailable = global.SOMETHING_WRONG
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
  setSettings,
  setShowAvatar,
  setFlexibleFlow,
  setAlternateActions,
  setEmailFetchSize,
  setSettingsLabelId,
  setActiveModal,
} = utilsSlice.actions

// TODO: Refactor this with the BackButton
export const closeMail = (): AppThunk => (dispatch, getState) => {
  const { labelIds, storageLabels } = getState().labels
  const foundLabel = findLabelById({ storageLabels, labelIds })
  if (foundLabel) {
    dispatch(push(getRouteByLabelMap[foundLabel.name]))
    return
  }
  dispatch(push(RouteConstants.TODO))
}

export const openEmail =
  ({ email, id }: { email?: IEmailListThreadItem; id: string }): AppThunk =>
  (dispatch, getState) => {
    const { labelIds, storageLabels } = getState().labels

    const onlyLegalLabels = filterIllegalLabels(labelIds, storageLabels)

    // Open the regular view if there are more than 1 message (draft and regular combined). If it is only a Draft, it should open the draft right away
    if (
      email?.messages?.length === 1 &&
      onlyLegalLabels.includes(global.DRAFT_LABEL) &&
      email
    ) {
      const messageId = email.messages[email.messages.length - 1].id
      dispatch(openDraftEmail({ id, messageId }))
      return
    }
    dispatch(push(`/mail/${labelURL(onlyLegalLabels)}/${id}/messages`))
  }

export const navigateTo =
  (destination: string): AppThunk =>
  (dispatch, getState) => {
    if (getState().emailDetail.isReplying) {
      dispatch(setIsReplying(false))
    }
    if (getState().emailDetail.isForwarding) {
      dispatch(setIsForwarding(false))
    }
    dispatch(push(destination))
  }

export const navigateBack = (): AppThunk => (dispatch, getState) => {
  const { coreStatus } = getState().emailDetail
  const { labelIds } = getState().labels
  if (!coreStatus) {
    if (labelIds.includes(global.INBOX_LABEL)) {
      dispatch(push(RouteConstants.TODO))
      return
    }
    if (labelIds.includes(global.DRAFT_LABEL)) {
      dispatch(push(RouteConstants.DRAFTS))
      return
    }
    if (labelIds.includes(global.SENT_LABEL)) {
      dispatch(push(RouteConstants.SENT))
      return
    }
    if (labelIds.includes(global.ARCHIVE_LABEL)) {
      dispatch(push(RouteConstants.ARCHIVE))
      return
    }
    dispatch(push(RouteConstants.TODO))
  }
  if (coreStatus === global.CORE_STATUS_FOCUSED) {
    dispatch(push(RouteConstants.TODO))
    return
  }
  if (coreStatus === global.CORE_STATUS_SORTING) {
    dispatch(push(RouteConstants.TODO))
    return
  }
  if (coreStatus) {
    dispatch(setCoreStatus(null))
  }
}

export const navigateNextMail = (): AppThunk => (dispatch, getState) => {
  const { emailList, activeEmailListIndex, searchList } = getState().email
  const { coreStatus, sessionViewIndex, viewIndex } = getState().emailDetail
  const { labelIds } = getState().labels

  dispatch(setViewIndex(viewIndex + 1))
  if (coreStatus) {
    dispatch(setSessionViewIndex(sessionViewIndex + 1))
  }

  const nextID =
    coreStatus !== global.CORE_STATUS_SEARCHING
      ? emailList[activeEmailListIndex]?.threads[viewIndex + 1]?.id
      : searchList?.threads[viewIndex + 1]?.id
  if (nextID) {
    return dispatch(push(`/mail/${labelURL(labelIds)}/${nextID}/messages`))
  }
  return dispatch(navigateBack())
}

export const navigatePreviousMail = (): AppThunk => (dispatch, getState) => {
  const { emailList, activeEmailListIndex, searchList } = getState().email
  const { coreStatus, viewIndex } = getState().emailDetail
  const { labelIds } = getState().labels

  dispatch(setViewIndex(viewIndex - 1))

  const prevID =
    coreStatus !== global.CORE_STATUS_SEARCHING
      ? emailList[activeEmailListIndex]?.threads[viewIndex - 1]?.id
      : searchList?.threads[viewIndex - 1]?.id
  if (prevID) {
    return dispatch(push(`/mail/${labelURL(labelIds)}/${prevID}/messages`))
  }
  return dispatch(navigateBack())
}

export const selectIsAvatarVisible = (state: RootState) =>
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
export const selectSettingsLabelId = (state: RootState) =>
  state.utils.settingsLabelId
export const selectIsFlexibleFlowActive = (state: RootState) =>
  state.utils.isFlexibleFlowActive
export const selectAlternateActions = (state: RootState) =>
  state.utils.alternateActions
export const selectActiveModal = (state: RootState) => state.utils.activeModal

export default utilsSlice.reducer
