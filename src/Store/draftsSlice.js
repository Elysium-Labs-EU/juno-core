/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit'
import base64url from 'base64url'
import isEmpty from 'lodash/isEmpty'
import draftApi from '../data/draftApi'
import { setServiceUnavailable } from './utilsSlice'
import { setComposeEmail } from './composeSlice'
import { setCurrentEmail } from './emailDetailSlice'

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState: {
    draftListLoaded: false,
    draftList: [],
    draftDetails: {},
  },
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
  },
})

export const {
  listAddDraft,
  listUpdateDraft,
  // listRemoveDraft,
  setDraftListLoaded,
} = draftsSlice.actions

export const loadDraftList = () => {
  return async (dispatch) => {
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
}

export const CreateDraft = () => {
  return async (dispatch, getState) => {
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
}

export const UpdateDraft = () => {
  return async (dispatch, getState) => {
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
}

const pushDraftDetails = (enhancedDraftDetails) => {
  const {
    draft,
    draft: { message },
    history,
  } = enhancedDraftDetails
  return (dispatch) => {
    try {
      const loadEmail = {
        to: message.payload.headers.find((e) => e.name === 'To')
          ? message.payload.headers.find((e) => e.name === 'To').value
          : '',
        subject: message.payload.headers.find((e) => e.name === 'Subject')
          ? message.payload.headers.find((e) => e.name === 'Subject').value
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
      if (draft.id) {
        // Or need to push threadId?
        dispatch(listUpdateDraft(draftDetails))
        dispatch(setComposeEmail(loadEmail))
        dispatch(setCurrentEmail(draft.id))
        history.push(`/compose/${draft.id}`)
      } else {
        history.push(`/compose/`)
      }
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

const loadDraftDetails = (draftDetails) => {
  const { draftId, history } = draftDetails
  return async (dispatch) => {
    try {
      const response = await draftApi().getDraftDetail(draftId)
      if (response.status === 200) {
        const { draft } = response.data
        const enhancedDraftDetails = { history, draft }
        dispatch(pushDraftDetails(enhancedDraftDetails))
      }
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

export const OpenDraftEmail = (props) => {
  const { history, messageId, id } = props
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
              (draft) => draft.message.id === messageId
            )
            if (!isEmpty(draftId)) {
              dispatch(loadDraftDetails({ draftId, history }))
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

      if (selectedEmail.length > 0 && history) {
        const draftId = selectedEmail[0].id
        dispatch(loadDraftDetails({ draftId, history }))
      }
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

export const selectDraft = (state) => state.drafts.draftList
export const selectDraftListLoaded = (state) => state.drafts.draftListLoaded
export const selectDraftDetails = (state) => state.drafts.draftDetails

export default draftsSlice.reducer
