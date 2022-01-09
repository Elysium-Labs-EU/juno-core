import { EmailListObject } from '../Store/emailListTypes'

interface IEmailListFilteredByLabel {
  emailList: EmailListObject[]
  labelIds: string[]
}

const emailListFilteredByLabel = (props: IEmailListFilteredByLabel) => {
  const { emailList, labelIds } = props
  if (emailList.length > 0 && labelIds.length > 0) {
    return emailList.filter((threadList) => {
      // If the threadList doesn't have Labels, it is the Archive threadList. We don't show that one.
      if (threadList.labels) {
        return threadList.labels.includes(labelIds[0])
      }
      return []
    })
  }
  return []
}

export default emailListFilteredByLabel
