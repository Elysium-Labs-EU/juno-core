/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'
import messageApi from '../data/messageApi'
import { setServiceUnavailable } from './utilsSlice'
import { setCurrentEmail } from './emailDetailSlice'
import draftApi from '../data/draftApi'

export const composeSlice = createSlice({
  name: 'compose',
  initialState: {
    composeEmail: {},
  },
  reducers: {
    setComposeEmail: (state, action) => {
      if (
        JSON.stringify(Object.keys(action.payload)) ===
        JSON.stringify(['to', 'subject', 'body'])
      ) {
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
    resetComposeEmail: (state) => {
      state.composeEmail = {}
    },
  },
})

export const { setComposeEmail, updateComposeEmail, resetComposeEmail } =
  composeSlice.actions

export const TrackComposeEmail = (props) => {
  return async (dispatch, getState) => {
    try {
      if (isEmpty(getState().compose.composeEmail)) {
        dispatch(setComposeEmail(props))
      }
      if (!isEmpty(getState().compose.composeEmail)) {
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
      const composedEmail = getState().compose.composeEmail
      const sender = getState().base.profile.emailAddress
      const completeEmail = { ...composedEmail, sender }
      if (Object.keys(completeEmail).length >= 4) {
        if (messageId) {
          const body = { completeEmail, messageId }
          const response = await draftApi().sendDraft(body)
          if (response.status === 200) {
            history.push(`/`)
            dispatch(resetComposeEmail())
            dispatch(setCurrentEmail(''))
            // TODO: Update the redux states' to have the email in the correct boxes
          } else {
            dispatch(setServiceUnavailable('Error sending email.'))
          }
        }
        const response = await messageApi().sendMessage(completeEmail)
        if (response.status === 200) {
          history.push(`/`)
          dispatch(resetComposeEmail())
          dispatch(setCurrentEmail(''))
        } else {
          dispatch(setServiceUnavailable('Error sending email.'))
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
