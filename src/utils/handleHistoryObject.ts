import * as global from '../constants/globalConstants'
import onlyLegalLabelObjects from './onlyLegalLabelObjects'

export const HISTORY_NEXT_PAGETOKEN = 'history'

const restructureObject = (message: any) => {
  const newObject = { ...message, id: message.threadId }
  delete newObject.threadId
  return newObject
}

interface IFeedModel {
  labels: string[]
  threads: any[]
  nextPageToken: string | null
}

// End result will be that the function returns multiple arrays. One for each inbox.
export default function handleHistoryObject({ history, storageLabels }: any) {
  console.log(history)
  const inboxFeed: IFeedModel = {
    labels: [global.INBOX_LABEL],
    threads: [],
    nextPageToken: HISTORY_NEXT_PAGETOKEN,
  }
  const toDoLabelId = storageLabels.filter(
    (label: any) => label.name === 'Juno/To Do'
  )[0]?.id
  const todoFeed: IFeedModel = {
    labels: [toDoLabelId],
    threads: [],
    nextPageToken: HISTORY_NEXT_PAGETOKEN,
  }
  const sentFeed: IFeedModel = {
    labels: [global.SENT_LABEL],
    threads: [],
    nextPageToken: HISTORY_NEXT_PAGETOKEN,
  }
  if (Array.isArray(history)) {
    // Remove all the entries that will not be used.
    const cleanHistoryArray = history.filter(
      (item) => Object.keys(item).length > 2
    )
    // If item has been marked as read and is also archived, the item is coming up twice in the feed. Make sure that the end feed doesn't include these items for the labelsRemoved
    for (let i = 0; i < cleanHistoryArray.length; i += 1) {
      const item = cleanHistoryArray[i]
      if (Object.prototype.hasOwnProperty.call(item, 'labelsRemoved')) {
        if (item.labelsRemoved[0].labelIds.includes(global.UNREAD_LABEL)) {
          const staticOnlyLegalLabels = onlyLegalLabelObjects({
            labelNames: item.labelsRemoved[0].message.labelIds,
            storageLabels,
          })
          if (
            staticOnlyLegalLabels.length > 0 &&
            staticOnlyLegalLabels.some(
              (label) => label.id === global.INBOX_LABEL
            )
          ) {
            inboxFeed.threads.push(
              restructureObject(item.labelsRemoved[0].message)
            )
          }
          if (
            staticOnlyLegalLabels.length > 0 &&
            staticOnlyLegalLabels.some((label) => label.id === toDoLabelId)
          ) {
            todoFeed.threads.push(
              restructureObject(item.labelsRemoved[0].message)
            )
          }
        }
        if (item.labelsRemoved[0].labelIds.includes(global.INBOX_LABEL)) {
          const output = inboxFeed.threads.filter(
            (filterItem) =>
              filterItem.id !== item.labelsRemoved[0].message.threadId
          )
          inboxFeed.threads = output
        }
        if (item.labelsRemoved[0].labelIds.includes(toDoLabelId)) {
          const output = todoFeed.threads.filter(
            (filterItem) =>
              filterItem.id !== item.labelsRemoved[0].message.threadId
          )
          todoFeed.threads = output
        }
      }
      if (Object.prototype.hasOwnProperty.call(item, 'labelsAdded')) {
        if (item.labelsAdded[0].labelIds.includes(global.INBOX_LABEL)) {
          inboxFeed.threads.push(restructureObject(item.labelsAdded[0].message))
        }
        if (item.labelsAdded[0].labelIds.includes(toDoLabelId)) {
          todoFeed.threads.push(restructureObject(item.labelsAdded[0].message))
        }
        if (item.labelsAdded[0].labelIds.includes(global.SENT_LABEL)) {
          sentFeed.threads.push(restructureObject(item.labelsAdded[0].message))
        }
      }
      if (Object.prototype.hasOwnProperty.call(item, 'messagesAdded')) {
        if (
          item.messagesAdded[0].message.labelIds.includes(global.INBOX_LABEL)
        ) {
          inboxFeed.threads.push(
            restructureObject(item.messagesAdded[0].message)
          )
        }
        if (item.messagesAdded[0].message.labelIds.includes(toDoLabelId)) {
          todoFeed.threads.push(
            restructureObject(item.messagesAdded[0].message)
          )
        }
        if (
          item.messagesAdded[0].message.labelIds.includes(global.SENT_LABEL)
        ) {
          sentFeed.threads.push(
            restructureObject(item.messagesAdded[0].message)
          )
        }
      }
    }
  }
  return [inboxFeed, todoFeed, sentFeed]
}
