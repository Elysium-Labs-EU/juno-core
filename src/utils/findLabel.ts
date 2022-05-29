import { LabelIdName } from '../Store/storeTypes/labelsTypes'

interface FindLabelByNameType {
  storageLabels: LabelIdName[]
  LABEL_NAME: string
}

export const FindLabelByName = (props: FindLabelByNameType) => {
  const { storageLabels, LABEL_NAME } = props
  return (
    storageLabels && storageLabels.filter((label) => label.name === LABEL_NAME)
  )
}

interface FindLabelByIdType {
  storageLabels: LabelIdName[]
  labelIds: string[]
}

export const FindLabelById = (props: FindLabelByIdType) => {
  const { storageLabels, labelIds } = props
  return (
    storageLabels && storageLabels.filter((label) => label.id === labelIds[0])
  )
}
