import { LabelIdName } from '../Store/storeTypes/labelsTypes'

interface IFindLabelByNameType {
  storageLabels: LabelIdName[]
  LABEL_NAME: string
}

export const findLabelByName = (props: IFindLabelByNameType) => {
  const { storageLabels, LABEL_NAME } = props
  return (
    storageLabels && storageLabels.filter((label) => label.name === LABEL_NAME)
  )
}

interface IFindLabelByIdType {
  storageLabels: LabelIdName[]
  labelIds: string[]
}

export const findLabelById = (props: IFindLabelByIdType) => {
  const { storageLabels, labelIds } = props
  return (
    storageLabels && storageLabels.filter((label) => label.id === labelIds[0])
  )
}
