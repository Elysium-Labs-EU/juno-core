import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { goBack, push } from 'redux-first-history'

import CustomToast from 'components/Elements/Toast/Toast'
import * as global from 'constants/globalConstants'
import { getRouteByLabelMap } from 'constants/labelMapConstant'
import RouteConstants from 'constants/routesConstants'
import {
  setCoreStatus,
  setCurrentEmail,
  setSessionViewIndex,
  setViewIndex,
} from 'store/emailDetailSlice'
import {
  fetchEmailsSimple,
  setSelectedEmails,
} from 'store/emailListSlice'
import type { AppThunk, RootState } from 'store/store'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import type { UtilsState } from 'store/storeTypes/utilsTypes'
import labelURL from 'utils/createLabelURL'
import { findLabelById } from 'utils/findLabel'
import { onlyLegalLabelStrings } from 'utils/onlyLegalLabels'
import reduxKeyPresentInObject from 'utils/reduxKeyPresentInObject'

/* eslint-disable no-param-reassign */

const initialState: UtilsState = Object.freeze({
  activeModal: null,
  alternateActions: true,
  emailFetchSize: 20,
  inSearch: false,
  isAvatarVisible: true,
  isFlexibleFlowActive: false,
  isLoading: false,
  isProcessing: false,
  isSentryActive: true,
  isSilentLoading: false,
  settingsLabel: null,
  systemStatusUpdate: null,
})

const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setActiveModal(
      state,
      { payload }: PayloadAction<UtilsState['activeModal']>
    ) {
      state.activeModal = payload
    },
    setAlternateActions: (
      state,
      { payload }: PayloadAction<UtilsState['alternateActions']>
    ) => {
      state.alternateActions = payload
    },
    setEmailFetchSize(
      state,
      { payload }: PayloadAction<UtilsState['emailFetchSize']>
    ) {
      state.emailFetchSize = payload
    },
    setFlexibleFlow: (
      state,
      { payload }: PayloadAction<UtilsState['isFlexibleFlowActive']>
    ) => {
      state.isFlexibleFlowActive = payload
    },
    setInSearch: (
      state,
      { payload }: PayloadAction<UtilsState['inSearch']>
    ) => {
      state.inSearch = payload
    },
    setIsLoading: (
      state,
      { payload }: PayloadAction<UtilsState['isLoading']>
    ) => {
      state.isLoading = payload
    },
    setIsProcessing: (
      state,
      { payload }: PayloadAction<UtilsState['isProcessing']>
    ) => {
      state.isProcessing = payload
    },
    setIsSentryActive: (
      state,
      { payload }: PayloadAction<UtilsState['isSentryActive']>
    ) => {
      state.isSentryActive = payload
    },
    setIsSilentLoading: (
      state,
      { payload }: PayloadAction<UtilsState['isSilentLoading']>
    ) => {
      state.isSilentLoading = payload
    },
    setSettings: (
      state,
      { payload }: PayloadAction<Record<string, string | boolean | number>>
    ) => {
      state.activeModal = payload.showIntroduction
        ? global.ACTIVE_MODAL_MAP.intro
        : null

      Object.keys(payload).forEach((key) => {
        const typedKey = key as keyof typeof state
        reduxKeyPresentInObject({
          key: typedKey,
          payload,
          state,
        })
      })
    },
    setSettingsLabel(
      state,
      { payload }: PayloadAction<UtilsState['settingsLabel']>
    ) {
      state.settingsLabel = payload
    },
    setShowAvatar: (
      state,
      { payload }: PayloadAction<UtilsState['isAvatarVisible']>
    ) => {
      state.isAvatarVisible = payload
    },
  },
  extraReducers: (builder) => {
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
        toast.custom((t) => (
          <CustomToast
            specificToast={t}
            title={`Emails - ${global.SOMETHING_WRONG}`}
            variant="error"
          />
        ))
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
  setIsSentryActive,
  setIsSilentLoading,
  setSettings,
  setSettingsLabel,
  setShowAvatar,
} = utilsSlice.actions

export const closeMail = (): AppThunk => (dispatch, getState) => {
  const { labelIds, storageLabels } = getState().labels
  const foundLabel = findLabelById({ storageLabels, labelIds })
  if (foundLabel?.name) {
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

export const openEmail =
  ({
    email,
    id,
  }: {
    email?: TThreadObject
    id: string
  }): AppThunk =>
  (dispatch, getState) => {
    const { labelIds, storageLabels } = getState().labels

    const onlyLegalLabels = onlyLegalLabelStrings({ labelIds, storageLabels })

    // We are sending the state here to override a possible closing of the composer on email detail load.
    dispatch(setCurrentEmail(id))
    dispatch(
      push(
        `/mail/${labelURL(onlyLegalLabels)}/${id}/messages`,
      )
    )
  }

/**
 * A wrapper function that navigates to the specified destination.
 * @function navigateTo
 * @param {string} destination - The destination to navigate to.
 * @returns {AppThunk} - A thunk function that dispatches push action with the destination.
 */

export const navigateTo =
  (destination: string): AppThunk =>
  (dispatch) => {
    dispatch(push(destination))
  }

export const navigateBack = (): AppThunk => (dispatch, getState) => {
  const { coreStatus } = getState().emailDetail
  const { location } = getState().router
  if (location?.state === global.BACK_TO_EMAIL) {
    dispatch(goBack())
    return
  }
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

export const navigateNextMail =
  (blockViewIndexUpdate?: boolean, forceNavigateBack?: boolean): AppThunk =>
  (dispatch, getState) => {
    const { emailList, activeEmailListIndex, searchList, selectedEmails } =
      getState().email
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
        return emailList?.[activeEmailListIndex]?.threads[viewIndex + 1]?.id
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
      ? emailList?.[activeEmailListIndex]?.threads[viewIndex - 1]?.id
      : searchList?.threads[viewIndex - 1]?.id
  if (prevID) {
    // TODO: Check if we want this to happen
    // dispatch(setCurrentEmail(prevID))
    dispatch(push(`/mail/${labelURL(labelIds)}/${prevID}/messages`))
  } else {
    dispatch(navigateBack())
  }
}

export const selectAllEmailsCurrentInbox =
  (callback?: () => AppThunk): AppThunk =>
  (dispatch, getState) => {
    const { activeEmailListIndex, emailList } = getState().email
    const { labelIds } = getState().labels

    const emailsFromCurrentInbox = emailList?.[activeEmailListIndex]?.threads
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
export const selectIsSentryActive = (state: RootState) =>
  state.utils.isSentryActive
export const selectIsSilentLoading = (state: RootState) =>
  state.utils.isSilentLoading

export default utilsSlice.reducer
