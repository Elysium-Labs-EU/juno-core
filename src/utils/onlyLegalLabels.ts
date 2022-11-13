import { LabelIdName } from 'store/storeTypes/labelsTypes'

interface IOnlyLegalLabelObjects {
  labelNames: string[]
  storageLabels: LabelIdName[]
}

/**
 * @function onlyLegalLabelObjects
 * @param labelNames an array of Labels as strings
 * @param storageLabels an array of labels as objects
 * @returns an array with label objects that are allowed (already in the Redux storage labels)
 */

export function onlyLegalLabelObjects({
  labelNames,
  storageLabels,
}: IOnlyLegalLabelObjects): LabelIdName[] {
  const idMapStorageLabels = storageLabels.map((label) => label.id)

  const filterArray = labelNames.filter((el) => idMapStorageLabels.includes(el))

  const newArray: LabelIdName[] = []
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
  labelIds: string[]
  storageLabels: LabelIdName[]
}): string[] {
  return labelIds.filter((label) =>
    storageLabels.map((storageLabel) => storageLabel.id).includes(label)
  )
}
