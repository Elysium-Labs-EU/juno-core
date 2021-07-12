/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit'
import base64url from 'base64url'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import { FilteredEmailList } from '../utils'
import draftApi from '../data/draftApi'
import { setServiceUnavailable } from './utilsSlice'
import { setComposeEmail } from './composeSlice'
import { setCurrentEmail } from './emailDetailSlice'

const api = draftApi()

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState: {
    draftList: [],
    draftDetails: {},
  },
  reducers: {
    listAddDraft: (state, action) => {
      console.log('here123@@')
      if (Array.isArray(action.payload)) {
        state.draftList = action.payload
      }
    },
    listRemoveDraft: (state, action) => {},
    listUpdateDraft: (state, action) => {
      console.log(action.payload)
      state.draftDetails = action.payload
    },
  },
})

export const { listAddDraft, listUpdateDraft, listRemoveDraft } =
  draftsSlice.actions

export const loadDraftList = () => {
  return async (dispatch) => {
    try {
      const draftList = await api.getDrafts()
      if (draftList.message.resultSizeEstimate > 0) {
        dispatch(listAddDraft(draftList.message.drafts))
      } else {
        return null
      }
      return null
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error getting Draft list.'))
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
      console.log(err)
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
      console.log(err)
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
      console.log(message)
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
      if (draft.id) {
        dispatch(setCurrentEmail(draft.id))
        history.push(`/compose/${draft.id}`)
      } else {
        history.push(`/compose/`)
      }
      dispatch(setComposeEmail(loadEmail))
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

const loadDraftDetails = (draftDetails) => {
  const { draftId, history } = draftDetails
  return async (dispatch) => {
    try {
      axios
        .get(`/api/draft/${draftId[0].id}`)
        .then((response) => {
          if (response.status === 200) {
            const { draft } = response.data
            const enhancedDraftDetails = { history, draft }
            pushDraftDetails(enhancedDraftDetails)
          }
        })
        .catch((err) => console.log(err))
        .then(
          dispatch(setServiceUnavailable('Error setting up compose email.'))
        )
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

export const OpenDraftEmail = (props) => {
  const { history, id, DRAFT_LABEL, messageId } = props
  // console.log(typeof selectIndex, selectIndex)
  return async (dispatch, getState) => {
    try {
      if (isEmpty(getState().drafts.draftList)) {
        axios
          .get('/api/drafts/')
          .then((res) => {
            if (res.status === 200) {
              console.log(res)
              if (res.data.message.resultSizeEstimate > 0) {
                const {
                  data: {
                    message: { drafts },
                  },
                } = res
                const draftId = drafts.filter(
                  (draft) => draft.message.id === messageId
                )
                console.log(draftId)
                if (!isEmpty(draftId)) {
                  dispatch(loadDraftDetails({ draftId, history }))
                }
              } else {
                dispatch(
                  setServiceUnavailable('Error setting up compose email.')
                )
              }
            }
          })
          .catch((err) => console.log(err))
          .then(
            dispatch(setServiceUnavailable('Error setting up compose email.'))
          )
      }
      // console.log(response)
      const { emailList } = getState().email
      const { draftList } = getState().drafts
      const draftBox = FilteredEmailList({ emailList, labelIds: DRAFT_LABEL })

      console.log('id', id)
      console.log('messageid', messageId)
      const selectedEmail =
        draftBox && draftBox[0].threads.filter((item) => item.id === id)
      const selectIndex = messageId
        ? draftList.findIndex((element) => element.message.id === messageId)
        : 0

      console.log(draftList[selectIndex].id)
      console.log('selectIndex', selectIndex)
      const filteredDraftEmail =
        selectedEmail &&
        selectedEmail[0].messages.filter((item) => item.id === messageId)

      // TODO: make selectedEmail into a variable selector, the user can select any message and continue from there.
      console.log(filteredDraftEmail[0].payload)
      console.log(filteredDraftEmail)
      // const enhancedDraftDetails = {
      //   draft: filteredDraftEmail[0],
      // }
      // dispatch(pushDraftDetails())
      const loadEmail = {
        to: filteredDraftEmail[0].payload.headers.find((e) => e.name === 'To')
          ? filteredDraftEmail[0].payload.headers.find((e) => e.name === 'To')
              .value
          : '',
        subject: filteredDraftEmail[0].payload.headers.find(
          (e) => e.name === 'Subject'
        )
          ? filteredDraftEmail[0].payload.headers.find(
              (e) => e.name === 'Subject'
            ).value
          : '',
        body:
          filteredDraftEmail[0].payload.body.size > 0
            ? base64url
                .decode(filteredDraftEmail[0].payload.body.data)
                .replace(/<[^>]*>/g, '') ?? ''
            : base64url
                .decode(filteredDraftEmail[0].payload.parts[0].body.data)
                .replace(/<[^>]*>/g, '') ?? '',
      }
      console.log(loadEmail)
      if (draftList[selectIndex].id) {
        dispatch(setCurrentEmail(draftList[selectIndex].id))
        history.push(`/compose/${draftList[selectIndex].id}`)
      } else {
        history.push(`/compose/`)
      }
      dispatch(setComposeEmail(loadEmail))
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error setting up compose email.'))
    }
  }
}

export const selectDraft = (state) => state.drafts.draftList
export const selectDraftDetails = (state) => state.drafts.draftDetails

export default draftsSlice.reducer
