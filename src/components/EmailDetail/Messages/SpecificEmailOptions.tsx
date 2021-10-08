import React from 'react'
import * as GS from '../../../styles/globalStyles'
import { CustomButtonText } from '../../Elements/Buttons'

const SpecificEmailOptions = ({ messageId, setReply }: { messageId?: string, setReply: any }) => {
    console.log(messageId)

    return (
        <GS.MenuPopper>
            <CustomButtonText
                className="button option-link"
                label="Reply to this message"
                onClick={() => setReply(messageId)}
            />
        </GS.MenuPopper>
    )
}

SpecificEmailOptions.defaultProps = {
    messageId: null
}

export default SpecificEmailOptions
