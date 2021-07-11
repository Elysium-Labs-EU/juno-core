/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import messageApi from '../data/messageApi'
import base64toBlob from '../utils/base64toBlob'
import { baseBase64 } from '../utils/decodeBase64'
import fileSaver from '../utils/fileSaver'

export const emailDetailSlice = createSlice({
  name: 'emailDetail',
  initialState: {
    currEmail: '',
    viewIndex: 0,
    isReplying: false,
  },
  reducers: {
    setCurrentEmail: (state, action) => {
      state.currEmail = action.payload
    },
    setViewingIndex: (state, action) => {
      const viewingIndex = action.payload.emailList
        .map(function getIndex(e) {
          return e.id
        })
        .indexOf(action.payload.currEmail)
      state.viewIndex = viewingIndex
    },
    setIsReplying: (state, action) => {
      state.isReplying = action.payload
    },
  },
})

export const { setCurrentEmail, setViewingIndex, setIsReplying } =
  emailDetailSlice.actions

export const fetchAttachment = ({ attachmentData, messageId }) => {
  const {
    body: { attachmentId },
    filename,
    mimeType,
  } = attachmentData
  return async () => {
    try {
      const fetchedAttachment = await messageApi().getAttachment({
        messageId,
        attachmentId,
      })
      const decodedB64 = baseBase64(
        fetchedAttachment.data.messageAttachment.data
      )
      const attachment = {
        mimeType,
        decodedB64,
        filename,
      }
      return attachment
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

export const downloadAttachment = ({ attachmentData, messageId }) => {
  const {
    body: { attachmentId },
    filename,
    mimeType,
  } = attachmentData
  return async () => {
    try {
      const fetchedAttachment = await messageApi().getAttachment({
        messageId,
        attachmentId,
      })
      const base64Data = fetchedAttachment.data.messageAttachment.data
      const blobData = base64toBlob({ base64Data, mimeType })
      fileSaver(blobData, filename)
    } catch (err) {
      console.log(err)
    }
  }
}

export const selectCurrentEmail = (state) => state.emailDetail.currEmail
export const selectViewIndex = (state) => state.emailDetail.viewIndex
export const selectIsReplying = (state) => state.emailDetail.isReplying

export default emailDetailSlice.reducer
