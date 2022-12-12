import type { ILabelIdName } from 'store/storeTypes/labelsTypes'

/**
 * @function filterIllegalLabels
 * @param labelIds
 * @param storageLabels
 * @returns a list of the all the labels which Juno is using.
 */

const filterIllegalLabels = (
  labelIds: string[],
  storageLabels: ILabelIdName[]
) =>
  labelIds.filter((label) =>
    storageLabels.map((storageLabel) => storageLabel.id).includes(label)
  )

export default filterIllegalLabels
