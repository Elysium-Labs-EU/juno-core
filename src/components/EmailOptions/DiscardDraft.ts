import {
  deleteDraft,
  listRemoveDraftMessage,
  listRemoveDraftThread,
} from '../../store/draftsSlice'
import {
  listRemoveItemDetail,
  listRemoveItemMessage,
} from '../../store/emailListSlice'

interface IDiscardDraft {
  threadId?: string
  messageId?: string
  dispatch: Function
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
