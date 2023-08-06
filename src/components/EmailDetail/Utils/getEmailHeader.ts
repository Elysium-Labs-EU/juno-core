import type { Location } from 'react-router-dom'

import { HEADER_FOCUS, HEADER_SORT } from 'constants/emailDetailConstants'
import { CORE_STATUS_MAP, SEARCH_LABEL } from 'constants/globalConstants'
import type { TEmailDetailState } from 'store/storeTypes/emailDetailTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import { findLabelById } from 'utils/findLabel'

interface IGetEmailHeader {
  coreStatus: TEmailDetailState['coreStatus']
  labelIds: TLabelState['labelIds']
  location: Location
  storageLabels: TLabelState['storageLabels']
}

export default function getEmailHeader({
  coreStatus,
  labelIds,
  location,
  storageLabels,
}: IGetEmailHeader) {
  if (coreStatus === CORE_STATUS_MAP.focused) {
    return HEADER_FOCUS
  }
  if (coreStatus === CORE_STATUS_MAP.sorting) {
    return HEADER_SORT
  }
  if (storageLabels.length === 0 || labelIds.length === 0) {
    return ''
  }
  if (labelIds[0] && location.pathname.includes(labelIds[0])) {
    const matchedLabel = findLabelById({ storageLabels, labelIds })
    if (matchedLabel) {
      const splitHeader = matchedLabel.name.split('/')
      return (
        splitHeader[splitHeader.length - 1]
          ?.replace(/\s/g, '')
          ?.toLowerCase() ?? ''
      )
    }
    return SEARCH_LABEL.toLowerCase()
  }
  return ''
}
