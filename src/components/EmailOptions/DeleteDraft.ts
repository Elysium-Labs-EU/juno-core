import { deleteDraft, listRemoveDraft } from '../../Store/draftsSlice'
import { listRemoveItemDetail } from '../../Store/emailListSlice'

interface IDeleteDraft {
  threadId: string
  dispatch: Function
  staticIndexActiveEmailList: number
  draftId: string | undefined | false
}

const DeleteDraft = ({
  threadId,
  dispatch,
  staticIndexActiveEmailList,
  draftId,
}: IDeleteDraft) => {
  const RemoveDraft = () => {
    dispatch(listRemoveDraft({ threadId }))
    dispatch(
      listRemoveItemDetail({
        messageId: threadId,
        staticIndexActiveEmailList,
      })
    )
    if (draftId) {
      dispatch(deleteDraft(draftId))
    }
  }

  return RemoveDraft()
}

export default DeleteDraft
