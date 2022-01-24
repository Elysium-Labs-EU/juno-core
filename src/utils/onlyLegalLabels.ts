import { LabelIdName } from '../Store/labelsTypes'

interface IOnlyLegalLabels {
  labelNames: string[]
  storageLabels: LabelIdName[]
}

const onlyLegalLabels = ({
  labelNames,
  storageLabels,
}: IOnlyLegalLabels): LabelIdName[] => {
  const idMapStorageLabels = storageLabels.map((label) => label.id)

  const filterArray = labelNames.filter((el: any) =>
    idMapStorageLabels.includes(el)
  )

  const newArray: LabelIdName[] = []
  for (let i = 0; i < filterArray.length; i += 1) {
    const pushItem = storageLabels.find((item) => item.id === filterArray[i])
    if (pushItem) newArray.push(pushItem)
  }

  return newArray
}

export default onlyLegalLabels
