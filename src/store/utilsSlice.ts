import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { push } from 'redux-first-history'

import activateTodo from 'components/ToDo/activateTodo'
import * as global from 'constants/globalConstants'
import { getRouteByLabelMap } from 'constants/labelMapConstant'
import RouteConstants from 'constants/routesConstants'
import {
  deleteDraftBatch,
  fetchDrafts,
  openDraftEmail,
} from 'store/draftsSlice'
import {
  setCoreStatus,
  setCurrentEmail,
  setIsForwarding,
  setIsReplying,
  setSessionViewIndex,
  setViewIndex,
} from 'store/emailDetailSlice'
import {
  fetchEmailsSimple,
  setSelectedEmails,
  updateEmailLabelBatch,
} from 'store/emailListSlice'
import type { AppThunk, RootState } from 'store/store'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import type {
  IMessageSendStatus,
  ISystemStatusUpdate,
  IUtilsState,
} from 'store/storeTypes/utilsTypes'
import labelURL from 'utils/createLabelURL'
import { findLabelById } from 'utils/findLabel'
import getSenderFromList from 'utils/getSenderFromList'
import multipleIncludes from 'utils/multipleIncludes'
import { onlyLegalLabelStrings } from 'utils/onlyLegalLabels'

/* eslint-disable no-param-reassign */

export const initialState: IUtilsState = Object.freeze({
  activeModal: null,
  alternateActions: true,
  emailFetchSize: 20,
  inSearch: false,
  isAvatarVisible: true,
  isFlexibleFlowActive: false,
  isLoading: false,
  isProcessing: false,
  isSending: null,
  isSentryActive: true,
  isSilentLoading: false,
  settingsLabelId: null,
  systemStatusUpdate: null,
})

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setActiveModal(
      state,
      { payload }: PayloadAction<IUtilsState['activeModal']>
    ) {
      state.activeModal = payload
    },
    setAlternateActions: (
      state,
      { payload }: PayloadAction<IUtilsState['alternateActions']>
    ) => {
      state.alternateActions = payload
    },
    setEmailFetchSize(
      state,
      { payload }: PayloadAction<IUtilsState['emailFetchSize']>
    ) {
      state.emailFetchSize = payload
    },
    setFlexibleFlow: (
      state,
      { payload }: PayloadAction<IUtilsState['isFlexibleFlowActive']>
    ) => {
      state.isFlexibleFlowActive = payload
    },
    setInSearch: (
      state,
      { payload }: PayloadAction<IUtilsState['inSearch']>
    ) => {
      state.inSearch = payload
    },
    setIsLoading: (
      state,
      { payload }: PayloadAction<IUtilsState['isLoading']>
    ) => {
      state.isLoading = payload
    },
    setIsProcessing: (
      state,
      { payload }: PayloadAction<IUtilsState['isProcessing']>
    ) => {
      state.isProcessing = payload
    },
    setIsSending: (
      state,
      { payload }: PayloadAction<IMessageSendStatus | null>
    ) => {
      if (payload) {
        // Create an object with a timestamp. The timestamp is used to track it.
        state.isSending = {
          message: payload.message,
          type: payload.type,
          timestamp: new Date().getTime(),
        }
      } else {
        // If a null is received, reset the state.
        state.isSending = null
      }
    },
    setIsSentryActive: (
      state,
      { payload }: PayloadAction<IUtilsState['isSentryActive']>
    ) => {
      state.isSentryActive = payload
    },
    setIsSilentLoading: (
      state,
      { payload }: PayloadAction<IUtilsState['isSilentLoading']>
    ) => {
      state.isSilentLoading = payload
    },
    setSystemStatusUpdate: (
      state,
      { payload }: PayloadAction<ISystemStatusUpdate | null>
    ) => {
      if (payload) {
        // Create an object with a timestamp. The timestamp is used to track it.
        state.systemStatusUpdate = {
          message: payload.message,
          type: payload.type,
          timestamp: new Date().getTime(),
          action: payload?.action,
          actionType: payload.actionType ?? 'close',
        }
      } else {
        // If a null is received, reset the state.
        state.systemStatusUpdate = null
      }
    },
    setSettings: (state, { payload }: PayloadAction<any>) => {
      state.isAvatarVisible = payload.isAvatarVisible
      state.emailFetchSize = payload.emailFetchSize
      state.activeModal = payload.showIntroduction
        ? global.ACTIVE_MODAL_MAP.intro
        : null
      state.isFlexibleFlowActive = payload.isFlexibleFlowActive
      state.alternateActions = payload.alternateActions
    },
    setSettingsLabelId(
      state,
      { payload }: PayloadAction<IUtilsState['settingsLabelId']>
    ) {
      state.settingsLabelId = payload
    },
    setShowAvatar: (
      state,
      { payload }: PayloadAction<IUtilsState['isAvatarVisible']>
    ) => {
      state.isAvatarVisible = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrafts.rejected, (state, { meta }) => {
      if (!meta.aborted) {
        state.systemStatusUpdate = {
          type: 'error',
          message: `Drafts - ${global.SOMETHING_WRONG}`,
          timestamp: new Date().getTime(),
        }
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
        state.systemStatusUpdate = {
          type: 'error',
          message: global.SOMETHING_WRONG,
          timestamp: new Date().getTime(),
        }
      }
    })
  },
})

export const {
  setActiveModal,
  setAlternateActions,
  setEmailFetchSize,
  setFlexibleFlow,
  setInSearch,
  setIsLoading,
  setIsProcessing,
  setIsSending,
  setIsSentryActive,
  setIsSilentLoading,
  setSettings,
  setSettingsLabelId,
  setShowAvatar,
  setSystemStatusUpdate,
} = utilsSlice.actions

export const closeMail = (): AppThunk => (dispatch, getState) => {
  const { labelIds, storageLabels } = getState().labels
  const foundLabel = findLabelById({ storageLabels, labelIds })
  if (foundLabel && foundLabel?.name) {
    const { isFlexibleFlowActive } = getState().utils
    // If the flexibleFlow isn't active, thus no dedicated Inbox page, reroute the user to To Do page
    if (!isFlexibleFlowActive && foundLabel.id === global.INBOX_LABEL) {
      dispatch(push(RouteConstants.TODO))
      return
    }
    const route = getRouteByLabelMap[foundLabel.name]
    if (route) {
      dispatch(push(route))
      return
    }
  }
  dispatch(push(RouteConstants.TODO))
}

export const openEmail = ({
  email,
  id,
}: {
  email?: TThreadObject
  id: string
}): AppThunk => (dispatch, getState) => {
  const { labelIds, storageLabels } = getState().labels

  const onlyLegalLabels = onlyLegalLabelStrings({ labelIds, storageLabels })
  const lastMessage = email?.messages[email.messages.length - 1]
  // Open the regular view if there are more than 1 message (draft and regular combined). If it is only a Draft, it should open the draft right away
  if (lastMessage && onlyLegalLabels.includes(global.DRAFT_LABEL)) {
    const messageId = lastMessage.id
    dispatch(openDraftEmail({ id, messageId }))
    return
  }
  dispatch(setCurrentEmail(id))
  dispatch(push(`/mail/${labelURL(onlyLegalLabels)}/${id}/messages`))
}

export const navigateTo = (destination: string): AppThunk => (
  dispatch,
  getState
) => {
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
  dispatch(closeMail())
  if (coreStatus) {
    dispatch(setCoreStatus(null))
  }
}

/**
 * @function navigateNextMail
 * @param blockViewIndexUpdate an optional paramater
 * @param forceNavigateBack an optional parameter
 * @returns
 */

export const navigateNextMail = (
  blockViewIndexUpdate?: boolean,
  forceNavigateBack?: boolean
): AppThunk => (dispatch, getState) => {
  const {
    emailList,
    activeEmailListIndex,
    searchList,
    selectedEmails,
  } = getState().email
  const { coreStatus, sessionViewIndex, viewIndex } = getState().emailDetail
  const { labelIds } = getState().labels
  const { isFlexibleFlowActive } = getState().utils

  if (!blockViewIndexUpdate) {
    dispatch(setViewIndex(viewIndex + 1))
  }
  if (coreStatus && coreStatus !== global.CORE_STATUS_MAP.searching) {
    dispatch(setSessionViewIndex(sessionViewIndex + 1))
  }

  const nextID = () => {
    if (coreStatus !== global.CORE_STATUS_MAP.searching) {
      if (
        (coreStatus === global.CORE_STATUS_MAP.focused ||
          (isFlexibleFlowActive &&
            coreStatus === global.CORE_STATUS_MAP.sorting)) &&
        selectedEmails &&
        selectedEmails.selectedIds.length > 0
      ) {
        return selectedEmails.selectedIds[viewIndex + 1]
      }
      return emailList[activeEmailListIndex]?.threads[viewIndex + 1]?.id
    }
    return searchList?.threads[viewIndex + 1]?.id
  }

  const staticNextID = nextID()
  if (staticNextID && !forceNavigateBack) {
    // TODO: Check if we want this to happen
    dispatch(setCurrentEmail(staticNextID))
    dispatch(push(`/mail/${labelURL(labelIds)}/${staticNextID}/messages`))
  } else {
    dispatch(navigateBack())
  }
}

export const navigatePreviousMail = (): AppThunk => (dispatch, getState) => {
  const { emailList, activeEmailListIndex, searchList } = getState().email
  const { coreStatus, viewIndex } = getState().emailDetail
  const { labelIds } = getState().labels

  dispatch(setViewIndex(viewIndex - 1))

  const prevID =
    coreStatus !== global.CORE_STATUS_MAP.searching
      ? emailList[activeEmailListIndex]?.threads[viewIndex - 1]?.id
      : searchList?.threads[viewIndex - 1]?.id
  if (prevID) {
    // TODO: Check if we want this to happen
    // dispatch(setCurrentEmail(prevID))
    dispatch(push(`/mail/${labelURL(labelIds)}/${prevID}/messages`))
  } else {
    dispatch(navigateBack())
  }
}

export const archiveAllEmailCMDK = (): AppThunk => (dispatch, getState) => {
  const { labelIds } = getState().labels

  const request = {
    removeLabelIds: [
      ...labelIds.filter((item) => item !== global.UNREAD_LABEL),
    ],
  }

  dispatch(updateEmailLabelBatch({ request }))
  dispatch(setSelectedEmails([]))
}

export const deleteAllEmailCMDK = (): AppThunk => (dispatch) => {
  dispatch(
    updateEmailLabelBatch({
      request: { delete: true },
    })
  )
  dispatch(setSelectedEmails([]))
}

export const discardAllEmailCMDK = (): AppThunk => (dispatch) => {
  dispatch(deleteDraftBatch())
}

export const startFocusModeCMDK = (): AppThunk => (dispatch, getState) => {
  const { activeEmailListIndex, emailList, selectedEmails } = getState().email
  const { labelIds } = getState().labels

  activateTodo({
    activeEmailListIndex,
    dispatch,
    emailList,
    labelIds,
    selectedEmails,
  })
}

export const selectAllEmailsSender = (callback?: () => AppThunk): AppThunk => (
  dispatch,
  getState
) => {
  const { emailList, selectedEmails } = getState().email
  const { labelIds } = getState().labels

  const currentEmailSender = getSenderFromList({ selectedEmails, emailList })
  const emailsFromSameSender = emailList[
    emailList.findIndex((list) => multipleIncludes(list.labels, labelIds))
  ]?.threads.filter((email) => {
    const lastMessageFromThread = email.messages[email.messages.length - 1]
    if (lastMessageFromThread) {
      return currentEmailSender.includes(
        lastMessageFromThread.payload.headers.from
      )
    }
    return undefined
  })
  if (emailsFromSameSender) {
    dispatch(
      setSelectedEmails(
        emailsFromSameSender.map((thread) => ({
          id: thread.id,
          event: 'add',
          labelIds,
        }))
      )
    )
    if (emailsFromSameSender.length > 0 && callback) {
      dispatch(callback())
    }
  }
}

export const selectAllEmailsCurrentInbox = (
  callback?: () => AppThunk
): AppThunk => (dispatch, getState) => {
  const { activeEmailListIndex, emailList } = getState().email
  const { labelIds } = getState().labels

  const emailsFromCurrentInbox = emailList[activeEmailListIndex]?.threads
  if (emailsFromCurrentInbox) {
    dispatch(
      setSelectedEmails(
        emailsFromCurrentInbox.map((thread) => ({
          id: thread.id,
          event: 'add',
          labelIds,
        }))
      )
    )
    if (emailsFromCurrentInbox.length > 0 && callback) {
      dispatch(callback())
    }
  }
}

export const selectActiveModal = (state: RootState) => state.utils.activeModal
export const selectAlternateActions = (state: RootState) =>
  state.utils.alternateActions
export const selectEmailListSize = (state: RootState) =>
  state.utils.emailFetchSize
export const selectInSearch = (state: RootState) => state.utils.inSearch
export const selectIsAvatarVisible = (state: RootState) =>
  state.utils.isAvatarVisible
export const selectIsFlexibleFlowActive = (state: RootState) =>
  state.utils.isFlexibleFlowActive
export const selectIsLoading = (state: RootState) => state.utils.isLoading
export const selectIsProcessing = (state: RootState) => state.utils.isProcessing
export const selectIsSentryActive = (state: RootState) =>
  state.utils.isSentryActive
export const selectIsSending = (state: RootState) => state.utils.isSending
export const selectIsSilentLoading = (state: RootState) =>
  state.utils.isSilentLoading
export const selectSystemStatusUpdate = (state: RootState) =>
  state.utils.systemStatusUpdate
export const selectSettingsLabelId = (state: RootState) =>
  state.utils.settingsLabelId

export default utilsSlice.reducer
