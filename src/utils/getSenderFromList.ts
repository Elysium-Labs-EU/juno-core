import {
  ISelectedEmail,
  IEmailListObject,
} from '../store/storeTypes/emailListTypes'
import multipleIncludes from './multipleIncludes'

/**
 * @function getSenderFromList
 * @param {object} - takes in an selectedEmails object and an emailList object
 * @returns returns an array of email addresses of the senders of the selected emails (last message in each thread)
 */

export default function getSenderFromList({
  selectedEmails,
  emailList,
}: {
  selectedEmails: ISelectedEmail
  emailList: IEmailListObject[]
}) {
  const filteredEmailList =
    emailList[
      emailList.findIndex((item) =>
        multipleIncludes(item.labels, selectedEmails.labelIds)
      )
    ]
  const specificThreadById = filteredEmailList.threads.filter((item) =>
    selectedEmails.selectedIds.includes(item.id)
  )
  return specificThreadById.map(
    (item) => item.messages[item.messages.length - 1].payload.headers.from
  )
}