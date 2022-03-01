import { FiArrowRight } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'
import { useAppDispatch } from '../../../Store/hooks'
import isForwardingListener from '../../EmailOptions/IsForwardingListener'

interface IEmailDetailOptions {
  threadDetail: IEmailListThreadItem
}

const messageIndex = 0

const ForwardOption = ({ threadDetail }: IEmailDetailOptions) => {
  const dispatch = useAppDispatch()

  const clickHandeler = () => {
    if (threadDetail.messages) {
      return isForwardingListener({
        messageIndex,
        dispatch,
      })
    }
    return null
  }

  return (
    <CustomButton
      icon={<FiArrowRight />}
      label={local.BUTTON_FORWARD}
      onClick={clickHandeler}
      suppressed
    />
  )
}

export default ForwardOption
