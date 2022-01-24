import * as GS from '../../../styles/globalStyles'
import CustomButton from '../../Elements/Buttons/CustomButton'

const SpecificEmailOptions = ({
  messageId,
  isReplyingListener,
  messageIndex,
}: {
  messageId?: string
  isReplyingListener: any
  messageIndex: number
}) => (
  <GS.MenuPopper>
    <CustomButton
      label="Reply to this message"
      onClick={() => isReplyingListener({ messageId, messageIndex })}
    />
  </GS.MenuPopper>
)

SpecificEmailOptions.defaultProps = {
  messageId: null,
}

export default SpecificEmailOptions
