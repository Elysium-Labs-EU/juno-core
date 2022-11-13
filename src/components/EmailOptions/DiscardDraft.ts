import {
  deleteDraft,
  listRemoveDraftMessage,
  listRemoveDraftThread,
} from 'store/draftsSlice'
import {
  listRemoveItemDetail,
  listRemoveItemMessage,
} from 'store/emailListSlice'
import { AppDispatch } from 'store/store'

interface IDiscardDraft {
  threadId?: string
  messageId?: string
  dispatch: AppDispatch
  draftId: string | undefined | false
}

export default function discardDraft({
  threadId,
  messageId,
  dispatch,
  draftId,
}: IDiscardDraft) {
  if (messageId && threadId) {
    dispatch(listRemoveDraftMessage({ messageId }))
    dispatch(listRemoveItemMessage({ threadId, messageId }))
  }
  if (!messageId && threadId) {
    dispatch(listRemoveDraftThread({ threadId }))
    dispatch(
      listRemoveItemDetail({
        threadId,
      })
    )
  }
  if (draftId) {
    dispatch(deleteDraft(draftId))
  }
}
