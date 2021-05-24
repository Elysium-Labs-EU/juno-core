import React, { useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import EmailListItem from './EmailListItem/EmailListItem'
import { connect } from 'react-redux'
import { loadEmails } from '../Store/actions'
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
    if (labelIds && !loadedInbox.some(label => label === labelIds)) {
      console.log('triggered')
      const params = {
        labelIds: labelIds,
        maxResults: MAX_RESULTS,
      }
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

  // useEffect(() => {
  //   if (labelIds.length > 0 && emailList.length > 0) {
  //    filterList({labelIds, emailList})
  //  }
  // }, [labelIds, emailList])

  // GOAL: only show the emails that have the label in one of their linked messages. Messages are elements within an object, and that object is within the main array.
  // The labelIds are inside each message object as an array

  // const filteredEmailList =
  //   emailList && emailList.length > 0 &&
  //   emailList.filter((threadElement) =>
  //     threadElement.thread.messages.map((item) =>
  //       item.labelIds.map(labelId => labelId.includes(labelIds))
  //     )
  //   )

  const standardizedLabelIds =
    labelIds && !Array.isArray(labelIds) ? [labelIds] : labelIds

  const filteredEmailList =
    emailList &&
    emailList.length > 0 &&
    emailList.filter((threads) =>
      threads.thread.messages.map((item) =>
        item.labelIds.some((label) => label.includes(...standardizedLabelIds))
      )
    )

  const filterList = (props) => {
    const { emailList, labelIds } = props
    const standardizedLabelIds =
      labelIds && !Array.isArray(labelIds) ? [labelIds] : labelIds
    if (standardizedLabelIds) {
      console.log(standardizedLabelIds)
      const filteredMailArray = emailList.filter((threads) =>
        threads.thread.messages.map((item) =>
          item.labelIds.some((label) => !label.includes(...standardizedLabelIds))
        )
      )
      console.log(emailList.map((threads) =>
        threads.thread.messages.filter((item) =>
          item.labelIds.includes(...standardizedLabelIds))
      ))
      const filterOnLabel = emailList.map((threads) =>
        threads.thread.messages.filter((item) =>
          item.labelIds.includes(...standardizedLabelIds))
      )
      const removedEmptyArrays = filterOnLabel.filter(item => item.length !== 0)
      return renderEmailList(removedEmptyArrays)
      // return renderEmailList(filteredMailArray)
    }
  }

  const renderEmailList = (filteredMailArray) => {
    // console.log(filteredMailArray)
    // console.log(filteredMailArray.length)
    return (
      <>
        <div className="scroll">
          <div className="tlOuterContainer">
            <div className="thread-list">
              {filteredMailArray.length > 0 && (
                <div className="base">
                  {filteredMailArray.map((email) => (
                    <EmailListItem key={email.id} email={email} />
                    // <EmailListItem key={email.thread.id} email={email} />
                  ))}
                </div>
              )}
              {filteredMailArray.length === 0 && <Emptystate />}
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
      {/* {loadedInbox.map((labels) => labels.includes(...labelIds)) &&
        emailList.length > 0 &&
        renderEmailList(filteredEmailList)} */}
      {!isLoading &&
        loadedInbox.map((labels) => labels.includes(...labelIds)) &&
        emailList.length > 0 &&
        filterList({ labelIds, emailList })}
      {/* {!isLoading && loadedInbox.includes(labelIds) && listCount === 0 && (
        <Emptystate />
      )} */}
      {isLoading && emailList.length === 0 && (
        // {isLoading && !loadedInbox.includes(labelIds) && (
        <div className="mt-5 d-flex justify-content-center">
          <CircularProgress />
        </div>
      )}
    </>
  )
}

export default connect(mapStateToProps)(EmailList)
