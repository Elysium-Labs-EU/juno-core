import {
  IEmailListObject,
  ISelectedEmail,
} from 'store/storeTypes/emailListTypes'
import multipleIncludes from 'utils/multipleIncludes'

/**
 * @function getRecipientFromList
 * @param {object} - takes in an selectedEmails object and an emailList object
 * @returns returns an array of email addresses of the recipients of the selected emails (last message in each thread)
 */

export default function getRecipientFromList({
  selectedEmails,
  emailList,
}: {
  selectedEmails: ISelectedEmail
  emailList: Array<IEmailListObject>
}) {
  const filteredEmailList =
    emailList[
      emailList.findIndex((item) =>
        multipleIncludes(item.labels, selectedEmails.labelIds)
      )
    ]
  if (filteredEmailList) {
    const specificThreadById = filteredEmailList.threads.filter((item) =>
      selectedEmails.selectedIds.includes(item.id)
    )
    return specificThreadById.map((item) => {
      const lastMessageInThread = item.messages[item.messages.length - 1]
      if (lastMessageInThread) {
        return lastMessageInThread.payload.headers.to
      }
      return undefined
    })
  }
  return []
}
