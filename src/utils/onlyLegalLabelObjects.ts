import type { TLabelState } from 'store/storeTypes/labelsTypes'

interface IOnlyLegalLabels {
  labelNames: Array<string>
  storageLabels: TLabelState['storageLabels']
}

const onlyLegalLabels = ({ labelNames, storageLabels }: IOnlyLegalLabels) => {
  const idMapStorageLabels = storageLabels.map((label) => label.id)

  const filterArray = labelNames.filter((el: any) =>
    idMapStorageLabels.includes(el)
  )

  const newArray: TLabelState['storageLabels'] = []
  for (let i = 0; i < filterArray.length; i += 1) {
    const pushItem = storageLabels.find((item) => item.id === filterArray[i])
    if (pushItem) newArray.push(pushItem)
  }

  return newArray
}

export default onlyLegalLabels
