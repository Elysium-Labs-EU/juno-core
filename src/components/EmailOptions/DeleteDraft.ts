import { deleteDraft, listRemoveDraft } from '../../Store/draftsSlice'
import { listRemoveItemDetail } from '../../Store/emailListSlice'

interface IDeleteDraft {
  threadId: string
  dispatch: Function
  emailListIndex: number
  draftId: string | undefined | false
}

const DeleteDraft = ({
  threadId,
  dispatch,
  emailListIndex,
  draftId,
}: IDeleteDraft) => {
  const RemoveDraft = () => {
    dispatch(listRemoveDraft({ threadId }))
    dispatch(
      listRemoveItemDetail({
        messageId: threadId,
        staticIndexActiveEmailList: emailListIndex,
      })
    )
    if (draftId) {
      dispatch(deleteDraft(draftId))
    }
  }

  return RemoveDraft()
}

export default DeleteDraft
