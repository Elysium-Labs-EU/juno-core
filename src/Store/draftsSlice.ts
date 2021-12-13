/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import base64url from 'base64url'
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
  MessagePayload,
  OpenDraftEmailType,
} from './draftsTypes'

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
    // listRemoveDraft: (state, action) => {},
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
  // listRemoveDraft,
  setDraftListLoaded,
  resetDraftDetails,
} = draftsSlice.actions

export const loadDraftList = (): AppThunk => async (dispatch) => {
  try {
    const draftList = await draftApi().getDrafts()
    if (draftList.message.resultSizeEstimate > 0) {
      dispatch(listAddDraft(draftList.message.drafts))
    } else {
      return null
    }
    return null
  } catch (err) {
    console.error(err)
    dispatch(setServiceUnavailable('Error getting Draft list.'))
  } finally {
    dispatch(setDraftListLoaded(true))
  }
  return null
}

export const CreateDraft = (): AppThunk => async (dispatch, getState) => {
  try {
    const { composeEmail }: any = getState().compose
    const { id, message } =
      getState().drafts.draftDetails && getState().drafts.draftDetails
    const baseComposedEmail: ComposedEmail = {
      draftId: id && id,
      threadId: message?.threadId && message.threadId,
      messageId: message?.id && message.id,
      labelIds: message?.labelIds && message.labelIds,
      to: composeEmail.to ?? [],
      subject: composeEmail.subject ?? '',
      body: composeEmail.body ?? '',
    }
    const response = await draftApi().createDrafts(baseComposedEmail)
    if (response && response.status === 200) {
      const {
        data: {
          message: { data },
        },
      } = response
      dispatch(listUpdateDraft(data))
    } else {
      dispatch(setServiceUnavailable('Cannot create draft.'))
    }
  } catch (err) {
    console.error(err)
    dispatch(setServiceUnavailable('Cannot create draft.'))
  }
}

export const UpdateDraft = (): AppThunk => async (dispatch, getState) => {
  try {
    const { composeEmail } = getState().compose
    const { id, message } =
      getState().drafts.draftDetails && getState().drafts.draftDetails
    const baseComposedEmail = {
      draftId: id && id,
      threadId: message?.threadId && message.threadId,
      messageId: message?.id && message.id,
      labelIds: message?.labelIds && message.labelIds,
      to: composeEmail.to ?? [],
      subject: composeEmail.subject ?? '',
      body: composeEmail.body ?? '',
    }

    const response = await draftApi().updateDrafts(baseComposedEmail)
    if (response && response.status === 200) {
      const {
        data: {
          message: { data },
        },
      } = response
      dispatch(listUpdateDraft(data))
    } else {
      dispatch(setServiceUnavailable('Cannot update draft.'))
    }
  } catch (err) {
    console.error(err)
    dispatch(setServiceUnavailable('Cannot update draft.'))
  }
}

const pushDraftDetails = (props: EnhancedDraftDetails): AppThunk => {
  const {
    draft,
    draft: { message },
  } = props
  return (dispatch) => {
    try {
      const loadEmail = {
        to: message.payload.headers.find((e: MessagePayload) => e.name === 'To')
          ? message.payload.headers.find((e: MessagePayload) => e.name === 'To')
              .value
          : '',
        subject: message.payload.headers.find(
          (e: MessagePayload) => e.name === 'Subject'
        )
          ? message.payload.headers.find(
              (e: MessagePayload) => e.name === 'Subject'
            ).value
          : '',
        body:
          message.payload.body.size > 0
            ? base64url
                .decode(message.payload.body.data)
                .replace(/<[^>]*>/g, '') ?? ''
            : '',
      }
      const draftDetails = {
        id: draft.id && draft.id,
        message: {
          id: message.id && message.id,
          threadId: message.threadId && message.threadId,
        },
      }
      console.log('loadEmail', loadEmail)
      console.log('draftDetails', draftDetails)
      if (draft.id) {
        // Or need to push threadId?
        dispatch(listUpdateDraft(draftDetails))
        dispatch(setComposeEmail(loadEmail))
        dispatch(setCurrentEmail(draft.id))
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
      console.log('response', response)
      if (response?.status && response.status === 200) {
        console.log('here y-ellow')
        const { draft } = response.data
        const enhancedDraftDetails = { draft }
        console.log('enhancedDraftDetails', enhancedDraftDetails)
        dispatch(pushDraftDetails(draft))
      }
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

export const OpenDraftEmail = (props: OpenDraftEmailType): AppThunk => {
  const { messageId, id } = props
  return async (dispatch, getState) => {
    try {
      // If Draft list is empty, fetch it first.
      if (isEmpty(getState().drafts.draftList)) {
        const res = await draftApi().getDrafts()
        if (res.status === 200) {
          if (res.data.message.resultSizeEstimate > 0) {
            const {
              data: {
                message: { drafts },
              },
            } = res
            const draftId = drafts.filter(
              (draft: any) => draft.message.id === messageId
            )
            if (!isEmpty(draftId)) {
              dispatch(loadDraftDetails({ draftId }))
            }
          } else {
            dispatch(setServiceUnavailable('Error setting up compose email.'))
          }
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

export const selectDraft = (state: RootState) => state.drafts.draftList
export const selectDraftListLoaded = (state: RootState) =>
  state.drafts.draftListLoaded
export const selectDraftDetails = (state: RootState) =>
  state.drafts.draftDetails

export default draftsSlice.reducer
