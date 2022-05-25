import * as global from '../constants/globalConstants'
import onlyLegalLabelObjects from './onlyLegalLabelObjects'

// End result will be that the function returns multiple arrays. One for each inbox.

interface IFeedModel {
  labels: string[]
  threads: any[]
  nextPageToken: string | null
}

export default function handleHistoryObject({ history, storageLabels }: any) {
  console.log(history)
  const inboxFeed: IFeedModel = {
    labels: [global.INBOX_LABEL],
    threads: [],
    nextPageToken: null,
  }
  const toDoLabelId = storageLabels.filter(
    (label: any) => label.name === 'Juno/To Do'
  )[0]?.id
  const todoFeed: IFeedModel = {
    labels: [toDoLabelId],
    threads: [],
    nextPageToken: null,
  }
  if (Array.isArray(history)) {
    // Remove all the entries that will not be used.
    const cleanHistoryArray = history.filter(
      (item) => Object.keys(item).length > 2
    )
    cleanHistoryArray.forEach((item) => {
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
            inboxFeed.threads.push(item.labelsRemoved[0].message)
          }
          if (
            staticOnlyLegalLabels.length > 0 &&
            staticOnlyLegalLabels.some((label) => label.id === toDoLabelId)
          ) {
            todoFeed.threads.push(item.labelsRemoved[0].message)
          }
        }
      }
      if (Object.prototype.hasOwnProperty.call(item, 'messageAdded')) {
        console.log(item)
      }
    })
  }
  return [inboxFeed, todoFeed]
}
