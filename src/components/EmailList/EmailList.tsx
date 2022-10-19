import { useEffect } from 'react'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  selectSelectedEmails,
  setActiveEmailListIndex,
  setSelectedEmails,
} from '../../store/emailListSlice'
import { selectLabelIds, selectLoadedInbox } from '../../store/labelsSlice'
import EmptyState from '../Elements/EmptyState'
import LoadingState from '../Elements/LoadingState/LoadingState'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { IEmailListObject } from '../../store/storeTypes/emailListTypes'
import getEmailListIndex from '../../utils/getEmailListIndex'
import {
  resetEmailDetail,
  selectCurrentEmail,
} from '../../store/emailDetailSlice'
import RenderEmailList from './RenderEmailList'
import useFetchEmailsDrafts from '../../hooks/useFetchEmailsDrafts'
import SelectedOptions from '../MainHeader/SelectedOptions/SelectedOptions'

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
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const currentEmail = useAppSelector(selectCurrentEmail)
  const dispatch = useAppDispatch()

  useFetchEmailsDrafts(labelIds, Date.now())

  // Run a clean up function to ensure that the email detail values are always back to base values.
  useEffect(() => {
    if (currentEmail.length > 0) {
      dispatch(resetEmailDetail())
    }
  }, [currentEmail])

  // Run a clean up function to ensure that the selected email values are always back to base values.
  useEffect(() => {
    if (selectedEmails.length > 0) {
      dispatch(setSelectedEmails([]))
    }
  }, [])

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
      {selectedEmails.length > 0 && <SelectedOptions />}
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
