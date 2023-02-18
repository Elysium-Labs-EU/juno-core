import type { TLabelState } from 'store/storeTypes/labelsTypes'

/**
 * @function filterIllegalLabels
 * @param labelIds
 * @param storageLabels
 * @returns a list of the all the labels which Juno is using.
 */

const filterIllegalLabels = (
  labelIds: TLabelState['labelIds'],
  storageLabels: TLabelState['storageLabels']
) => {
  const storageLabelIds = new Set(
    storageLabels.map((storageLabel) => storageLabel.id)
  )
  return labelIds.filter((labelId) => storageLabelIds.has(labelId))
}

export default filterIllegalLabels
