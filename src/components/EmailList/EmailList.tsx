import { useEffect } from 'react'

import EmptyState from 'components/Elements/EmptyState/EmptyState'
import LoadingState from 'components/Elements/LoadingState/LoadingState'
import useFetchEmailsDrafts from 'hooks/useFetchEmailsDrafts'
// import { resetEmailDetail, selectCurrentEmail } from 'store/emailDetailSlice'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  setActiveEmailListIndex,
} from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds, selectLoadedInbox } from 'store/labelsSlice'
import type { TEmailListState } from 'store/storeTypes/emailListTypes'
import getEmailListIndex from 'utils/getEmailListIndex/getEmailListIndex'

import RenderEmailList from './RenderEmailList'

interface EmailListProps {
  hasLargeHeader?: boolean
}

interface LabeledInboxProps {
  activeEmailListIndex: number
  emailList: TEmailListState['emailList']
  hasLargeHeader: boolean
}

const LabeledInbox = ({
  emailList,
  activeEmailListIndex,
  hasLargeHeader,
}: LabeledInboxProps) => {
  const specificEmailList = emailList?.[activeEmailListIndex]
  if (specificEmailList) {
    // Show the list of emails that are connected to the labelId mailbox.
    return (
      <RenderEmailList
        filteredOnLabel={specificEmailList}
        hasLargeHeader={hasLargeHeader}
      />
    )
  }
  return <EmptyState />
}

const EmailList = ({ hasLargeHeader = false }: EmailListProps) => {
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  // const currentEmail = useAppSelector(selectCurrentEmail)
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const dispatch = useAppDispatch()

  useFetchEmailsDrafts(labelIds, Date.now())

  // Run a clean up function to ensure that the email detail values are always back to base values.
  // TODO: Convert this to a Redux listener Or verify if this is even needed.
  // useEffect(() => {
  //   if (currentEmail.length > 0) {
  //     dispatch(resetEmailDetail())
  //   }
  // }, [currentEmail])

  // Sync the emailListIndex with Redux
  // TODO: Convert this to a Redux listener.
  useEffect(() => {
    const emailListIndex = getEmailListIndex({ emailList, labelIds })
    if (emailListIndex > -1 && activeEmailListIndex !== emailListIndex) {
      dispatch(setActiveEmailListIndex(emailListIndex))
    }
  }, [emailList, labelIds])

  const isInLoadedInboxAndActive =
    labelIds.some((val) => loadedInbox.includes(val)) &&
    activeEmailListIndex > -1

  return isInLoadedInboxAndActive ? (
    <LabeledInbox
      activeEmailListIndex={activeEmailListIndex}
      emailList={emailList}
      hasLargeHeader={hasLargeHeader}
    />
  ) : (
    <LoadingState />
  )
}

export default EmailList
