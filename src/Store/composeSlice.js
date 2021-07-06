/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'
import axios from 'axios'
import messageApi from '../data/messageApi'
import { setServiceUnavailable } from './utilsSlice'
import { setCurrentEmail } from './emailDetailSlice'

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
  const {
    // history,
    messageId,
  } = props
  return async (dispatch, getState, history) => {
    console.log(history)
    try {
      const composedEmail = getState().compose.composeEmail
      if (Object.keys(composedEmail).length >= 3) {
        if (messageId) {
          const body = { composedEmail, messageId }
          return axios
            .post('/api/send-draft', body)
            .then((res) => {
              if (res.status === 200) {
                console.log(res)
                history.push(`/`)
                dispatch(resetComposeEmail())
                dispatch(setCurrentEmail(''))
                // TODO: Update the redux states' to have the email in the correct boxes
                // const request = {
                //   removeLabelIds: [DRAFT],
                // }
                // dispatch(UpdateMailLabel({ request, messageId }))
              }
            })
            .catch((err) => console.log(err))
            .then(dispatch(setServiceUnavailable('Error sending email.')))
        }
        const sendEmail = await messageApi().sendMessage(composedEmail)
        if (sendEmail && sendEmail.status === 200) {
          history.push(`/`)
          dispatch(resetComposeEmail())
          dispatch(setCurrentEmail(''))
        } else {
          console.log(sendEmail)
          dispatch(setServiceUnavailable('Error sending email.'))
        }
        // return axios
        //   .post('/api/send-message', composedEmail)
        //   .then((res) => {
        //     if (res.status === 200) {
        //       console.log(res)
        //       history.push(`/`)
        //       dispatch(resetComposeEmail())
        //       dispatch(setCurrentEmail(''))
        //     }
        //   })
        //   .catch((err) => console.log(err))
        //   .then(dispatch(setServiceUnavailable('Error sending email.')))
      }
      // return null
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error sending email.'))
    }
    return null
  }
}

export const selectComposeEmail = (state) => state.compose.composeEmail

export default composeSlice.reducer
