import React, { useEffect, useState } from 'react'
import { createApiClient } from '../data/api'
import CircularProgress from '@material-ui/core/CircularProgress'
import EmailListItem from './EmailListItem/EmailListItem'
import { connect } from 'react-redux'
import {
  listAddDetail,
  listUpdateMeta,
  setNextPageToken,
  setIsLoading,
} from '../Store/actions'
import './../App.scss'

const api = createApiClient()
const LOAD_OLDER = 'Load older messages'

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
  const [loadCount, setLoadCount] = useState(0)
  const [buffer, setBuffer] = useState([])

  const LoadEmails = async (labelIds, nextPageToken) => {
    if (nextPageToken) {
      const metaList = await api.getAdditionalThreads(labelIds, nextPageToken)
      if (metaList) {
        const { threads, nextPageToken } = metaList.message
        dispatch(listUpdateMeta(threads))
        dispatch(setNextPageToken(nextPageToken))
        LoadEmailDetails(metaList)
      } else {
        console.log('No feed found.')
      }
    } else {
      const metaList = await api.getInitialThreads(labelIds)
      if (metaList) {
        const { threads, nextPageToken } = metaList.message
        dispatch(listUpdateMeta(threads))
        dispatch(setNextPageToken(nextPageToken))
        LoadEmailDetails(metaList)
      } else {
        console.log('No feed found.')
      }
    }
  }

  useEffect(() => {
    if (metaList.length === 0) {
      LoadEmails(labelIds)
    }
  }, [labelIds, metaList])

  const LoadEmailDetails = async (metaList) => {
    const { threads } = metaList.message
    setLoadCount(threads.length)
    threads.length > 0 &&
      threads.forEach(async (item) => {
        const threadDetail = await api.getThreadDetail(item.id)
        setBuffer((prevState) => [...prevState, threadDetail])
        setLoadCount((prevState) => prevState - 1)
      })
    dispatch(setIsLoading(true))
  }

  useEffect(() => {
    if (loadCount === 0) {
      if (buffer.length > 0) {
        dispatch(listAddDetail(buffer))
        setBuffer([])
        dispatch(setIsLoading(false))
      }
    }
  }, [loadCount])

  const loadNextPage = (labelIds, nextPageToken) => {
    LoadEmails(labelIds, nextPageToken)
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
                  onClick={() => loadNextPage(labelIds, nextPageToken)}
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
