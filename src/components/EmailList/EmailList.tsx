import EmptyState from 'components/Elements/EmptyState'
import LoadingState from 'components/Elements/LoadingState/LoadingState'
import SelectedOptions from 'components/MainHeader/SelectedOptions/SelectedOptions'
import useFetchEmailsDrafts from 'hooks/useFetchEmailsDrafts'
import { useEffect } from 'react'
import { resetEmailDetail, selectCurrentEmail } from 'store/emailDetailSlice'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  selectSelectedEmails,
  setActiveEmailListIndex,
} from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds, selectLoadedInbox } from 'store/labelsSlice'
import { IEmailListObject } from 'store/storeTypes/emailListTypes'
import getEmailListIndex from 'utils/getEmailListIndex'
import multipleIncludes from 'utils/multipleIncludes'

import RenderEmailList from './RenderEmailList'

const LabeledInbox = ({
  emailList,
  activeEmailListIndex,
}: {
  emailList: IEmailListObject[]
  activeEmailListIndex: number
}) => {
  if (emailList && activeEmailListIndex > -1) {
    // Show the list of emails that are connected to the labelId mailbox.
    return <RenderEmailList filteredOnLabel={emailList[activeEmailListIndex]} />
  }
  return <EmptyState />
}

const EmailList = () => {
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const currentEmail = useAppSelector(selectCurrentEmail)
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const dispatch = useAppDispatch()

  useFetchEmailsDrafts(labelIds, Date.now())

  // Run a clean up function to ensure that the email detail values are always back to base values.
  useEffect(() => {
    if (currentEmail.length > 0) {
      dispatch(resetEmailDetail())
    }
  }, [currentEmail])

  // Sync the emailListIndex with Redux
  useEffect(() => {
    const emailListIndex = getEmailListIndex({ emailList, labelIds })
    if (emailListIndex > -1 && activeEmailListIndex !== emailListIndex) {
      dispatch(setActiveEmailListIndex(emailListIndex))
    }
  }, [emailList, labelIds])

  return labelIds.some((val) => loadedInbox.indexOf(val) > -1) &&
    activeEmailListIndex > -1 ? (
    <>
      {selectedEmails.selectedIds.length > 0 &&
        multipleIncludes(selectedEmails.labelIds, labelIds) && (
          <SelectedOptions />
        )}
      <LabeledInbox
        emailList={emailList}
        activeEmailListIndex={activeEmailListIndex}
      />
    </>
  ) : (
    <LoadingState />
  )
}

export default EmailList
