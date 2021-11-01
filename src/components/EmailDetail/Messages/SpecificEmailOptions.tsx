import React from 'react'
import * as GS from '../../../styles/globalStyles'
import { CustomButtonText } from '../../Elements/Buttons'

const SpecificEmailOptions = ({ messageId, isReplyingListener, messageIndex }: { messageId?: string, isReplyingListener: any, messageIndex: number }) =>
(
    <GS.MenuPopper>
        <CustomButtonText
            className="button option-link"
            label="Reply to this message"
            onClick={() => isReplyingListener({ messageId, messageIndex })}
        />
    </GS.MenuPopper>
)


SpecificEmailOptions.defaultProps = {
    messageId: null
}

export default SpecificEmailOptions
