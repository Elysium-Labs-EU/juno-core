import type { TLabelState } from 'store/storeTypes/labelsTypes'

interface IFindLabelByNameType {
  storageLabels: TLabelState['storageLabels']
  LABEL_NAME: string
}

export const findLabelByName = ({
  storageLabels,
  LABEL_NAME,
}: IFindLabelByNameType) =>
  storageLabels.find((label) => label.name === LABEL_NAME)

interface IFindLabelByIdType {
  storageLabels: TLabelState['storageLabels']
  labelIds: TLabelState['labelIds']
}

export const findLabelById = ({
  storageLabels,
  labelIds,
}: IFindLabelByIdType) =>
  storageLabels.find((label) => label.id === labelIds[0])
