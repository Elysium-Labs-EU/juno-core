import React, { useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import EmailListItem from './EmailListItem/EmailListItem'
import { connect } from 'react-redux'
import { loadEmails, setIsLoading } from '../Store/actions'
import './../App.scss'
import Emptystate from './Elements/EmptyState'

const LOAD_OLDER = 'Load older messages'
const MAX_RESULTS = 20
const INBOX_LABELS = ['UNREAD', 'INBOX']

const mapStateToProps = (state) => {
  const {
    labelIds,
    metaList,
    nextPageToken,
    emailList,
    isLoading,
    loadedInbox,
  } = state
  return {
    labelIds,
    metaList,
    nextPageToken,
    emailList,
    isLoading,
    loadedInbox,
  }
}

const EmailList = ({
  labelIds,
  dispatch,
  metaList,
  nextPageToken,
  emailList,
  isLoading,
  loadedInbox,
}) => {
  useEffect(() => {
    if (
      labelIds &&
      labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1)
    ) {
      console.log('triggered')
      const params = {
        labelIds: labelIds,
        maxResults: MAX_RESULTS,
      }
      console.log(`loading ${labelIds}`)
      dispatch(loadEmails(params))
    }
  }, [labelIds])

  const loadNextPage = (labelIds, nextPageToken) => {
    if (labelIds && nextPageToken) {
      const params = {
        labelIds: labelIds,
        nextPageToken: nextPageToken,
        maxResults: MAX_RESULTS,
      }
      dispatch(loadEmails(params))
    }
  }

  const labeledInbox = (props) => {
    const { emailList, labelIds } = props
    if (labelIds) {
      const filteredOnLabel = emailList.filter((threadList) =>
        threadList.labels.includes(...labelIds)
      )
      return renderEmailList(filteredOnLabel[0])
    }
  }

  const renderEmailList = (filteredOnLabel) => {
    const { threads } = filteredOnLabel && filteredOnLabel
    return (
      <>
        <div className="scroll">
          <div className="tlOuterContainer">
            <div className="thread-list">
              {threads.length > 0 && (
                <div className="base">
                  {threads.map((email) => (
                    <EmailListItem key={email.thread.id} email={email.thread} />
                  ))}
                </div>
              )}
              {threads.length === 0 && <Emptystate />}
            </div>
            {nextPageToken && labelIds.includes(...INBOX_LABELS) && (
              <div className="d-flex justify-content-center mb-5">
                {!isLoading && (
                  <button
                    className="btn btn-sm btn-light"
                    disabled={isLoading}
                    onClick={() => loadNextPage(labelIds, nextPageToken)}
                  >
                    {LOAD_OLDER}
                  </button>
                )}
                {isLoading && <CircularProgress />}
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {!isLoading &&
        labelIds &&
        !labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1) &&
        emailList.length > 0 &&
        labeledInbox({ labelIds, emailList })}
      {isLoading && !labelIds && (
        <div className="mt-5 d-flex justify-content-center">
          <CircularProgress />
        </div>
      )}
    </>
  )
}

export default connect(mapStateToProps)(EmailList)
