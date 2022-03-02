/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { push } from 'redux-first-history'
import isEmpty from 'lodash/isEmpty'
import messageApi from '../data/messageApi'
import { setServiceUnavailable } from './utilsSlice'
import { setCurrentEmail } from './emailDetailSlice'
import draftApi from '../data/draftApi'
import CloseMail from '../utils/closeEmail'
import type { AppThunk, RootState } from './store'
import { ComposePayload, ComposeState } from './composeTypes'
import { listRemoveItemDetail } from './emailListSlice'
import getEmailListIndex from '../utils/getEmailListIndex'

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
        return
      }
      dispatch(updateComposeEmail(props))
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Error updating compose email.'))
    }
  }

export const SendComposedEmail = (): AppThunk => async (dispatch, getState) => {
  try {
    const { composeEmail } = getState().compose
    const sender = getState().base.profile.emailAddress
    const {
      id,
      message: { threadId },
    } = getState().drafts.draftDetails
    const { emailList } = getState().email
    const { labelIds } = getState().labels
    const { storageLabels } = getState().labels
    const completeEmail = { ...composeEmail, sender }

    if (Object.keys(completeEmail).length >= 4) {
      if (id) {
        const body = { id }
        const response = await draftApi().sendDraft(body)
        if (response && response.status === 200) {
          CloseMail({ dispatch, labelIds, storageLabels })
          dispatch(resetComposeEmail())
          dispatch(setCurrentEmail(''))
          const staticIndexActiveEmailList: number = getEmailListIndex({
            emailList,
            labelIds: ['DRAFT'],
          })
          if (staticIndexActiveEmailList > -1)
            dispatch(
              listRemoveItemDetail({
                messageId: threadId,
                staticIndexActiveEmailList,
              })
            )
        } else {
          dispatch(setServiceUnavailable('Error sending email.'))
        }
      }
      if (id === undefined) {
        const response = await messageApi().sendMessage(completeEmail)
        if (response && response.status === 200) {
          dispatch(push(`/`))
          dispatch(resetComposeEmail())
          dispatch(setCurrentEmail(''))
        } else {
          dispatch(setServiceUnavailable('Error sending email.'))
        }
      }
    }
  } catch (err) {
    console.error(err)
    dispatch(setServiceUnavailable('Error sending email.'))
  }
  return null
}

export const selectComposeEmail = (state: RootState) =>
  state.compose.composeEmail

export default composeSlice.reducer
