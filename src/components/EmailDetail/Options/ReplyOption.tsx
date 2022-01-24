import { FiCornerUpLeft } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'

interface IEmailDetailOptions {
  threadDetail: IEmailListThreadItem
  isReplyingListener: Function
}

const messageIndex = 0

const ReplyOption = ({
  isReplyingListener,
  threadDetail,
}: IEmailDetailOptions) => {
  const clickHandeler = () => {
    if (threadDetail.messages) {
      return isReplyingListener({
        threadId:
          threadDetail.messages[threadDetail.messages.length - 1].threadId,
        messageIndex,
      })
    }
    return null
  }

  return (
    <CustomButton
      icon={<FiCornerUpLeft />}
      label={local.BUTTON_REPLY}
      onClick={clickHandeler}
      suppressed
    />
  )
}

export default ReplyOption
