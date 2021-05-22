import React, { useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import EmailListItem from './EmailListItem/EmailListItem'
import { connect } from 'react-redux'
import { loadEmails } from '../Store/actions'
import './../App.scss'
import Emptystate from './Elements/EmptyState'

const LOAD_OLDER = 'Load older messages'
const MAX_RESULTS = 20

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
      const params = {
        labelIds: labelIds,
        maxResults: MAX_RESULTS,
      }
      dispatch(loadEmails(params))
    }
  }, [labelIds, metaList])

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

  const renderEmailList = (emailList) => {
    const standardizeLabelIds = !Array.isArray(labelIds) ? [labelIds] : labelIds
    console.log(emailList)
    // const filteredEmailList = emailList && emailList.map(item => console.log(item.thread.messages[0].labelIds))
    // const filteredEmailList2 = emailList && emailList.map(item => item.thread.filter(e => e.messages[0].labelIds = standardizeLabelIds))
    
    // const filteredEmailList2 = emailList && emailList.map(item => item.thread.messages[0].labelIds.includes(labelIds))

    // const filteredEmailList2 = emailList && emailList.map(thread => thread.filter(item => item.thread.messages[0].labelIds.includes(labelIds)))
    const filteredEmailList2 = emailList && emailList.filter(threadElement => threadElement.thread.messages[0].labelIds.includes(...standardizeLabelIds))

    // let compareSkills = uniqueSubSets.map((set) =>
    //   set.filter((item) => !userSkills.includes(item))
    // )
    // console.log(filteredEmailList)
    console.log(filteredEmailList2)
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
            {emailList.length > 0 && nextPageToken && (
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
      {!isLoading && emailList.length > 0 && renderEmailList(emailList)}
      {!isLoading && emailList.length === 0 && <Emptystate />}
      {isLoading && (
        <div className="mt-5 d-flex justify-content-center">
          <CircularProgress />
        </div>
      )}
    </>
  )
}

export default connect(mapStateToProps)(EmailList)
