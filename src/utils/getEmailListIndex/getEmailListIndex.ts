import type { TEmailListState } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

/**
 * @function getEmailListIndex
 * @param {Object} props - an object containing two properties: emailList and labelIds
 * @param {Array} props.emailList - an array of threadList objects
 * @param {Array} props.labelIds - an array of label ids
 * @returns {number} the index of the threadList object in emailList that contains a label in labelIds, or -1 if no such threadList exists
 */

interface EmailListFilteredByLabel {
  emailList: TEmailListState['emailList']
  labelIds: TLabelState['labelIds']
}

const getEmailListIndex = (props: EmailListFilteredByLabel): number => {
  const { emailList, labelIds } = props
  if (!emailList || emailList.length === 0 || labelIds.length === 0) {
    return -1
  }
  const labelIdSet = new Set(labelIds)
  for (let i = 0; i < emailList.length; i += 1) {
    const threadList = emailList[i]
    if (threadList?.labels) {
      for (let j = 0; j < threadList.labels.length; j += 1) {
        const specificLabel = threadList.labels[j]
        if (specificLabel && labelIdSet.has(specificLabel)) {
          return i
        }
      }
    }
  }
  return -1
}

export default getEmailListIndex
