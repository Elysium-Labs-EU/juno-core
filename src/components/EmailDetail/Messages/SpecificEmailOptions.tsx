import {
  selectIsForwarding,
  selectIsReplying,
} from '../../../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds } from '../../../store/labelsSlice'
import { IEmailListThreadItem } from '../../../store/storeTypes/emailListTypes'
import * as GS from '../../../styles/globalStyles'
import CustomButton from '../../Elements/Buttons/CustomButton'
import isForwardingListener from '../../EmailOptions/IsForwardingListener'
import isReplyingListener from '../../EmailOptions/IsReplyingListener'
import * as S from './SpecificEmailOptionsStyles'
import { updateMessageLabel } from '../../../store/emailListSlice'
import thrashMail from '../../EmailOptions/ThrashMail'
import * as global from '../../../constants/globalConstants'

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
  const isForwarding = useAppSelector(selectIsForwarding)
  const isReplying = useAppSelector(selectIsReplying)
  const activeMessage = threadDetail.messages[messageIndex]
  const isTrash = activeMessage.labelIds.includes(global.TRASH_LABEL)

  const thrashMessage = () => {
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
        {!isTrash && (
          <CustomButton
            label="Delete this message"
            onClick={() => {
              setShouldRefreshDetail(true)
              thrashMessage()
            }}
            title="Delete this message"
          />
        )}
      </S.Inner>
    </GS.MenuPopper>
  )
}

export default SpecificEmailOptions
