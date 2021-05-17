import React, { useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import EmailListItem from './EmailListItem/EmailListItem'
import { connect } from 'react-redux'
import { loadEmails } from '../Store/actions'
import './../App.scss'

const LOAD_OLDER = 'Load older messages'
const maxResults = 20

const mapStateToProps = (state) => {
  const { labelIds, metaList, nextPageToken, emailList, isLoading } = state
  return { labelIds, metaList, nextPageToken, emailList, isLoading }
}

const EmailList = ({
  labelIds,
  dispatch,
  metaList,
  nextPageToken,
  emailList,
  isLoading,
}) => {
  useEffect(() => {
    if (metaList.length === 0 && labelIds) {
      dispatch(loadEmails(labelIds, maxResults))
    }
  }, [labelIds, metaList])

  const loadNextPage = (labelIds, nextPageToken, maxResults) => {
    dispatch(loadEmails(labelIds, nextPageToken, maxResults))
  }

  const renderEmailList = (emailList) => {
    return (
      <>
        <div className="scroll">
          <div className="tlOuterContainer">
            <div className="thread-list">
              {emailList && (
                <div className="base">
                  {emailList.map((email) => (
                    <EmailListItem key={email.thread.id} email={email} />
                  ))}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center mb-5">
              {!isLoading && (
                <button
                  className="btn btn-sm btn-light"
                  disabled={isLoading}
                  onClick={() => loadNextPage(labelIds, nextPageToken, maxResults)}
                >
                  {LOAD_OLDER}
                </button>
              )}
              {isLoading && <CircularProgress />}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {emailList.length > 0 ? (
        renderEmailList(emailList)
      ) : (
        <div className="mt-5 d-flex justify-content-center">
          <CircularProgress />
        </div>
      )}
    </>
  )
}

export default connect(mapStateToProps)(EmailList)
