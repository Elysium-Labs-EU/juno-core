/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'
import messageApi from '../data/messageApi'
import { setServiceUnavailable } from './utilsSlice'
import { setCurrentEmail } from './emailDetailSlice'
import draftApi from '../data/draftApi'
import CloseMail from '../utils/closeEmail'

const initialState = Object.freeze({
  composeEmail: {},
})

export const composeSlice = createSlice({
  name: 'compose',
  initialState: {
    composeEmail: {},
  },
  reducers: {
    setComposeEmail: (state, action) => {
      console.log(Object.keys(action.payload))
      if (Object.keys(action.payload).length > 1) {
        // if (
        //   JSON.stringify(Object.keys(action.payload)) ===
        //   JSON.stringify(['to', 'subject', 'body', 'id', 'threadId'])
        // ) {
        state.composeEmail = action.payload
      }
      if (action.payload.id && action.payload.value) {
        const currentState = state.composeEmail
        currentState[action.payload.id] = action.payload.value
        state.composeEmail = currentState
      }
    },
    updateComposeEmail: (state, action) => {
      if (action.payload.id && action.payload.value) {
        const currentState = state.composeEmail
        currentState[action.payload.id] = action.payload.value
        state.composeEmail = currentState
      }
    },
    resetComposeEmail: () => {
      return initialState
    },
  },
})

export const { setComposeEmail, updateComposeEmail, resetComposeEmail } =
  composeSlice.actions

export const TrackComposeEmail = (props) => {
  return async (dispatch, getState) => {
    const composedEmail = getState().compose.composeEmail
    try {
      if (isEmpty(composedEmail)) {
        dispatch(setComposeEmail(props))
      }
      if (!isEmpty(composedEmail)) {
        dispatch(updateComposeEmail(props))
      }
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error updating compose email.'))
    }
  }
}

export const SendComposedEmail = (props) => {
  const { history, messageId } = props
  return async (dispatch, getState) => {
    try {
      const { composeEmail } = getState().compose
      const sender = getState().base.profile.emailAddress
      const { labelIds } = getState().labels
      const { storageLabels } = getState().labels
      const completeEmail = { ...composeEmail, sender }

      if (Object.keys(completeEmail).length >= 4) {
        // If the messsage has a messageId, it is a draft.
        if (messageId.length > 0) {
          const { draftDetails } = getState().drafts
          const body = { completeEmail, draftDetails }
          const response = await draftApi().sendDraft(body)
          if (response && response.status === 200) {
            CloseMail({ history, labelIds, storageLabels })
            dispatch(resetComposeEmail())
            dispatch(setCurrentEmail(''))
          } else {
            dispatch(setServiceUnavailable('Error sending email.'))
          }
        } else if (messageId === undefined) {
          const response = await messageApi().sendMessage(completeEmail)
          if (response && response.status === 200) {
            history.push(`/`)
            dispatch(resetComposeEmail())
            dispatch(setCurrentEmail(''))
          } else {
            dispatch(setServiceUnavailable('Error sending email.'))
          }
        }
      }
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error sending email.'))
    }
    return null
  }
}

export const selectComposeEmail = (state) => state.compose.composeEmail

export default composeSlice.reducer
