import { deleteDraft, listRemoveDraft } from '../../Store/draftsSlice'
import { listRemoveItemDetail } from '../../Store/emailListSlice'
import { IEmailListObject } from '../../Store/emailListTypes'

interface IDeleteDraft {
  threadId: string
  dispatch: any
  copyCurrentEmailList: IEmailListObject[]
  draftId: string | undefined | false
}

const DeleteDraft = ({
  threadId,
  dispatch,
  copyCurrentEmailList,
  draftId,
}: IDeleteDraft) => {
  const RemoveDraft = () => {
    dispatch(listRemoveDraft({ threadId }))
    dispatch(
      listRemoveItemDetail({
        messageId: threadId,
        copyCurrentEmailList,
      })
    )
    if (draftId) dispatch(deleteDraft(draftId))
  }

  return RemoveDraft()
}

export default DeleteDraft
