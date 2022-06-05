import { LabelIdName } from '../Store/storeTypes/labelsTypes'

const filterIllegalLabels = (
  labelIds: string[],
  storageLabels: LabelIdName[]
) =>
  labelIds.filter((label) =>
    storageLabels.map((storageLabel) => storageLabel.id).includes(label)
  )

export default filterIllegalLabels
