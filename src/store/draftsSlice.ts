/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'
import { push } from 'redux-first-history'
import draftApi from '../data/draftApi'
import { closeMail, setServiceUnavailable } from './utilsSlice'
// import { setComposeEmail } from './composeSlice'
import { setCurrentEmail, setIsReplying } from './emailDetailSlice'
import type { AppThunk, RootState } from './store'
import {
  DraftDetails,
  DraftsState,
  ComposedEmail,
  EnhancedDraftDetails,
  OpenDraftEmailType,
  DraftListObject,
} from './storeTypes/draftsTypes'
import { loopThroughBodyParts } from '../utils/bodyDecoder/bodyDecoder'
import findPayloadHeadersData from '../utils/findPayloadHeadersData'
import convertToGmailEmail from '../utils/convertToGmailEmail'
import {
  listRemoveItemDetail,
  listRemoveItemDetailBatch,
  setSelectedEmails,
} from './emailListSlice'
import * as global from '../constants/globalConstants'
import archiveMail from '../components/EmailOptions/ArchiveMail'
import messageApi from '../data/messageApi'
import getEmailListIndex from '../utils/getEmailListIndex'

export const fetchDrafts = createAsyncThunk(
  'drafts/fetchDrafts',
  async (obj, { signal }) => {
    const response = await draftApi(signal).getDrafts()
    return response
  }
)

const initialState: DraftsState = Object.freeze({
  draftList: [],
  draftDetails: {},
})

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    listRemoveDraftThread: (state, { payload }: PayloadAction<any>) => {
      const { threadId }: { threadId: string } = payload
      const copyCurrentDraftList = state.draftList
      const newDraftList: DraftListObject[] = copyCurrentDraftList.filter(
        (item) => item.message.threadId !== threadId
      )
      state.draftList = newDraftList
    },
    listRemoveDraftMessage: (state, { payload }: PayloadAction<any>) => {
      const { messageId }: { messageId: string } = payload
      const copyCurrentDraftList = state.draftList
      const newDraftList: DraftListObject[] = copyCurrentDraftList.filter(
        (item) => item.message.id !== messageId
      )
      state.draftList = newDraftList
    },
    listRemoveDraftBatch: (state, { payload }: PayloadAction<any>) => {
      const { threadIds }: { threadIds: string[] } = payload
      const copyCurrentDraftList = state.draftList

      const filterArray = () => {
        const filtered = copyCurrentDraftList.filter(
          (el) => threadIds.indexOf(el.message.threadId) === -1
        )
        return filtered
      }
      state.draftList = filterArray()
    },
    listUpdateDraft: (state, { payload }: PayloadAction<any>) => {
      state.draftDetails = payload
    },
    resetDraftDetails: (state) => {
      state.draftDetails = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrafts.fulfilled, (state, { payload }) => {
      state.draftList = payload.drafts
    })
  },
})

export const {
  listUpdateDraft,
  listRemoveDraftThread,
  listRemoveDraftMessage,
  listRemoveDraftBatch,
  resetDraftDetails,
} = draftsSlice.actions

export const createUpdateDraft =
  ({ composedEmail }: any): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { id, message } = getState().drafts.draftDetails
      const { currEmail } = getState().emailDetail

      const baseComposedEmail: ComposedEmail = {
        draftId: id,
        threadId: currEmail,
        messageId: message?.id,
        labelIds: message?.labelIds,
        to: composedEmail?.to ? convertToGmailEmail(composedEmail.to) : '',
        cc: composedEmail?.cc ? convertToGmailEmail(composedEmail.cc) : '',
        bcc: composedEmail?.bcc ? convertToGmailEmail(composedEmail.bcc) : '',
        subject: composedEmail?.subject ?? '',
        body: composedEmail?.body ?? '',
      }

      const response = isEmpty(getState().drafts.draftDetails)
        ? await draftApi().createDrafts(baseComposedEmail)
        : await draftApi().updateDrafts(baseComposedEmail)

      if (response && response.status === 200) {
        const {
          data: { data },
        } = response
        dispatch(listUpdateDraft(data))
      } else {
        dispatch(setServiceUnavailable('Cannot create or update draft.'))
      }
    } catch (err) {
      dispatch(setServiceUnavailable('Cannot create or update draft.'))
    }
  }

const pushDraftDetails = (props: EnhancedDraftDetails): AppThunk => {
  const {
    draft,
    draft: { message },
  } = props
  return async (dispatch, getState) => {
    const { signal } = new AbortController()
    try {
      // console.log(message.payload, signal)
      const decodedBody = await loopThroughBodyParts({
        inputObject: message.payload,
        signal,
      })
      // console.log(decodedBody)
      const body = Array.isArray(decodedBody) ? decodedBody[0] : null
      const subject = findPayloadHeadersData('Subject', message)
      const to = findPayloadHeadersData('To', message)
      const cc = findPayloadHeadersData('Cc', message)
      const bcc = findPayloadHeadersData('Bcc', message)
      const loadEmail = {
        to,
        cc,
        bcc,
        subject,
        body,
      }
      const draftDetails = {
        id: draft?.id,
        message: {
          id: message?.id,
          threadId: message?.threadId,
        },
      }
      if (draft.id && message.threadId) {
        dispatch(listUpdateDraft(draftDetails))
        dispatch(setCurrentEmail(message.threadId))
        if (!getState().labels.labelIds.includes(global.DRAFT_LABEL)) {
          dispatch(setIsReplying(true))
        } else {
          dispatch(push(`/compose/${draft.id}`, loadEmail))
        }
      } else {
        dispatch(push(`/compose/`))
      }
    } catch (err) {
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

const loadDraftDetails = (draftDetails: DraftDetails): AppThunk => {
  const { draftId } = draftDetails
  return async (dispatch) => {
    try {
      const response = await draftApi().getDraftDetail(draftId)
      if (response?.status && response.status === 200) {
        dispatch(pushDraftDetails({ draft: response.data }))
      }
    } catch (err) {
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

const ERROR_OPEN_DRAFT_EMAIL = 'Error setting up compose email.'
export const openDraftEmail =
  ({ messageId, id }: OpenDraftEmailType): AppThunk =>
  async (dispatch, getState) => {
    try {
      // If Draft list is empty, fetch it first.
      if (isEmpty(getState().drafts.draftList)) {
        const { payload } = await dispatch(fetchDrafts())
        if (payload?.drafts && payload.drafts.length > 0) {
          const { drafts } = payload
          dispatch(listUpdateDraft(drafts))
          const draftIdFilter = drafts.filter(
            (draft: any) => draft.message.id === messageId
          )
          const draftId = draftIdFilter[0].id
          if (!isEmpty(draftId)) {
            dispatch(loadDraftDetails({ draftId }))
          } else {
            dispatch(setServiceUnavailable(ERROR_OPEN_DRAFT_EMAIL))
          }
        } else {
          dispatch(setServiceUnavailable(ERROR_OPEN_DRAFT_EMAIL))
        }
      } else {
        const { draftList } = getState().drafts

        // Search the draftList on message.threadId to get the id. Use that Id to fetch all the details of the draft.
        const selectedEmail =
          draftList && messageId
            ? draftList.filter((draft) => draft.message.id === messageId)
            : draftList.filter((draft) => draft.message.threadId === id)

        if (selectedEmail.length > 0) {
          const draftId = selectedEmail[0].id
          if (!isEmpty(draftId)) {
            dispatch(loadDraftDetails({ draftId }))
          } else {
            dispatch(setServiceUnavailable(ERROR_OPEN_DRAFT_EMAIL))
          }
        }
      }
    } catch (err) {
      dispatch(setServiceUnavailable(ERROR_OPEN_DRAFT_EMAIL))
    }
  }

export const deleteDraftBatch = (): AppThunk => async (dispatch, getState) => {
  const { selectedEmails } = getState().email
  const { draftList } = getState().drafts
  dispatch(
    listRemoveItemDetailBatch({
      messageIds: selectedEmails,
    })
  )
  dispatch(setSelectedEmails([]))
  dispatch(listRemoveDraftBatch({ threadIds: selectedEmails }))
  for (let i = 0; selectedEmails.length > i; i += 1) {
    try {
      const draftObject =
        draftList.length > 0 &&
        draftList.find((draft) => draft.message.threadId === selectedEmails[i])
      if (
        typeof draftObject === 'object' &&
        !Array.isArray(draftObject) &&
        draftObject !== null
      ) {
        draftApi().deleteDraft(draftObject.id)
      }
    } catch (err) {
      dispatch(setServiceUnavailable('Error deleting draft.'))
    }
  }
}

export const deleteDraft =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      draftApi().deleteDraft(id)
    } catch (err) {
      dispatch(setServiceUnavailable('Error deleting draft.'))
    }
  }

export const sendComposedEmail =
  ({ composedEmail }: any): AppThunk =>
  async (dispatch, getState) => {
    try {
      const sender = getState().base.profile.emailAddress
      const {
        id,
        message: { threadId },
      } = getState().drafts.draftDetails
      const { emailList } = getState().email
      const completeEmail = { ...composedEmail, sender }
      if (id) {
        const body = { id }
        const response = await draftApi().sendDraft(body)
        if (response?.status === 200) {
          const { labelIds } = getState().labels
          dispatch(setCurrentEmail(''))
          dispatch(resetDraftDetails())
          archiveMail({ threadId, dispatch, labelIds })
          const staticIndexActiveEmailList: number = getEmailListIndex({
            emailList,
            labelIds: [global.DRAFT_LABEL],
          })
          if (staticIndexActiveEmailList > -1)
            dispatch(
              listRemoveItemDetail({
                messageId: threadId,
                staticIndexActiveEmailList,
              })
            )
          dispatch(closeMail())
        } else {
          dispatch(setServiceUnavailable('Error sending email.'))
        }
      }
      if (id === undefined) {
        const response = await messageApi().sendMessage(completeEmail)
        if (response?.status === 200) {
          dispatch(setCurrentEmail(''))
          dispatch(push(`/`))
        } else {
          dispatch(setServiceUnavailable('Error sending email.'))
        }
      }
    } catch (err) {
      dispatch(setServiceUnavailable('Error sending email.'))
    }
    return null
  }

export const selectDraft = (state: RootState) => state.drafts.draftList
export const selectDraftDetails = (state: RootState) =>
  state.drafts.draftDetails

export default draftsSlice.reducer
