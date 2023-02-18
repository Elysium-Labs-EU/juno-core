import type { TDraftsState } from '../store/storeTypes/draftsTypes'

/**
 * @function findDraftMessageInList
 * @param {draftList} - the draftList stored in the Redux state
 * @param {target} - the target message or compose object for which the draft details should be found
 * @returns the draft message or compose object or undefined
 */

export default function findDraftMessageInList({
  draftList,
  target,
}: {
  draftList: TDraftsState['draftList']
  target: any
}) {
  // Target can be composedEmail or message
  return draftList.find((draft) => {
    if (draft.message) {
      return (
        draft.message.threadId === target?.threadId &&
        draft.message.id === target?.id
      )
    }
    return undefined
  })
}
