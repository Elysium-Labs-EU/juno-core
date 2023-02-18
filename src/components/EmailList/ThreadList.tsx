import type { Dispatch, SetStateAction } from 'react'

import EmailListItem from 'components/EmailListItem/EmailListItem'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'

/**
 * @component ThreadList
 * @param threads - the threads to rendered
 * @param focusedItemIndex - the index of the focused item
 * @param setFocusedItemIndex - callback function to the parent component to keep track of the focused item
 * @param showLabel - an optional flag to show labels on the EmaillistItem, defaults to false
 * @param keySuffix - a string to add to the key of the thread - to remove conflict with other rendered items
 * @param searchOnClickHandeler - an optional onClick callback handeler - used by the Search component
 * @returns {JSX.Element}
 */

interface IThreadList {
  focusedItemIndex: number
  keySuffix: 'search' | 'emailList'
  searchOnClickHandeler?: (id: string) => void
  setFocusedItemIndex: Dispatch<SetStateAction<number>>
  showCheckbox?: boolean
  showLabel?: boolean
  threads: Array<TThreadObject>
}

const ThreadList = ({
  threads,
  focusedItemIndex,
  setFocusedItemIndex,
  showLabel = false,
  showCheckbox = true,
  keySuffix,
  searchOnClickHandeler = undefined,
}: IThreadList) => (
  <>
    {threads.map((thread, index) => (
      <div
        key={keySuffix ? `${thread.id}-${keySuffix}` : thread?.id}
        onClick={
          searchOnClickHandeler
            ? () => searchOnClickHandeler(thread.id)
            : undefined
        }
        onFocus={() => setFocusedItemIndex(index)}
        onMouseOver={() => setFocusedItemIndex(index)}
        aria-hidden="true"
        // The className is used to target it.
        className={`${keySuffix}-thread-list-item`}
      >
        <EmailListItem
          activeIndex={focusedItemIndex}
          email={thread}
          index={index}
          showCheckbox={showCheckbox}
          showLabel={showLabel}
        />
      </div>
    ))}
  </>
)

export default ThreadList
