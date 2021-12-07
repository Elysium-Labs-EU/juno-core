/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { push } from 'redux-first-history'
import isEmpty from 'lodash/isEmpty'
import messageApi from '../data/messageApi'
import { setServiceUnavailable } from './utilsSlice'
import { setCurrentEmail } from './emailDetailSlice'
// import draftApi from '../data/draftApi'
// import CloseMail from '../utils/closeEmail'
import type { AppThunk, RootState } from './store'
import { ComposePayload, ComposeState, SendComposeEmail } from './composeTypes'

const initialState: ComposeState = Object.freeze({
  composeEmail: {},
})

export const composeSlice = createSlice({
  name: 'compose',
  initialState,
  reducers: {
    setComposeEmail: (state, action: PayloadAction<ComposePayload>) => {
      if (action.payload.id && action.payload.value) {
        const currentState: any = state.composeEmail
        currentState[action.payload.id] = action.payload.value
        state.composeEmail = currentState
      }
      if (!action.payload.id && !action.payload.value) {
        state.composeEmail = action.payload
      }
    },
    updateComposeEmail: (state, action) => {
      if (action.payload.id && action.payload.value) {
        const currentState: any = state.composeEmail
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

export const TrackComposeEmail =
  (props: ComposePayload): AppThunk =>
  async (dispatch, getState) => {
    const composedEmail = getState().compose.composeEmail
    try {
      if (isEmpty(composedEmail)) {
        dispatch(setComposeEmail(props))
      }
      if (!isEmpty(composedEmail)) {
        dispatch(updateComposeEmail(props))
      }
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Error updating compose email.'))
    }
  }

export const SendComposedEmail = (props: SendComposeEmail): AppThunk => {
  const { messageId } = props
  return async (dispatch, getState) => {
    try {
      const { composeEmail } = getState().compose
      const sender = getState().base.profile.emailAddress
      // const { labelIds } = getState().labels
      // const { storageLabels } = getState().labels
      const completeEmail = { ...composeEmail, sender }

      if (Object.keys(completeEmail).length >= 4) {
        // If the message has a messageId, it is a draft.
        // TODO: MessageId can also be from an inline reply, need to fix this.
        console.log(messageId)
        // if (messageId && messageId.length > 0) {
        //   const { draftDetails } = getState().drafts
        //   const body = { completeEmail, draftDetails }
        //   const response = await draftApi().sendDraft(body)
        //   if (response && response.status === 200) {
        //     CloseMail({ history, labelIds, storageLabels })
        //     dispatch(resetComposeEmail())
        //     dispatch(setCurrentEmail(''))
        //   } else {
        //     dispatch(setServiceUnavailable('Error sending email.'))
        //   }
        // } else if (messageId === undefined) {
        const response = await messageApi().sendMessage(completeEmail)
        if (response && response.status === 200) {
          dispatch(push(`/`))
          dispatch(resetComposeEmail())
          dispatch(setCurrentEmail(''))
        } else {
          dispatch(setServiceUnavailable('Error sending email.'))
        }
        // }
      }
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Error sending email.'))
    }
    return null
  }
}

export const selectComposeEmail = (state: RootState) =>
  state.compose.composeEmail

export default composeSlice.reducer
