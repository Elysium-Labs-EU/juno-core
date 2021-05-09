import React, { useEffect } from 'react'
import { createApiClient } from '../data/api'
import EmailListItem from './EmailListItem/EmailListItem'
import { connect } from 'react-redux'
import {
  listUpdateDetail,
  listUpdateMeta,
  setNextPageToken,
  setIsLoading
} from '../Store/actions'
import './../App.scss'

const api = createApiClient()

const mapStateToProps = (state) => {
  const { metaList, nextPageToken, emailList, isLoading } = state
  return { metaList, nextPageToken, emailList, isLoading }
}

const EmailList = ({
  labelIds,
  dispatch,
  metaList,
  nextPageToken,
  emailList,
  isLoading,
}) => {
  const LoadEmails = async (labelIds, nextPageToken) => {
    if (nextPageToken) {
      const metaList = await api.getAdditionalThreads(labelIds, nextPageToken)
      const { threads } = metaList.message
      dispatch(listUpdateMeta(threads))
      dispatch(setNextPageToken(metaList.message.nextPageToken))
      LoadEmailDetails(metaList)
    } else {
      const metaList = await api.getInitialThreads(labelIds)
      const { threads, nextPageToken } = metaList.message
      dispatch(listUpdateMeta(threads))
      dispatch(setNextPageToken(nextPageToken))
      LoadEmailDetails(metaList)
    }
  }

  useEffect(() => {
    if (metaList.length === 0) {
      LoadEmails(labelIds)
    }
  }, [labelIds, metaList])

  const LoadEmailDetails = async (metaList) => {
    const { threads } = metaList.message
    threads.length > 0 &&
      threads.forEach(async (item) => {
        const threadDetail = await api.getThreadDetail(item.id)
        dispatch(listUpdateDetail([...emailList, threadDetail]))
      })
    dispatch(setIsLoading(true))
    // console.log(metaList.length, emailList.length)
    // if (metaList.length === emailList.length){
    // console.log('hey')}
  }

  const loadNextPage = (labelIds, nextPageToken) => {
    LoadEmails(labelIds, nextPageToken)
  }

  const renderEmailList = (emailList) => {
    return (
      <>
        <div className="scroll">
          <div className="tlOuterContainer">
            <div className="thread-list">
              {emailList ? (
                <div className="base">
                  {emailList.map((email) => (
                    <EmailListItem key={email.thread.id} email={email} />
                  ))}
                </div>
              ) : (
                <h2>Loading</h2>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-sm btn-light"
                onClick={() => loadNextPage(labelIds, nextPageToken)}
              >
                Load more
              </button>
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
        <>
          <h3>Fetching emails</h3>
        </>
      )}
    </>
  )
}

export default connect(mapStateToProps)(EmailList)
