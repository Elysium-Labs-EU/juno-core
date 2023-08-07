import { DRAFT_LABEL } from 'constants/globalConstants'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

/**
 * @function shouldUseDraftOrRegular
 * @param labelIds - all the label ids stored in Redux
 * @param email - the email list object
 * @returns a filtered version of the emaillist object, if the draft label is found.
 */
export default function shouldUseDraftOrRegular(
  labelIds: TLabelState['labelIds'],
  email: TThreadObject
) {
  if (Array.isArray(labelIds) && labelIds.includes(DRAFT_LABEL)) {
    return {
      ...email,
      messages: email.messages.filter((message) =>
        message.labelIds.includes(DRAFT_LABEL)
      ),
    }
  }
  return email
}
