/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEmailAttachmentType } from '../components/EmailDetail/Attachment/EmailAttachmentTypes'
import messageApi from '../data/messageApi'
import base64toBlob from '../utils/base64toBlob'
import { baseBase64 } from '../utils/decodeBase64'
import fileSaver from '../utils/fileSaver'
import { EmailDetailState } from './emailDetailTypes'
import type { AppThunk, RootState } from './store'

const initialState: EmailDetailState = Object.freeze({
  currEmail: '',
  currMessage: '',
  viewIndex: -1,
  sessionViewIndex: -1,
  isReplying: false,
})

export const emailDetailSlice = createSlice({
  name: 'emailDetail',
  initialState,
  reducers: {
    setCurrentEmail: (state, action) => {
      state.currEmail = action.payload
    },
    setCurrentMessage: (state, action) => {
      state.currMessage = action.payload
    },
    setViewIndex: (state, action: PayloadAction<number>) => {
      state.viewIndex = action.payload
    },
    setSessionViewIndex: (state, action: PayloadAction<number>) => {
      state.sessionViewIndex = action.payload
    },
    setIsReplying: (state, action: PayloadAction<boolean>) => {
      state.isReplying = action.payload
    },
  },
})

export const {
  setCurrentEmail,
  setCurrentMessage,
  setViewIndex,
  setSessionViewIndex,
  setIsReplying,
} = emailDetailSlice.actions

export const fetchAttachment = ({
  attachmentData,
  messageId,
}: {
  attachmentData: IEmailAttachmentType
  messageId: string
}): AppThunk => {
  const {
    body: { attachmentId },
    filename,
    mimeType,
  } = attachmentData
  return async () => {
    try {
      if (attachmentId && messageId) {
        const fetchedAttachment = await messageApi().getAttachment({
          messageId,
          attachmentId,
        })
        if (fetchedAttachment) {
          const decodedB64 = baseBase64(fetchedAttachment.data.data)
          const attachment = {
            mimeType,
            decodedB64,
            filename,
          }
          return attachment
        }
        return null
      }
      return null
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

export const downloadAttachment = ({
  attachmentData,
  messageId,
}: {
  attachmentData: IEmailAttachmentType
  messageId: string
}): AppThunk => {
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
      if (fetchedAttachment) {
        const base64Data = fetchedAttachment.data.messageAttachment.data
        const blobData = base64toBlob({ base64Data, mimeType })
        fileSaver(blobData, filename)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const selectCurrentEmail = (state: RootState) =>
  state.emailDetail.currEmail
export const selectCurrentMessage = (state: RootState) =>
  state.emailDetail.currMessage
export const selectViewIndex = (state: RootState) => state.emailDetail.viewIndex
export const selectSessionViewIndex = (state: RootState) =>
  state.emailDetail.sessionViewIndex
export const selectIsReplying = (state: RootState) =>
  state.emailDetail.isReplying

export default emailDetailSlice.reducer
