/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'
import { push } from 'redux-first-history'
import draftApi from '../data/draftApi'
import { setServiceUnavailable } from './utilsSlice'
import { setComposeEmail } from './composeSlice'
import { setCurrentEmail } from './emailDetailSlice'
import type { AppThunk, RootState } from './store'
import {
  DraftDetails,
  DraftsState,
  ComposedEmail,
  EnhancedDraftDetails,
  OpenDraftEmailType,
  DraftListObject,
} from './draftsTypes'
import bodyDecoder from '../utils/bodyDecoder'
import findPayloadHeadersData from '../utils/findPayloadHeadersData'
import convertToGmailEmail from '../utils/convertToGmailEmail'

const initialState: DraftsState = Object.freeze({
  draftListLoaded: false,
  draftList: [],
  draftDetails: {},
})

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    listAddDraft: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.draftList = action.payload
      }
    },
    listRemoveDraft: (state, action) => {
      const { threadId } = action.payload
      const copyCurrentDraftList = state.draftList
      if (!Array.isArray(threadId)) {
        const newDraftList: DraftListObject[] = copyCurrentDraftList.filter(
          (item) => item.message.threadId !== threadId
        )
        state.draftList = newDraftList
      }
    },
    listUpdateDraft: (state, action) => {
      state.draftDetails = action.payload
    },
    setDraftListLoaded: (state, action) => {
      state.draftListLoaded = action.payload
    },
    resetDraftDetails: (state) => {
      state.draftDetails = {}
    },
  },
})

export const {
  listAddDraft,
  listUpdateDraft,
  listRemoveDraft,
  setDraftListLoaded,
  resetDraftDetails,
} = draftsSlice.actions

export const loadDraftList = (): AppThunk => async (dispatch) => {
  try {
    const draftList = await draftApi().getDrafts()
    if (draftList.resultSizeEstimate > 0) {
      dispatch(listAddDraft(draftList.drafts))
    }
  } catch (err) {
    console.error(err)
    dispatch(setServiceUnavailable('Error getting Draft list.'))
  } finally {
    dispatch(setDraftListLoaded(true))
  }
}

export const createUpdateDraft = (): AppThunk => async (dispatch, getState) => {
  try {
    const { composeEmail }: any = getState().compose
    const { id, message } = getState().drafts.draftDetails
    const { currEmail } = getState().emailDetail

    const baseComposedEmail: ComposedEmail = {
      draftId: id,
      threadId: currEmail,
      messageId: message?.id,
      labelIds: message?.labelIds,
      to: composeEmail.to ? convertToGmailEmail(composeEmail.to) : '',
      cc: composeEmail.cc ? convertToGmailEmail(composeEmail.cc) : '',
      bcc: composeEmail.bcc ? convertToGmailEmail(composeEmail.bcc) : '',
      subject: composeEmail.subject ?? '',
      body: composeEmail.body ?? '',
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
    console.error(err)
    dispatch(setServiceUnavailable('Cannot create or update draft.'))
  }
}

const pushDraftDetails = (props: EnhancedDraftDetails): AppThunk => {
  const {
    draft,
    draft: { message },
  } = props
  return (dispatch) => {
    try {
      const body = bodyDecoder(message.payload).map((item) =>
        item.replace(/<[^>]*>/g, '')
      )[0]
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
        sizeEstimate: message.sizeEstimate,
      }
      console.log(message)
      const draftDetails = {
        id: draft.id,
        message: {
          id: message.id,
          threadId: message.threadId,
          sizeEstimate: message.sizeEstimate,
        },
      }
      if (draft.id && message.threadId) {
        dispatch(listUpdateDraft(draftDetails))
        dispatch(setComposeEmail(loadEmail))
        dispatch(setCurrentEmail(message.threadId))
        dispatch(push(`/compose/${draft.id}`))
      } else {
        dispatch(push(`/compose/`))
      }
    } catch (err) {
      console.error(err)
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
      console.error(err)
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

export const openDraftEmail = (props: OpenDraftEmailType): AppThunk => {
  const { messageId, id } = props
  return async (dispatch, getState) => {
    try {
      // If Draft list is empty, fetch it first.
      if (isEmpty(getState().drafts.draftList)) {
        const draftList = await draftApi().getDrafts()
        if (draftList.resultSizeEstimate > 0) {
          const { drafts } = draftList
          const draftIdFilter = drafts.filter(
            (draft: any) => draft.message.id === messageId
          )
          const draftId = draftIdFilter[0].id
          if (!isEmpty(draftId)) {
            dispatch(loadDraftDetails({ draftId }))
          }
        } else {
          dispatch(setServiceUnavailable('Error setting up compose email.'))
        }
      }
      const { draftList } = getState().drafts

      // Search the draftList on message.threadId to get the id. Use that Id to fetch all the details of the draft.
      const selectedEmail =
        draftList && messageId
          ? draftList.filter((draft) => draft.message.id === messageId)
          : draftList.filter((draft) => draft.message.threadId === id)

      if (selectedEmail.length > 0) {
        const draftId = selectedEmail[0].id
        dispatch(loadDraftDetails({ draftId }))
      }
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

export const deleteDraft =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await draftApi().deleteDraft(id)
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Error deleting draft.'))
    }
  }

export const selectDraft = (state: RootState) => state.drafts.draftList
export const selectDraftListLoaded = (state: RootState) =>
  state.drafts.draftListLoaded
export const selectDraftDetails = (state: RootState) =>
  state.drafts.draftDetails

export default draftsSlice.reducer
