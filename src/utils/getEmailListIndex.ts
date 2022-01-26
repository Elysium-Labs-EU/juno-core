import { IEmailListObject } from '../Store/emailListTypes'

interface IEmailListFilteredByLabel {
  emailList: IEmailListObject[]
  labelIds: string[]
}

const getEmailListIndex = (props: IEmailListFilteredByLabel): number => {
  const { emailList, labelIds } = props
  if (emailList.length > 0 && labelIds.length > 0) {
    return emailList.findIndex((threadList) => {
      if (threadList.labels) {
        return threadList.labels.includes(labelIds[0])
      }
      return -1
    })
  }
  return -1
}

export default getEmailListIndex
