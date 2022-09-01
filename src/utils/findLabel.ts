import { LabelIdName } from '../store/storeTypes/labelsTypes'

interface IFindLabelByNameType {
  storageLabels: LabelIdName[]
  LABEL_NAME: string
}

export const findLabelByName = ({
  storageLabels,
  LABEL_NAME,
}: IFindLabelByNameType) =>
  storageLabels.filter((label) => label.name === LABEL_NAME)

interface IFindLabelByIdType {
  storageLabels: LabelIdName[]
  labelIds: string[]
}

export const findLabelById = ({
  storageLabels,
  labelIds,
}: IFindLabelByIdType) =>
  storageLabels.filter((label) => label.id === labelIds[0])
