import { EmailListObject } from '../Store/emailListTypes'

export const convertArrayToString = (data: string | string[]) => {
  if (data && typeof data === 'string') {
    const converted = data.toString().replace(',', '-')
    return converted
  }
  if (data && Array.isArray(data)) {
    const converted = data[0].toString().replace(',', '-')
    return converted
  }
  return ''
}

interface FilteredEmailListProps {
  emailList: EmailListObject[]
  labelIds: string[]
}

export const FilteredEmailList = (props: FilteredEmailListProps) => {
  const { emailList, labelIds } = props
  if (emailList.length > 0 && labelIds.length > 0) {
    return emailList.filter((threadList) =>
      threadList.labels.includes(labelIds[0])
    )
  }
  return []
}

export const multipleIncludes = (first: any, second: any) => {
  const indexArray = first.map((el: any) => second.indexOf(el))
  return indexArray.indexOf(-1) === -1
}
