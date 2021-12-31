import React, { useMemo } from 'react'
import { CustomButtonText } from '../Elements/Buttons'
import { convertArrayToString } from '../../utils'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import startSort from '../../utils/startSort'
import { selectEmailList, setIsSorting } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'

const INBOX_BUTTON = 'Sort inbox'

const SortInbox = () => {
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()

  const emailListIndex = useMemo(
    () => emailList.findIndex((threadList) => threadList.labels.includes(labelIds[0])),
    [emailList, labelIds]
  )

  const handleClick = () => {
    const labelURL = convertArrayToString(labelIds)
    startSort({ dispatch, labelURL, emailList, emailListIndex })
    dispatch(setIsSorting(true))
  }


  return (
    <CustomButtonText
      className="sort-button"
      onClick={handleClick}
      disabled={isLoading}
      label={INBOX_BUTTON}
    />
  )
}

export default SortInbox
