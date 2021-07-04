/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import messageApi from '../data/messageApi'
import base64toBlob from '../utils/base64toBlob'
import fileSaver from '../utils/fileSaver'

export const emailDetailSlice = createSlice({
  name: 'emailDetail',
  initialState: {
    currEmail: '',
    viewIndex: 0,
    isDownloading: [],
  },
  reducers: {
    setCurrentEmail: (state, action) => {
      state.currEmail = action.payload
    },
    setViewingIndex: (state, action) => {
      const viewingIndex = action.payload.metaList
        .map(function getIndex(e) {
          return e.id
        })
        .indexOf(action.payload.currEmail)
      state.viewIndex = viewingIndex
    },
    setIsDownloading: (state, action) => {},
  },
})

export const { setCurrentEmail, setViewingIndex } = emailDetailSlice.actions

export const fetchAttachment = ({ attachmentData, messageId }) => {
  const { attachmentId } = attachmentData.body
  return async (dispatch) => {
    try {
      const fetchedAttachment = await messageApi().getAttachment(
        messageId,
        attachmentId
      )
      console.log(fetchedAttachment)
    } catch (err) {
      console.log(err)
    }
  }
}

export const downloadAttachment = ({ attachmentData, messageId }) => {
  console.log(attachmentData)
  const {
    body: { attachmentId },
    filename,
    mimeType,
  } = attachmentData
  return async (dispatch) => {
    try {
      const fetchedAttachment = await messageApi().downloadAttachment(
        messageId,
        attachmentId
      )
      const base64Data = fetchedAttachment.data.messageAttachment.data
      const test = base64toBlob({ base64Data, mimeType })
      await fileSaver(test, filename)
    } catch (err) {
      console.log(err)
    }
  }
}

export const selectCurrentEmail = (state) => state.emailDetail.currEmail
export const selectViewIndex = (state) => state.emailDetail.viewIndex

export default emailDetailSlice.reducer
