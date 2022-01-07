import { EmailListObject } from '../Store/emailListTypes'

interface IEmailListFilteredByLabel {
  emailList: EmailListObject[]
  labelIds: string[]
}

const emailListFilteredByLabel = (props: IEmailListFilteredByLabel) => {
  const { emailList, labelIds } = props
  if (emailList.length > 0 && labelIds.length > 0) {
    return emailList.filter((threadList) =>
      threadList.labels.includes(labelIds[0])
    )
  }
  return []
}

export default emailListFilteredByLabel
