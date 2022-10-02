import {
  selectIsForwarding,
  selectIsReplying,
} from '../../../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds, selectStorageLabels } from '../../../store/labelsSlice'
import { IEmailListThreadItem } from '../../../store/storeTypes/emailListTypes'
import * as GS from '../../../styles/globalStyles'
import emailLabels from '../../../utils/emailLabels'
import CustomButton from '../../Elements/Buttons/CustomButton'
import isForwardingListener from '../../EmailOptions/IsForwardingListener'
import isReplyingListener from '../../EmailOptions/IsReplyingListener'
import * as S from './SpecificEmailOptionsStyles'
import * as global from '../../../constants/globalConstants'
import { updateMessageLabel } from '../../../store/emailListSlice'
import thrashMail from '../../EmailOptions/ThrashMail'

const SpecificEmailOptions = ({
  messageIndex,
  handleClickListener,
  threadDetail,
  setShouldRefreshDetail,
}: {
  messageIndex: number
  threadDetail: IEmailListThreadItem
  handleClickListener: ({ mIndex }: { mIndex: number }) => void
  setShouldRefreshDetail: (value: boolean) => void
}) => {
  const dispatch = useAppDispatch()
  const labelIds = useAppSelector(selectLabelIds)
  const storageLabels = useAppSelector(selectStorageLabels)
  const isForwarding = useAppSelector(selectIsForwarding)
  const isReplying = useAppSelector(selectIsReplying)
  const staticEmailLabels = emailLabels(threadDetail, storageLabels)
  const activeMessage = threadDetail.messages[messageIndex]

  const request = {
    removeLabelIds: [
      ...labelIds.filter((item) => item !== global.UNREAD_LABEL),
    ],
  }

  const archiveMessage = () => {
    dispatch(
      updateMessageLabel({
        threadId: threadDetail.id,
        messageId: activeMessage.id,
        request,
      })
    )
  }

  const deleteMessage = () => {
    if (threadDetail.messages.length > 1) {
      dispatch(
        updateMessageLabel({
          threadId: threadDetail.id,
          messageId: activeMessage.id,
          request: { delete: true },
        })
      )
    } else {
      thrashMail({ threadId: threadDetail.id, labelIds, dispatch })
    }
  }

  const forceRefreshEmailDetail = () => setShouldRefreshDetail(true)

  return (
    <GS.MenuPopper>
      <S.Inner>
        <CustomButton
          label="Reply to this message"
          onClick={() => {
            handleClickListener({ mIndex: messageIndex })
            isReplyingListener({
              dispatch,
              isForwarding,
            })
          }}
          title="Reply to this message"
        />
        <CustomButton
          label="Forward this message"
          onClick={() => {
            handleClickListener({ mIndex: messageIndex })
            isForwardingListener({
              dispatch,
              isReplying,
            })
          }}
          title="Forward this message"
        />
        <CustomButton
          label="Delete this message"
          onClick={() => {
            deleteMessage()
            forceRefreshEmailDetail()
          }}
          title="Delete this message"
        />
        {staticEmailLabels.length > 0 && (
          <CustomButton
            label="Archive this message"
            onClick={() => {
              archiveMessage()
              forceRefreshEmailDetail()
            }}
            title="Archive this message"
          />
        )}
      </S.Inner>
    </GS.MenuPopper>
  )
}

export default SpecificEmailOptions
