import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { push } from 'redux-first-history'

import CustomToast from 'components/Elements/Toast/Toast'
import archiveMail from 'components/EmailOptions/ArchiveMail'
import * as global from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'
import draftApi from 'data/draftApi'
import messageApi from 'data/messageApi'
import {
  setCurrentEmail,
  setIsForwarding,
  setIsReplying,
} from 'store/emailDetailSlice'
import {
  listRemoveItemDetail,
  listRemoveItemDetailBatch,
  listRemoveItemDetailDraft,
  setSelectedEmails,
} from 'store/emailListSlice'
import type { AppThunk, RootState } from 'store/store'
import type { IComposePayload } from 'store/storeTypes/composeTypes'
import { DraftResponseEntry } from 'store/storeTypes/draftsTypes'
import type {
  IDraftDetails,
  TDraftsState,
  IOpenDraftEmailType,
  TDraftResponseEntry,
} from 'store/storeTypes/draftsTypes'
import { closeMail, navigateNextMail, setIsProcessing } from 'store/utilsSlice'
import getEmailListIndex from 'utils/getEmailListIndex/getEmailListIndex'
import isEmpty from 'utils/isEmpty'
import { prepareFormData } from 'utils/prepareMessage'

import type { TGmailV1SchemaDraftSchema } from './storeTypes/gmailBaseTypes/gmailTypes'

/* eslint-disable no-param-reassign */

export const fetchDrafts = createAsyncThunk(
  'drafts/fetchDrafts',
  async (_, { signal }) => {
    const response = await draftApi().getDrafts()
    if (!response) {
      return null
    }
    return response.data
  }
)

const initialState: TDraftsState = Object.freeze({
  draftList: null,
})

const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    listRemoveDraftThread: (
      state,
      { payload }: PayloadAction<{ threadId: string }>
    ) => {
      const { threadId } = payload
      const copyCurrentDraftList = state.draftList
      if (!copyCurrentDraftList) {
        return
      }
      const newDraftList = copyCurrentDraftList.filter(
        (item) => item.message.threadId !== threadId
      )
      state.draftList = newDraftList
    },
    listRemoveDraftMessage: (
      state,
      { payload }: PayloadAction<{ messageId: string }>
    ) => {
      const { messageId } = payload
      const copyCurrentDraftList = state.draftList
      if (!copyCurrentDraftList) {
        return
      }
      const newDraftList = copyCurrentDraftList.filter(
        (item) => item.message.id !== messageId
      )
      state.draftList = newDraftList
    },
    listRemoveDraftBatch: (
      state,
      { payload }: PayloadAction<{ threadIds: Array<string> }>
    ) => {
      const { threadIds } = payload
      const copyCurrentDraftList = state.draftList
      if (!copyCurrentDraftList) {
        return
      }

      // TODO: Check how this functions, whenever there are drafts in the system without a threadId, how do we remove them?
      const filterArray = () => {
        const filtered = copyCurrentDraftList.filter((el) =>
          el.message.threadId ? !threadIds.includes(el.message.threadId) : false
        )
        return filtered
      }
      state.draftList = filterArray()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrafts.fulfilled, (state, { payload }) => {
      // Only update the state whenever there is something.
      if (payload && 'drafts' in payload) {
        if (payload.drafts) {
          const restructuredDraftList: TDraftsState['draftList'] = []
          payload.drafts.forEach((draft) => {
            if (draft.id && draft.message?.id && draft.message.threadId) {
              restructuredDraftList.push({
                id: draft.id,
                message: {
                  id: draft.message.id,
                  threadId: draft.message.threadId,
                },
              })
            }
          })
          state.draftList = restructuredDraftList
        }
      }
    })
  },
})

export const {
  listRemoveDraftThread,
  listRemoveDraftMessage,
  listRemoveDraftBatch,
} = draftsSlice.actions

/**
 * @function createUpdateDraft
 * @async
 * @param {Object} composedEmail - An object that contains the details of the composed email.
 * @param {TGmailV1SchemaDraftSchema} localDraftDetails - An object that contains the details of the local draft.
 * @returns {Promise<AppThunk>} - Returns a promise that resolves to the updated or created draft.
 *
 * @throws {Error} - If the API call fails or the response status is not 200.
 *
 * @description
 * This function creates or updates a draft. If the `localDraftDetails` object is provided, it updates the existing draft.
 * Otherwise, it creates a new draft.
 */

interface CreateUpdateDraft {
  composedEmail: IComposePayload
  localDraftDetails: TGmailV1SchemaDraftSchema | undefined
}

export const createUpdateDraft =
  ({
    composedEmail,
    localDraftDetails,
  }: CreateUpdateDraft): AppThunk<void> =>
    async (dispatch, getState) => {
      try {
        const { emailAddress, name } = getState().base.profile
        const formData = await prepareFormData({
          composedEmail,
          emailAddress,
          localDraftDetails,
          name,
        })

        const response = !localDraftDetails?.id
          ? await draftApi().createDrafts(formData)
          : await draftApi().updateDrafts({
            id: localDraftDetails.id,
            formData,
          })

        if (!response || ('status' in response && response.status !== 200)) {
          toast.custom((t) => (
            <CustomToast
              specificToast={t}
              title="Cannot update or create draft."
              variant="error"
            />
          ))
        }

        if (typeof response === 'object' && 'data' in response) {
          if (localDraftDetails?.message?.threadId) {
            // Remove the previous entry from Redux Emaillist. History will create a new one.
            dispatch(
              listRemoveItemDetailDraft({
                threadId: localDraftDetails.message.threadId,
              })
            )
          }
          return response.data
        }
        return null
      } catch (err) {
        toast.custom((t) => (
          <CustomToast
            specificToast={t}
            title="Cannot update or create draft."
            variant="error"
          />
        ))
        return null
      }
    }

const ERROR_OPEN_DRAFT_EMAIL = 'Error setting up compose email.'

const pushDraftDetails =
  ({ draft }: { draft: TDraftResponseEntry }): AppThunk<void> =>
    (dispatch, getState) => {
      const { message } = draft
      try {
        if (draft.id && message.threadId) {
          dispatch(setCurrentEmail(message.threadId))
          if (!getState().labels.labelIds.includes(global.DRAFT_LABEL)) {
            dispatch(setIsReplying(true))
          } else {
            // From headers are not taken in account here - since we only allow for one account
            const loadEmail = {
              id: message.id,
              threadId: message.threadId,
              to: message.payload.headers.to,
              cc: message.payload.headers.cc,
              bcc: message.payload.headers.bcc,
              subject: message.payload.headers.subject,
              body: message.payload.body.emailHTML,
              // Push the files as B64 objects to the state, to be decoded on the component. Files cannot be stored into Redux.
              files: message.payload.files,
            }
            dispatch(
              push(`${RoutesConstants.COMPOSE_EMAIL}${draft.id}`, loadEmail)
            )
          }
        } else {
          dispatch(push(RoutesConstants.COMPOSE_EMAIL))
        }
      } catch (err) {
        toast.custom((t) => (
          <CustomToast
            specificToast={t}
            title={ERROR_OPEN_DRAFT_EMAIL}
            variant="error"
          />
        ))
      }
    }

const loadDraftDetails = (draftDetails: IDraftDetails): AppThunk<void> =>
  async (dispatch) => {
    const { draftId } = draftDetails
    try {
      const response = await draftApi().getDraftDetail(draftId)
      if (response &&
        'status' in response &&
        response.status === 200 &&
        'data' in response
      ) {
        DraftResponseEntry.parse(response.data)
        dispatch(pushDraftDetails({ draft: response.data }))
      } else {
        toast.custom((t) => (
          <CustomToast
            specificToast={t}
            title={ERROR_OPEN_DRAFT_EMAIL}
            variant="error"
          />
        ))
      }
    } catch (err) {
      toast.custom((t) => (
        <CustomToast
          specificToast={t}
          title={ERROR_OPEN_DRAFT_EMAIL}
          variant="error"
        />
      ))
    }
  }


export const openDraftEmail =
  ({ messageId, id }: IOpenDraftEmailType): AppThunk<void> =>
    (dispatch, getState) => {
      try {
        const { draftList } = getState().drafts
        if (!draftList) {
          toast.custom((t) => (
            <CustomToast
              specificToast={t}
              title={ERROR_OPEN_DRAFT_EMAIL}
              variant="error"
            />
          ))
          return
        }

        // Search the draftList on message.threadId to get the id. Use that Id to fetch all the details of the draft.
        const selectedEmail =
          messageId
            ? draftList.find((draft) => draft.message.id === messageId)
            : draftList.find((draft) => draft.message.threadId === id)

        if (selectedEmail) {
          const draftId = selectedEmail.id
          if (!isEmpty(draftId)) {
            dispatch(loadDraftDetails({ draftId }))
          } else {
            toast.custom((t) => (
              <CustomToast
                specificToast={t}
                title={ERROR_OPEN_DRAFT_EMAIL}
                variant="error"
              />
            ))
          }
        }
        // }
      } catch (err) {
        toast.custom((t) => (
          <CustomToast
            specificToast={t}
            title={ERROR_OPEN_DRAFT_EMAIL}
            variant="error"
          />
        ))
      }
    }

export const deleteDraftBatch = (): AppThunk<void> => (dispatch, getState) => {
  const { selectedEmails } = getState().email
  const { draftList } = getState().drafts
  if (!selectedEmails?.selectedIds || !draftList || draftList.length === 0) {
    toast.custom((t) => (
      <CustomToast
        specificToast={t}
        title="Error deleting draft."
        variant="error"
      />
    ))
    return
  }
  dispatch(
    listRemoveItemDetailBatch({
      messageIds: selectedEmails.selectedIds,
    })
  )
  dispatch(setSelectedEmails([]))
  dispatch(listRemoveDraftBatch({ threadIds: selectedEmails.selectedIds }))
  for (let i = 0; selectedEmails.selectedIds.length > i; i += 1) {
    try {
      const draftObject =
        draftList.find(
          (draft) => draft.message.threadId === selectedEmails.selectedIds[i]
        )
      if (
        draftObject instanceof Object
      ) {
        void draftApi().deleteDraft(draftObject.id)
      }
    } catch (err) {
      toast.custom((t) => (
        <CustomToast
          specificToast={t}
          title="Error deleting draft."
          variant="error"
        />
      ))
    }
  }
}

export const deleteDraft =
  (id: string): AppThunk<void> =>
    async (dispatch, getState) => {
      const { coreStatus } = getState().emailDetail
      dispatch(setIsProcessing(true))
      try {
        await draftApi().deleteDraft(id)
      } catch (err) {
        toast.custom((t) => (
          <CustomToast
            variant="error"
            specificToast={t}
            title="Error deleting draft."
          />
        ))
      } finally {
        dispatch(setIsProcessing(false))
        // When in search mode, and the discard of the draft is complete, send a notification, since the searchList is a separate state that is not updated.
        if (coreStatus === global.CORE_STATUS_MAP.searching) {
          toast.custom((t) => (
            <CustomToast
              variant="success"
              specificToast={t}
              title="Draft has been deleted."
            />
          ))
        }
      }
    }

export const sendComposedEmail =
  ({
    composedEmail,
    localDraftDetails,
  }: {
    composedEmail: IComposePayload
    localDraftDetails: TGmailV1SchemaDraftSchema | undefined
  }): AppThunk =>
    async (dispatch, getState) => {
      try {
        const { emailList } = getState().email
        const { coreStatus, isForwarding, isReplying } = getState().emailDetail
        // Reset the replying state to false on sending, to close the composer.
        if (isReplying) {
          dispatch(setIsReplying(false))
        }
        // Reset the forwarding state to false on sending, to close the composer.
        if (isForwarding) {
          dispatch(setIsForwarding(false))
        }
        // Reset the emailDetail state and return to the main page on sending whenever the user is not in sorting or focused mode.
        if (
          coreStatus !== global.CORE_STATUS_MAP.sorting &&
          coreStatus !== global.CORE_STATUS_MAP.focused
        ) {
          dispatch(setCurrentEmail(''))
          void dispatch(closeMail())
        }

        // Send the user to the next email when it is sorting of focused
        if (
          coreStatus === global.CORE_STATUS_MAP.sorting ||
          coreStatus === global.CORE_STATUS_MAP.focused
        ) {
          void dispatch(navigateNextMail())
        }
        // TODO: Set the timeout for sending on the backend.
        // If the id is found on the draft details, send the draft email via the Google servers as a draft.
        if (localDraftDetails?.id) {
          const response = await draftApi().sendDraft({
            id: localDraftDetails.id,
            timeOut: global.MESSAGE_SEND_DELAY,
          })

          // When succesfully sending the email - the system removes the draft from the draft inbox, the draft list, and the thread's other inbox location.
          if (response && response.status === 200) {
            const { labelIds } = getState().labels
            // We can only archive the previous draft if it has a threadId
            if (localDraftDetails.message?.threadId) {
              archiveMail({
                threadId: localDraftDetails.message.threadId,
                dispatch,
                labelIds,
              })
            }
            const staticIndexActiveEmailList: number = getEmailListIndex({
              emailList,
              labelIds: [global.DRAFT_LABEL],
            })
            if (
              staticIndexActiveEmailList > -1 &&
              localDraftDetails.message?.id
            ) {
              dispatch(
                listRemoveItemDetail({
                  threadId: localDraftDetails.message.id,
                })
              )
            }
            toast.custom((t) => (
              <CustomToast specificToast={t} title="Sent your email." />
            ))
          }
          toast.custom((t) => (
            <CustomToast
              specificToast={t}
              title="Error sending your mail."
              variant="error"
            />
          ))
        }
        // If the id cannot be found on the draft details, send the email via the sendMessage function
        if (!localDraftDetails?.id) {
          const { emailAddress, name } = getState().base.profile
          const formData = await prepareFormData({
            composedEmail,
            emailAddress,
            localDraftDetails,
            name,
          })

          const response = await messageApi().sendMessage({
            data: formData,
            timeOut: global.MESSAGE_SEND_DELAY,
          })
          if (!response || response.status !== 200) {
            toast.custom((t) => (
              <CustomToast
                specificToast={t}
                title="Error sending your mail."
                variant="error"
              />
            ))
          }
          toast.custom((t) => (
            <CustomToast
              variant="success"
              specificToast={t}
              title="Sent your email."
            />
          ))
        }
        toast.custom((t) => (
          <CustomToast
            specificToast={t}
            title="Error sending your mail."
            variant="error"
          />
        ))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        toast.custom((t) => (
          <CustomToast
            specificToast={t}
            title="Error sending your mail."
            variant="error"
          />
        ))
      }
    }

export const selectDraftList = (state: RootState) => state.drafts.draftList

export default draftsSlice.reducer
