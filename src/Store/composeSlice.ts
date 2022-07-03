/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { push } from 'redux-first-history'
import isEmpty from 'lodash/isEmpty'
import messageApi from '../data/messageApi'
import { closeMail, setServiceUnavailable } from './utilsSlice'
import { setCurrentEmail } from './emailDetailSlice'
import draftApi from '../data/draftApi'
import type { AppThunk, RootState } from './store'
import { ComposePayload, ComposeState } from './storeTypes/composeTypes'
import { listRemoveItemDetail } from './emailListSlice'
import getEmailListIndex from '../utils/getEmailListIndex'
import { resetDraftDetails } from './draftsSlice'
import archiveMail from '../components/EmailOptions/ArchiveMail'
import * as global from '../constants/globalConstants'

const initialState: ComposeState = Object.freeze({
  composeEmail: {},
})

export const composeSlice = createSlice({
  name: 'compose',
  initialState,
  reducers: {
    // setComposeEmail: (state, action: PayloadAction<ComposePayload>) => {
    //   if (action.payload.id && action.payload.value) {
    //     const currentState: any = state.composeEmail
    //     currentState[action.payload.id] = action.payload.value
    //     state.composeEmail = currentState
    //   }
    //   if (!action.payload.id && !action.payload.value) {
    //     state.composeEmail = action.payload
    //   }
    // },
    // updateComposeEmail: (state, action) => {
    //   if (action.payload.id && action.payload.value) {
    //     const currentState: any = state.composeEmail
    //     currentState[action.payload.id] = action.payload.value
    //     state.composeEmail = currentState
    //   }
    // },
    // resetComposeEmail: (state) => {
    //   state.composeEmail = {}
    // },
  },
})

// export const { setComposeEmail, updateComposeEmail, resetComposeEmail } =
//   composeSlice.actions

export const cleanUpComposerAndDraft = (): AppThunk => (dispatch) => {
  // dispatch(resetComposeEmail())
  dispatch(resetDraftDetails())
}

// export const trackComposeEmail =
//   (props: ComposePayload): AppThunk =>
//   async (dispatch, getState) => {
//     const composedEmail = getState().compose.composeEmail
//     try {
//       if (isEmpty(composedEmail)) {
//         dispatch(setComposeEmail(props))
//         return
//       }
//       dispatch(updateComposeEmail(props))
//     } catch (err) {
//       dispatch(setServiceUnavailable('Error updating compose email.'))
//     }
//   }

export const sendComposedEmail =
  ({ composedEmail }: any): AppThunk =>
  async (dispatch, getState) => {
    console.log(composedEmail)
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
          archiveMail({ messageId: threadId, dispatch, labelIds })
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

// export const selectComposeEmail = (state: RootState) =>
//   state.compose.composeEmail

export default composeSlice.reducer
