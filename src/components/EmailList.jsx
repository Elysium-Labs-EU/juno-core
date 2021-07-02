import React, { useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useDispatch, useSelector } from 'react-redux'
import EmailListItem from './EmailListItem/EmailListItem'
import {
  // loadDraftList,
  loadEmails,
} from '../Store/metaListSlice'
import { loadDraftList } from '../Store/draftsSlice'
import { selectEmailList } from '../Store/emailListSlice'
import { selectLabelIds, selectLoadedInbox } from '../Store/labelsSlice'
import { selectIsLoading } from '../Store/utilsSlice'
import '../App.scss'
import Emptystate from './Elements/EmptyState'
import LoadingState from './Elements/LoadingState'
import * as local from '../constants/emailListConstants'
import * as draft from '../constants/draftConstants'
import { CustomButtonText } from './Elements/Buttons'

const EmailList = () => {
  const emailList = useSelector(selectEmailList)
  const isLoading = useSelector(selectIsLoading)
  const labelIds = useSelector(selectLabelIds)
  const loadedInbox = useSelector(selectLoadedInbox)
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      labelIds &&
      labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1)
    ) {
      const params = {
        labelIds,
        maxResults: local.MAX_RESULTS,
      }
      // console.log(`loading ${labelIds}`)
      dispatch(loadEmails(params))
      if (labelIds.includes(draft.LABEL)) {
        dispatch(loadDraftList())
      }
    }
  }, [labelIds])

  const loadNextPage = (nextPageToken) => {
    if (labelIds && nextPageToken) {
      const params = {
        labelIds,
        nextPageToken,
        maxResults: local.MAX_RESULTS,
      }
      dispatch(loadEmails(params))
    }
  }

  const renderEmailList = (filteredOnLabel) => {
    const { threads, nextPageToken } = filteredOnLabel && filteredOnLabel
    return (
      <>
        <div className="scroll">
          <div className="tlOuterContainer">
            <div className="thread-list">
              {threads.length > 0 && (
                <div className="base">
                  {threads.map((email) => (
                    <EmailListItem key={email.id} email={email} />
                  ))}
                </div>
              )}
              {threads.length === 0 && <Emptystate />}
            </div>
            {nextPageToken && (
              <div className="d-flex justify-content-center mb-5">
                {!isLoading && (
                  <CustomButtonText
                    className="btn btn-sm btn-light"
                    disabled={isLoading}
                    onClick={() => loadNextPage(nextPageToken)}
                    label={local.LOAD_OLDER}
                  />
                )}
                {isLoading && <CircularProgress />}
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  const labeledInbox = () => {
    if (labelIds) {
      const filteredOnLabel = emailList.filter((threadList) =>
        threadList.labels.includes(...labelIds)
      )
      return renderEmailList(filteredOnLabel[0])
    }
    return null
  }

  return (
    <>
      {labelIds &&
        labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1) &&
        labeledInbox({ labelIds, emailList })}
      {isLoading &&
        labelIds &&
        labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1) && (
          <LoadingState />
        )}
    </>
  )
}

export default EmailList
