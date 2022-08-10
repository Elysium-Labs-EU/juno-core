import * as global from '../constants/globalConstants'
import { LabelIdName } from '../store/storeTypes/labelsTypes'
import onlyLegalLabelObjects from './onlyLegalLabelObjects'

export const HISTORY_NEXT_PAGETOKEN = 'history'

interface IHistoryMessage {
  id: string
  labelIds: string[]
  threadId: string
}
interface IHistoryObject {
  id: string
  messages: IHistoryMessage[]
  messagesAdded?: { message: IHistoryMessage }[]
  messagesDeleted?: { message: IHistoryMessage }[]
  labelsAdded?: { message: IHistoryMessage; labelIds: string[] }[]
  labelsRemoved?: { message: IHistoryMessage; labelIds: string[] }[]
}

interface IFeedModel {
  labels: string[]
  threads: any[]
  nextPageToken: string | null
}

/**
 * @function restructureObject
 * @param {Object} message - a single message object from the history object.
 * @returns {Object} - returns an object where the threadId is set as the id.
 * */
const restructureObject = (message: IHistoryMessage) => {
  const newObject = { ...message, id: message.threadId }
  return newObject
}

/**
 * @function handleHistoryObject
 * @param {IHistoryObject[]} history - the history object from the GMail api.
 * @param {LabelIdName[]} storageLabels - all the available Juno labels in this system.
 * @returns {IFeedModel[]} - End result will be that the function returns multiple arrays. One for each inbox.
 * */

// TODO: Create test for this function.

export default function handleHistoryObject({
  history,
  storageLabels,
}: {
  history: IHistoryObject[]
  storageLabels: LabelIdName[]
}): IFeedModel[] {
  const inboxFeed: IFeedModel = {
    labels: [global.INBOX_LABEL],
    threads: [],
    nextPageToken: HISTORY_NEXT_PAGETOKEN,
  }
  const toDoLabelId = storageLabels.filter(
    (label) => label.name === 'Juno/To Do'
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
  const draftFeed: IFeedModel = {
    labels: [global.DRAFT_LABEL],
    threads: [],
    nextPageToken: HISTORY_NEXT_PAGETOKEN,
  }

  if (Array.isArray(history)) {
    // Remove all the entries that will not be used. We only want objects that have 3 keys or more.
    const cleanHistoryArray = history.filter(
      (item) => Object.keys(item).length > 2
    )
    // If item has been marked as read and is also archived, the item is coming up twice in the feed. Make sure that the end feed doesn't include these items for the labelsRemoved
    for (let i = 0; i < cleanHistoryArray.length; i += 1) {
      const item = cleanHistoryArray[i]
      if (
        Object.prototype.hasOwnProperty.call(item, 'labelsRemoved') &&
        item.labelsRemoved &&
        item.labelsRemoved[0]
      ) {
        if (
          item.labelsRemoved[0].labelIds.includes(global.UNREAD_LABEL) &&
          item.labelsRemoved[0].message.labelIds
        ) {
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
        if (
          item.labelsRemoved[0].message.threadId &&
          item.labelsRemoved[0].labelIds.includes(global.INBOX_LABEL)
        ) {
          const toHandleObject = item.labelsRemoved[0]
          const output = inboxFeed.threads.filter(
            (filterItem) => filterItem.id !== toHandleObject.message.threadId
          )
          inboxFeed.threads = output
        }
        if (
          item.labelsRemoved[0].message.threadId &&
          item.labelsRemoved[0].labelIds.includes(toDoLabelId)
        ) {
          const toHandleObject = item.labelsRemoved[0]
          const output = todoFeed.threads.filter(
            (filterItem) => filterItem.id !== toHandleObject.message.threadId
          )
          todoFeed.threads = output
        }
      }
      if (
        Object.prototype.hasOwnProperty.call(item, 'labelsAdded') &&
        item.labelsAdded
      ) {
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
      if (
        Object.prototype.hasOwnProperty.call(item, 'messagesAdded') &&
        item?.messagesAdded &&
        item?.messagesAdded[0]?.message &&
        item?.messagesAdded[0]?.message?.labelIds
      ) {
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
        if (
          item.messagesAdded[0].message.labelIds.includes(global.DRAFT_LABEL)
        ) {
          const draftThreadIndex = draftFeed.threads.findIndex((thread) => {
            if (item?.messagesAdded) {
              return thread.threadId === item.messagesAdded[0].message.threadId
            }
            return -1
          })
          // The api removes the older draft and sets a newer one - all of these events are listed in the history.
          // So the draftFeed object should overwrite an entry if the loop finds another one with the same threadId
          if (draftThreadIndex > -1) {
            draftFeed.threads.splice(draftThreadIndex, 1)
            draftFeed.threads.push(
              restructureObject(item.messagesAdded[0].message)
            )
          } else {
            draftFeed.threads.push(
              restructureObject(item.messagesAdded[0].message)
            )
          }
        }
      }
    }
  }
  return [inboxFeed, todoFeed, sentFeed, draftFeed]
}
