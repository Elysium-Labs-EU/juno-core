import {
  selectIsForwarding,
  selectIsReplying,
} from '../../../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import * as GS from '../../../styles/globalStyles'
import CustomButton from '../../Elements/Buttons/CustomButton'
import isForwardingListener from '../../EmailOptions/IsForwardingListener'
import isReplyingListener from '../../EmailOptions/IsReplyingListener'
import * as S from './SpecificEmailOptionsStyles'

interface ISpecificEmailOptions {
  messageId: string
  messageIndex: number
}

const SpecificEmailOptions = ({
  messageId,
  messageIndex,
}: ISpecificEmailOptions) => {
  const dispatch = useAppDispatch()
  const isForwarding = useAppSelector(selectIsForwarding)
  const isReplying = useAppSelector(selectIsReplying)

  return (
    <GS.MenuPopper>
      <S.Inner>
        <CustomButton
          label="Reply to this message"
          onClick={() =>
            isReplyingListener({
              messageIndex,
              dispatch,
              messageId,
              isForwarding,
            })
          }
        />
        <CustomButton
          label="Forward this message"
          onClick={() =>
            isForwardingListener({
              messageIndex,
              dispatch,
              messageId,
              isReplying,
            })
          }
        />
      </S.Inner>
    </GS.MenuPopper>
  )
}

export default SpecificEmailOptions
