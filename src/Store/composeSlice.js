/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'
import axios from 'axios'
import createApiClient from '../data/api'
import { setServiceUnavailable } from './utilsSlice'

const api = createApiClient()

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

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const TrackComposeEmail = (props) => {
  return async (dispatch, getState) => {
    try {
      if (isEmpty(getState().composeEmail)) {
        dispatch(setComposeEmail(props))
      }
      if (!isEmpty(getState().composeEmail)) {
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
  console.log(messageId)
  return async (dispatch, getState) => {
    try {
      const composedEmail = getState().composeEmail
      console.log(composedEmail)
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
        return axios
          .post('/api/send-message', composedEmail)
          .then((res) => {
            if (res.status === 200) {
              console.log(res)
              history.push(`/`)
              dispatch(resetComposeEmail())
              dispatch(setCurrentEmail(''))
            }
          })
          .catch((err) => console.log(err))
          .then(dispatch(setServiceUnavailable('Error sending email.')))
      }
      // return null
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error sending email.'))
    }
    return null
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectDraft = (state) => state.draftList

export default composeSlice.reducer
