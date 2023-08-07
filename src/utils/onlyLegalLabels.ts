import type { TLabelState } from 'store/storeTypes/labelsTypes'

interface OnlyLegalLabelObjects {
  labelIds: TLabelState['labelIds']
  storageLabels: TLabelState['storageLabels']
}

/**
 * @function onlyLegalLabelObjects
 * @param labelIds an array of Labels as strings
 * @param storageLabels an array of labels as objects
 * @returns an array with label objects that are allowed (already in the Redux storage labels)
 */

export function onlyLegalLabelObjects({
  labelIds,
  storageLabels,
}: OnlyLegalLabelObjects) {
  const idMapStorageLabels = storageLabels.map((label) => label.id)

  const filterArray = labelIds.filter((el) => idMapStorageLabels.includes(el))

  const newArray: TLabelState['storageLabels'] = []
  for (let i = 0; i < filterArray.length; i += 1) {
    const pushItem = storageLabels.find((item) => item.id === filterArray[i])
    if (pushItem) newArray.push(pushItem)
  }

  return newArray
}

/**
 * @function onlyLegalLabelStrings
 * @param labelIds
 * @param storageLabels
 * @returns a list of the all the labels which Juno is using.
 */

export function onlyLegalLabelStrings({
  labelIds,
  storageLabels,
}: {
  labelIds: TLabelState['labelIds']
  storageLabels: TLabelState['storageLabels']
}) {
  return labelIds.filter((label) =>
    storageLabels.map((storageLabel) => storageLabel.id).includes(label)
  )
}
