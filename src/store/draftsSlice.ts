import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import isEmpty from 'lodash/isEmpty'
import { push } from 'redux-first-history'

import archiveMail from 'components/EmailOptions/ArchiveMail'
import * as global from 'constants/globalConstants'
import draftApi from 'data/draftApi'
import messageApi from 'data/messageApi'
import {
  setCurrentEmail,
  setIsForwarding,
  setIsReplying,
} from 'store/emailDetailSlice'
import {
  listRemoveItemDetail,
  listRemoveItemDetailBatch,
  listRemoveItemDetailDraft,
  setSelectedEmails,
} from 'store/emailListSlice'
import type { AppThunk, RootState } from 'store/store'
import type { IComposePayload } from 'store/storeTypes/composeTypes'
import type {
  IDraftDetails,
  IDraftsState,
  IEnhancedIDraftDetails,
  IDraftDetailObject,
  IOpenDraftEmailType,
} from 'store/storeTypes/draftsTypes'
import {
  closeMail,
  navigateNextMail,
  setIsProcessing,
  setIsSending,
  setSystemStatusUpdate,
} from 'store/utilsSlice'
import getEmailListIndex from 'utils/getEmailListIndex'
import isEmpty from 'utils/isEmpty'
import { prepareFormData } from 'utils/prepareMessage'

/* eslint-disable no-param-reassign */

export const fetchDrafts = createAsyncThunk(
  'drafts/fetchDrafts',
  async (_, { signal }) => {
    const response = await draftApi(signal).getDrafts()
    return response
  }
)

const initialState: IDraftsState = Object.freeze({
  draftList: [],
})

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    listRemoveDraftThread: (
      state,
      { payload }: PayloadAction<{ threadId: string }>
    ) => {
      const { threadId } = payload
      const copyCurrentDraftList = state.draftList
      const newDraftList: IDraftDetailObject[] = copyCurrentDraftList.filter(
        (item) => item.message.threadId !== threadId
      )
      state.draftList = newDraftList
    },
    listRemoveDraftMessage: (
      state,
      { payload }: PayloadAction<{ messageId: string }>
    ) => {
      const { messageId } = payload
      const copyCurrentDraftList = state.draftList
      const newDraftList: IDraftDetailObject[] = copyCurrentDraftList.filter(
        (item) => item.message.id !== messageId
      )
      state.draftList = newDraftList
    },
    listRemoveDraftBatch: (
      state,
      { payload }: PayloadAction<{ threadIds: Array<string> }>
    ) => {
      const { threadIds } = payload
      const copyCurrentDraftList = state.draftList

      const filterArray = () => {
        const filtered = copyCurrentDraftList.filter(
          (el) => threadIds.indexOf(el.message.threadId) === -1
        )
        return filtered
      }
      state.draftList = filterArray()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrafts.fulfilled, (state, { payload }) => {
      // Only update the state whenever there is something.
      if (payload.resultSizeEstimate > 0) {
        state.draftList = payload.drafts
      }
    })
  },
})

export const {
  listRemoveDraftThread,
  listRemoveDraftMessage,
  listRemoveDraftBatch,
} = draftsSlice.actions

export const createUpdateDraft =
  ({
    composedEmail,
    localDraftDetails,
  }: {
    composedEmail: IComposePayload
    localDraftDetails: IDraftDetailObject | undefined
  }): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { emailAddress, name } = getState().base.profile
      const formData = await prepareFormData({
        composedEmail,
        emailAddress,
        localDraftDetails,
        name,
      })

      const response = !localDraftDetails
        ? await draftApi().createDrafts(formData)
        : await draftApi().updateDrafts({ id: localDraftDetails?.id, formData })

      if (
        response &&
        response?.status === 200 &&
        localDraftDetails?.message?.threadId
      ) {
        // Remove the previous entry from Redux Emaillist. History will create a new one.
        dispatch(
          listRemoveItemDetailDraft({
            threadId: localDraftDetails.message.threadId,
          })
        )
        return response.data.data
      }
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Cannot create or update draft.',
        })
      )
      return null
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Cannot create or update draft.',
        })
      )
      return null
    }
  }

const ERROR_OPEN_DRAFT_EMAIL = 'Error setting up compose email.'
const pushDraftDetails =
  ({ draft, draft: { message } }: IEnhancedIDraftDetails): AppThunk =>
  async (dispatch, getState) => {
    try {
      if (draft?.id && message?.threadId) {
        dispatch(setCurrentEmail(message.threadId))
        if (!getState().labels.labelIds.includes(global.DRAFT_LABEL)) {
          dispatch(setIsReplying(true))
        } else {
          // From headers are not taken in account here - since we only allow for one account
          const loadEmail = {
            id: message?.id,
            threadId: message?.threadId,
            to: message?.payload?.headers?.to,
            cc: message?.payload?.headers?.cc,
            bcc: message?.payload?.headers?.bcc,
            subject: message?.payload?.headers?.subject,
            body: message?.payload?.body?.emailHTML,
            // Push the files as B64 objects to the state, to be decoded on the component. Files cannot be stored into Redux.
            files: message.payload?.files,
          }
          dispatch(push(`/compose/${draft.id}`, loadEmail))
        }
      } else {
        dispatch(push(`/compose/`))
      }
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: ERROR_OPEN_DRAFT_EMAIL,
        })
      )
    }
  }

const loadDraftDetails = (draftDetails: IDraftDetails): AppThunk => {
  const { draftId } = draftDetails
  return async (dispatch) => {
    try {
      const response = await draftApi().getDraftDetail(draftId)
      if (response?.status && response.status === 200) {
        dispatch(pushDraftDetails({ draft: response.data }))
      } else {
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: ERROR_OPEN_DRAFT_EMAIL,
          })
        )
      }
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: ERROR_OPEN_DRAFT_EMAIL,
        })
      )
    }
  }
}

export const openDraftEmail =
  ({ messageId, id }: IOpenDraftEmailType): AppThunk =>
  async (dispatch, getState) => {
    try {
      // If Draft list is empty, fetch it first.
      if (isEmpty(getState().drafts.draftList)) {
        const { payload } = await dispatch(fetchDrafts())
        if (payload?.drafts && payload.drafts.length > 0) {
          const { drafts }: { drafts: IDraftDetailObject[] } = payload
          const getDraft = drafts.find(
            (draft) => draft.message.id === messageId
          )
          if (getDraft && !isEmpty(getDraft)) {
            dispatch(loadDraftDetails({ draftId: getDraft.id }))
          } else {
            dispatch(
              setSystemStatusUpdate({
                type: 'error',
                message: ERROR_OPEN_DRAFT_EMAIL,
              })
            )
          }
        } else {
          dispatch(
            setSystemStatusUpdate({
              type: 'error',
              message: ERROR_OPEN_DRAFT_EMAIL,
            })
          )
        }
      } else {
        const { draftList } = getState().drafts

        // Search the draftList on message.threadId to get the id. Use that Id to fetch all the details of the draft.
        const selectedEmail =
          draftList && messageId
            ? draftList.find((draft) => draft.message.id === messageId)
            : draftList.find((draft) => draft.message.threadId === id)

        if (selectedEmail) {
          const draftId = selectedEmail.id
          if (!isEmpty(draftId)) {
            dispatch(loadDraftDetails({ draftId }))
          } else {
            dispatch(
              setSystemStatusUpdate({
                type: 'error',
                message: ERROR_OPEN_DRAFT_EMAIL,
              })
            )
          }
        }
      }
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: ERROR_OPEN_DRAFT_EMAIL,
        })
      )
    }
  }

export const deleteDraftBatch = (): AppThunk => async (dispatch, getState) => {
  const { selectedEmails } = getState().email
  const { draftList } = getState().drafts
  dispatch(
    listRemoveItemDetailBatch({
      messageIds: selectedEmails.selectedIds,
    })
  )
  dispatch(setSelectedEmails([]))
  dispatch(listRemoveDraftBatch({ threadIds: selectedEmails.selectedIds }))
  for (let i = 0; selectedEmails.selectedIds.length > i; i += 1) {
    try {
      const draftObject =
        draftList.length > 0 &&
        draftList.find(
          (draft) => draft?.message?.threadId === selectedEmails.selectedIds[i]
        )
      if (
        typeof draftObject === 'object' &&
        !Array.isArray(draftObject) &&
        draftObject !== null
      ) {
        draftApi().deleteDraft(draftObject.id)
      }
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Error deleting draft.',
        })
      )
    }
  }
}

export const deleteDraft =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const { coreStatus } = getState().emailDetail
    dispatch(setIsProcessing(true))
    try {
      await draftApi().deleteDraft(id)
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Error deleting draft.',
        })
      )
    } finally {
      dispatch(setIsProcessing(false))
      // When in search mode, and the discard of the draft is complete, send a notification, since the searchList is a separate state that is not updated.
      if (coreStatus === global.CORE_STATUS_MAP.searching) {
        dispatch(
          setSystemStatusUpdate({
            type: 'info',
            message: 'Draft has been deleted',
          })
        )
      }
    }
  }

export const sendComposedEmail =
  ({
    composedEmail,
    localDraftDetails,
  }: {
    composedEmail: IComposePayload
    localDraftDetails: IDraftDetailObject | undefined
  }): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { emailList } = getState().email
      const { coreStatus, isForwarding, isReplying } = getState().emailDetail
      dispatch(setIsSending({ message: 'Sending your mail...', type: 'info' }))
      // Reset the replying state to false on sending, to close the composer.
      if (isReplying) {
        dispatch(setIsReplying(false))
      }
      // Reset the forwarding state to false on sending, to close the composer.
      if (isForwarding) {
        dispatch(setIsForwarding(false))
      }
      // Reset the emailDetail state and return to the main page on sending whenever the user is not in sorting or focused mode.
      if (
        coreStatus !== global.CORE_STATUS_MAP.sorting &&
        coreStatus !== global.CORE_STATUS_MAP.focused
      ) {
        dispatch(setCurrentEmail(''))
        dispatch(closeMail())
      }

      // Send the user to the next email when it is sorting of focused
      if (
        coreStatus === global.CORE_STATUS_MAP.sorting ||
        coreStatus === global.CORE_STATUS_MAP.focused
      ) {
        dispatch(navigateNextMail())
      }
      // TODO: Set the timeout for sending on the backend.
      // If the id is found on the draft details, send the draft email via the Google servers as a draft.
      if (localDraftDetails?.id) {
        const response = await draftApi().sendDraft({
          id: localDraftDetails?.id,
          timeOut: global.MESSAGE_SEND_DELAY,
        })

        // When succesfully sending the email - the system removes the draft from the draft inbox, the draft list, and the thread's other inbox location.
        if (response?.status === 200) {
          const { labelIds } = getState().labels
          archiveMail({
            threadId: localDraftDetails?.message?.threadId,
            dispatch,
            labelIds,
          })
          const staticIndexActiveEmailList: number = getEmailListIndex({
            emailList,
            labelIds: [global.DRAFT_LABEL],
          })
          if (staticIndexActiveEmailList > -1 && localDraftDetails?.message?.id)
            dispatch(
              listRemoveItemDetail({
                threadId: localDraftDetails.message.id,
              })
            )
        } else {
          dispatch(
            setIsSending({ message: 'Error sending your mail', type: 'error' })
          )
        }
      }
      // If the id cannot be found on the draft details, send the email via the sendMessage function
      if (!localDraftDetails?.id) {
        const { emailAddress, name } = getState().base.profile
        const formData = await prepareFormData({
          composedEmail,
          emailAddress,
          localDraftDetails,
          name,
        })

        const response = await messageApi().sendMessage({
          data: formData,
          timeOut: global.MESSAGE_SEND_DELAY,
        })
        if (response?.status !== 200) {
          dispatch(
            setIsSending({ message: 'Error sending your mail', type: 'error' })
          )
        }
      }
    } catch (err) {
      console.error(err)
      dispatch(
        setIsSending({ message: 'Error sending your mail', type: 'error' })
      )
    }
  }

export const selectDraftList = (state: RootState) => state.drafts.draftList

export default draftsSlice.reducer
