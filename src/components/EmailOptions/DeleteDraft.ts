import { deleteDraft, listRemoveDraft } from '../../Store/draftsSlice'
import { listRemoveItemDetail } from '../../Store/emailListSlice'

interface IDeleteDraft {
  threadId: string
  dispatch: Function
  draftId: string | undefined | false
}

const DeleteDraft = ({ threadId, dispatch, draftId }: IDeleteDraft) => {
  const removeDraft = () => {
    dispatch(listRemoveDraft({ threadId }))
    dispatch(
      listRemoveItemDetail({
        messageId: threadId,
      })
    )
    if (draftId) {
      dispatch(deleteDraft(draftId))
    }
  }

  return removeDraft()
}

export default DeleteDraft
