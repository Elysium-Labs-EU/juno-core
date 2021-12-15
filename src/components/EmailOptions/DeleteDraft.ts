import { listRemoveDraft } from '../../Store/draftsSlice'
import { listRemoveItemDetail } from '../../Store/emailListSlice'
import { EmailListObject } from '../../Store/emailListTypes'

const DeleteDraft = ({
  threadId,
  dispatch,
  copyCurrentEmailList,
}: {
  threadId: string
  dispatch: any
  copyCurrentEmailList: EmailListObject[]
}) => {
  const RemoveDraft = () => {
    dispatch(listRemoveDraft({ threadId }))

    dispatch(
      listRemoveItemDetail({
        messageId: threadId,
        copyCurrentEmailList,
      })
    )
  }

  return RemoveDraft()
}

export default DeleteDraft
