import type { ILabelIdName } from 'store/storeTypes/labelsTypes'

interface IFindLabelByNameType {
  storageLabels: Array<ILabelIdName>
  LABEL_NAME: string
}

export const findLabelByName = ({
  storageLabels,
  LABEL_NAME,
}: IFindLabelByNameType) =>
  storageLabels.find((label) => label.name === LABEL_NAME)

interface IFindLabelByIdType {
  storageLabels: Array<ILabelIdName>
  labelIds: Array<string>
}

export const findLabelById = ({
  storageLabels,
  labelIds,
}: IFindLabelByIdType) =>
  storageLabels.find((label) => label.id === labelIds[0])
