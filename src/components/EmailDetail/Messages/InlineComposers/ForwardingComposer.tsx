import Composer from 'components/Compose/Composer'
import * as ES from 'components/EmailDetail/EmailDetailStyles'
import { useAppDispatch } from 'store/hooks'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import { setSystemStatusUpdate } from 'store/utilsSlice'
import emailBody from 'utils/emailDetailDisplayData/emailBody'

import isBodyWithEmailHTML from './getEmailHTML'
import getRelevantMessage from './getRelevantMessage'

/**
 *
 * @param localThreadDetail - the relevant thread detail object
 * @param selectedIndex - the selected index is the index of the selected message, NOTE - the message list on display is flipped
 * @param messageOverviewListener  A callback function that will listen to the discard or cancel event on the composer
 * @returns
 */

interface IForwardingComposer {
  localThreadDetail: TThreadObject
  selectedIndex: number | undefined
  messageOverviewListener: (
    evenType: 'cancel' | 'discard',
    messageId?: string
  ) => void
  isForwarding: boolean
}

const ForwardingComposer = ({
  localThreadDetail,
  selectedIndex,
  messageOverviewListener,
  isForwarding,
}: IForwardingComposer) => {
  const dispatch = useAppDispatch()
  const relevantMessage = getRelevantMessage({
    selectedIndex,
    localThreadDetail,
  })

  if (!relevantMessage) {
    dispatch(
      setSystemStatusUpdate({
        type: 'error',
        message: 'Cannot open composer with relevant message',
      })
    )
    return (
      <ES.ComposeWrapper data-cy="forward-composer">
        <Composer messageOverviewListener={messageOverviewListener} />
      </ES.ComposeWrapper>
    )
  }

  return (
    <ES.ComposeWrapper data-cy="forward-composer">
      <Composer
        presetValue={{
          subject: relevantMessage?.payload.headers.subject,
          body: emailBody(isBodyWithEmailHTML(relevantMessage), isForwarding),
          threadId: relevantMessage?.threadId,
          id: relevantMessage?.id,
        }}
        messageOverviewListener={messageOverviewListener}
      />
    </ES.ComposeWrapper>
  )
}

export default ForwardingComposer
