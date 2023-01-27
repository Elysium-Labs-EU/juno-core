import type { TEmailListState } from 'store/storeTypes/emailListTypes'
/**
 * @function getRecipientFromList
 * @param {object} - takes in an selectedEmails object and an emailList object
 * @returns returns an array of email addresses of the recipients of the selected emails (last message in each thread)
 */

export default function getRecipientFromList({
  selectedEmails,
  emailList,
}: {
  selectedEmails: TEmailListState['selectedEmails']
  emailList: TEmailListState['emailList']
}) {
  const { labelIds, selectedIds } = selectedEmails
  if (!labelIds.length || !selectedIds.length) {
    return []
  }
  const labelIdsSet = new Set(labelIds)
  const selectedIdsSet = new Set(selectedIds)
  const filteredEmailList = emailList.find(({ labels }) =>
    labels.some(labelIdsSet.has)
  )
  if (filteredEmailList) {
    const specificThreadById = filteredEmailList.threads.filter(({ id }) =>
      selectedIdsSet.has(id)
    )
    return specificThreadById.map(({ messages }) => {
      const lastMessageInThread = messages[messages.length - 1]
      if (lastMessageInThread) {
        return lastMessageInThread.payload.headers.to
      }
      return undefined
    })
  }
  return []
}
