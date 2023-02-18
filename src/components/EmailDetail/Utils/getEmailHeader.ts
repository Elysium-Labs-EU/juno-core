import type { Location } from 'react-router-dom'

import { HEADER_FOCUS, HEADER_SORT } from 'constants/emailDetailConstants'
import { CORE_STATUS_MAP, SEARCH_LABEL } from 'constants/globalConstants'
import type { IEmailDetailState } from 'store/storeTypes/emailDetailTypes'
import type { ILabelState } from 'store/storeTypes/labelsTypes'
import { findLabelById } from 'utils/findLabel'

interface IGetEmailHeader {
  coreStatus: IEmailDetailState['coreStatus']
  labelIds: ILabelState['labelIds']
  location: Location
  storageLabels: ILabelState['storageLabels']
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
  if (location?.pathname?.includes(labelIds[0])) {
    const matchedLabel = findLabelById({ storageLabels, labelIds })
    if (matchedLabel) {
      const splitHeader = matchedLabel.name.split('/')
      return splitHeader[splitHeader.length - 1].toLowerCase()
    }
    return SEARCH_LABEL.toLowerCase()
  }
  return ''
}
